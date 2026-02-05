import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { LogOut, ChevronRight, Edit2, MapPin } from "lucide-react";
import Navbar from "../components/Navbar";
import { logout, userUpdate } from "../Redux/Slices/authSlice";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth || {});
  const [activeTab, setActiveTab] = useState("account");
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const submitPasswordChange = async () => {
    setPasswordError("");
    setPasswordSuccess("");

    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    try {
      await api.post(
        "/auth/change-password",
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );

      setPasswordSuccess("Password updated successfully");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowPasswordForm(false);
    } catch (err) {
      setPasswordError(err.response?.data?.message || "Password update failed");
    }
  };

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveProfileHandler = () => {
    dispatch(
      userUpdate({
        ...user,
        name: formData.name,
        phone: formData.phone,
      }),
    );
    setIsEditing(false);
  };

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (!user) return null;

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white pt-32">
        <section className="px-6 md:px-12 max-w-7xl mx-auto mb-12">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl text1 md:text-5xl font-serif">
                My Account
              </h1>
              <p className="text-gray-500 text mt-2">
                Manage your profile and preferences
              </p>
            </div>
            <button
              onClick={logoutHandler}
              className="p-3 hover:bg-gray-100 text rounded-full"
            >
              <LogOut />
            </button>
          </div>
        </section>

        <section className="px-6 md:px-12 max-w-7xl mx-auto pb-24">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 border-l text pl-4 space-y-2">
              {["account", "orders", "addresses"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`block w-full text-left py-3 px-4 ${
                    activeTab === tab
                      ? "border-l-2 border-black -ml-4 pl-3"
                      : "text-gray-500"
                  }`}
                >
                  {tab === "account" && "Account Information"}
                  {tab === "orders" && "Order History"}
                  {tab === "addresses" && "Saved Addresses"}
                </button>
              ))}
            </div>

            <div className="lg:col-span-3">
              {activeTab === "account" && (
                <div className="space-y-8">
                  <div className="border-b pb-8">
                    <div className="flex justify-between mb-6">
                      <h2 className="text-2xl font-serif text1">
                        Personal Information
                      </h2>
                      <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="flex text items-center gap-2 text-xs uppercase"
                      >
                        <Edit2 size={14} />
                        {isEditing ? "Cancel" : "Edit"}
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 text">
                      {isEditing ? (
                        <>
                          <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="border-b py-2"
                            placeholder="Full Name"
                          />
                          <input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="border-b py-2"
                            placeholder="Phone"
                          />
                        </>
                      ) : (
                        <>
                          <Info label="Full Name" value={user.name} />
                          <Info label="Email" value={user.email} />
                          <Info
                            label="Phone"
                            value={user.phone || "Not added"}
                          />
                          <Info
                            label="Member Since"
                            value={new Date(user.createdAt).toDateString()}
                          />
                        </>
                      )}
                    </div>

                    {isEditing && (
                      <button
                        onClick={saveProfileHandler}
                        className="mt-8 text1 px-10 py-3 bg-black text-white uppercase text-xs"
                      >
                        Save Changes
                      </button>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xl text1 font-serif mb-6">
                      Password & Security
                    </h3>

                    {!showPasswordForm ? (
                      <button
                        onClick={() => setShowPasswordForm(true)}
                        className="flex items-center gap-2 text text-xs uppercase tracking-widest"
                      >
                        Change Password
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    ) : (
                      <div className="max-w-md space-y-4 mt-6">
                        {passwordError && (
                          <p className="text-sm text text-red-500">
                            {passwordError}
                          </p>
                        )}
                        {passwordSuccess && (
                          <p className="text-sm text text-green-600">
                            {passwordSuccess}
                          </p>
                        )}

                        <input
                          type="password"
                          name="currentPassword"
                          placeholder="Current Password"
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          className="w-full border text px-4 py-3"
                        />

                        <input
                          type="password"
                          name="newPassword"
                          placeholder="New Password"
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          className="w-full border text px-4 py-3"
                        />

                        <input
                          type="password"
                          name="confirmPassword"
                          placeholder="Confirm New Password"
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                          className="w-full border text px-4 py-3"
                        />

                        <div className="flex gap-4 pt-2">
                          <button
                            onClick={submitPasswordChange}
                            className="px-8 py-3 text1 bg-black text-white text-xs uppercase"
                          >
                            Update Password
                          </button>
                          <button
                            onClick={() => setShowPasswordForm(false)}
                            className="px-8 text1 py-3 border text-xs uppercase"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === "orders" && (
                <p className="text-gray-500 text1">
                  Orders will appear here after purchase.
                </p>
              )}

              {activeTab === "addresses" && (
                <div className="border p-6 text1 text flex gap-3">
                  <MapPin />
                  <div>
                    <p>No addresses saved</p>
                    <p className="text-sm text text-gray-500">
                      Add address during checkout
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

const Info = ({ label, value }) => (
  <div>
    <p className="text-xs uppercase text1 text-gray-500 mb-2">{label}</p>
    <p className="text-lg">{value}</p>
  </div>
);

export default ProfilePage;
