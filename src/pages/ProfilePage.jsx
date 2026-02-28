import { useEffect, useState } from "react";
import { api } from "../utils/api";
import { useNavigate } from "react-router-dom";
import defaultProfile from "../assets/profile.png";

function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");

  // Fetch user profile
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/login"); // redirect if no token

        const res = await api.get("/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser({
          ...res.data,
          address: res.data.address || {
            line1: "",
            city: "",
            state: "",
            pincode: "",
          },
        });
      } catch (err) {
        console.error("Error fetching profile:", err);
        alert("Failed to load profile");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, [navigate]);

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token"); // remove auth token
    setUser(null);                    // clear user state
    navigate("/login");               // redirect to login page
  };

  // Save / update profile
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();

      formData.append("firstName", user.firstName || "");
      formData.append("lastName", user.lastName || "");
      formData.append("phone", user.phone || "");
      formData.append("gender", user.gender || "");
      formData.append("address", JSON.stringify(user.address || {}));

      if (imageFile) formData.append("profilePic", imageFile);

      const res = await api.put("/users/me", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setUser(res.data);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile");
    }
  };

  if (loading || !user) return <p className="pt-40 text-center">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 pt-28">
      <div className="max-w-7xl mx-auto flex gap-10">

        {/* Sidebar */}
        <div className="w-64 flex-shrink-0 space-y-3">
          {[
            { key: "profile", label: "My Profile" },
            { key: "orders", label: "My Orders" },
            { key: "password", label: "Change Password" },
            { key: "address", label: "Manage Address" },
            { key: "payment", label: "Payment Methods" },
            { key: "logout", label: "Logout" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => {
                if (item.key === "logout") handleLogout();
                else setActiveTab(item.key);
              }}
              className={`w-full text-left px-5 py-3 rounded-xl border text-sm transition
                ${
                  activeTab === item.key && item.key !== "logout"
                    ? "bg-yellow-400 border-yellow-400 text-black"
                    : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white p-10 rounded-2xl shadow">

          {activeTab === "profile" && (
            <>
              {/* Profile Image */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <img
                    src={imageFile ? URL.createObjectURL(imageFile) : user.profilePic || defaultProfile}
                    className="w-28 h-28 rounded-full object-cover border"
                    alt="Profile"
                  />
                  <label className="absolute bottom-1 right-1 bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center cursor-pointer">
                    ✎
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files[0])}
                    />
                  </label>
                </div>
              </div>

              {/* Personal Info */}
              <div className="grid grid-cols-2 gap-5">
                <input
                  value={user.firstName || ""}
                  onChange={e => setUser({ ...user, firstName: e.target.value })}
                  placeholder="First Name"
                  className="border px-4 py-3 rounded-full"
                />
                <input
                  value={user.lastName || ""}
                  onChange={e => setUser({ ...user, lastName: e.target.value })}
                  placeholder="Last Name"
                  className="border px-4 py-3 rounded-full"
                />
                <input
                  value={user.phone || ""}
                  onChange={e => setUser({ ...user, phone: e.target.value })}
                  placeholder="Phone Number"
                  className="border px-4 py-3 rounded-full col-span-2"
                />
              </div>

              {/* Address */}
              <h3 className="mt-10 font-semibold">Address</h3>
              <div className="grid grid-cols-2 gap-5 mt-4">
                <input
                  placeholder="Address Line"
                  value={user.address?.line1 || ""}
                  onChange={e => setUser({ ...user, address: { ...user.address, line1: e.target.value } })}
                  className="border px-4 py-3 rounded-full col-span-2"
                />
                <input
                  placeholder="City"
                  value={user.address?.city || ""}
                  onChange={e => setUser({ ...user, address: { ...user.address, city: e.target.value } })}
                  className="border px-4 py-3 rounded-full"
                />
                <input
                  placeholder="State"
                  value={user.address?.state || ""}
                  onChange={e => setUser({ ...user, address: { ...user.address, state: e.target.value } })}
                  className="border px-4 py-3 rounded-full"
                />
                <input
                  placeholder="Pincode"
                  value={user.address?.pincode || ""}
                  onChange={e => setUser({ ...user, address: { ...user.address, pincode: e.target.value } })}
                  className="border px-4 py-3 rounded-full"
                />
              </div>

              <button
                onClick={handleSave}
                className="mt-10 bg-green-600 hover:bg-green-700 text-white px-10 py-3 rounded-full"
              >
                Update Changes
              </button>
            </>
          )}

          {activeTab === "orders" && <p>Orders page coming soon...</p>}
          {activeTab === "password" && <p>Password change page coming soon...</p>}
          {activeTab === "address" && <p>Manage Address page coming soon...</p>}
          {activeTab === "payment" && <p>Payment methods page coming soon...</p>}

        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
