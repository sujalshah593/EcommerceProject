import { hash } from "bcryptjs";
import User from "../Models/User.js";
import generateToken from "../utils/generateToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import generateOTP from "../utils/generateOtp.js";


// REGISTER
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists)
    return res.status(400).json({ message: "User already exists" });

  const user = await User.create({ name, email, password});

  await sendEmail({
    to: user.email,
    subject: "Welcome to Sheeji Cloth Store",
    html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Welcome, ${user.name}!</h2>
          <p>Thanks for registering at <b>Shreeji Store</b>.</p>
          <p>Your account has been created successfully.</p>
          <br />
          <p>Happy Shopping! 🛍️</p>
          <p><b>Shreeji Team</b></p>
        </div>
      `,
  });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id),
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if(!user.isVerified){
    const otp = generateOTP();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    await sendEmail({
      to: user.email,
      subject: "Verify your account - OTP",
      html: `<h2>Your OTP is ${otp}</h2><p>Valid for 10 minutes</p>`,
    });

    return res.status(403).json({
      requiresOtp: true,
      userId: user._id,
      email: user.email,
      message: "OTP sent to your email"
    });
  }
  if (user && user.password && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }

  
};

export const verifyOtp = async (req, res) => {
  const { userId, otp} = req.body;

  const user = await User.findById(userId);
  if(!user || user.otp !== otp || user.otpExpires < Date.now())
    return res.status(400).json({ message: "Invalid OTP"});

  user.isVerified = true;
  user.otp = null;
  user.otpExpires = null;
  await user.save();
  
  res.json({message: "OTP verified"});
};

export const resendOtp = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  const otp = generateOTP();
  user.otp = otp;
  user.otpExpires = Date.now() + 10 * 60 * 1000;
  await user.save();

  await sendEmail({
    to: email,
    subject: "Resend OTP",
    html: `<h2>Your OTP is ${otp}</h2>`,
  });

  res.json({ message: "OTP resent" });
};