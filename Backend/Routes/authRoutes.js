import express from "express";
import passport from "passport";
import { registerUser, loginUser, verifyOtp, resendOtp } from "../Controller/authController.js";
import generateToken from "../utils/generateToken.js";

const router = express.Router();

/* Manual Auth */
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);

/* Google Auth */
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);



router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = generateToken(req.user._id);

    res.redirect(
      `http://localhost:5173/auth/callback?token=${token}`
    );
  }
);


export default router;
