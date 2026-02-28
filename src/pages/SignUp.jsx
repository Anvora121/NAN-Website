import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../utils/api";

function SignUp({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.phone ||
      !form.password ||
      !form.gender
    ) {
      setError("All fields are required.");
      return;
    }

    try {
      const res = await api.post("/auth/signup", {
        ...form,
        profilePic:
          "https://cdn-icons-png.flaticon.com/512/847/847969.png",
      });

      localStorage.setItem("token", res.data.token);
      setIsLoggedIn(true);
      navigate("/");
    } catch (err) {
      setError("User already exists. Please login.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAEDCD] px-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden grid md:grid-cols-2">
        
        {/* LEFT: IMAGE / PROFILE */}
        <div className="hidden md:flex flex-col items-center justify-center bg-[#CCD5AE] p-10">
          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            alt="Profile"
            className="w-32 h-32 rounded-full shadow-lg mb-6"
          />
          <h2 className="text-xl font-semibold text-[#6B705C]">
            Create your account
          </h2>
          <p className="text-sm text-[#6B705C]/70 mt-2 text-center">
            Join us and start shopping your favorite collections
          </p>
        </div>

        {/* RIGHT: FORM */}
        <div className="p-10">
          <h1 className="text-2xl font-semibold text-[#6B705C] mb-6">
            Sign Up
          </h1>

          {error && (
            <p className="mb-4 text-sm text-red-500">{error}</p>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
                className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
                className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
            />

            {/* GENDER */}
            <div className="flex gap-6 mt-2 text-sm text-[#6B705C]">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={handleChange}
                />
                Female
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={handleChange}
                />
                Male
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  onChange={handleChange}
                />
                Other
              </label>
            </div>

            <button
              type="submit"
              className="w-full mt-4 py-3 bg-[#D4A373] text-white rounded-md tracking-wide hover:opacity-90"
            >
              CREATE ACCOUNT
            </button>
          </form>

          {/* LOGIN LINK */}
          <p className="mt-6 text-sm text-center text-[#6B705C]/80">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-[#D4A373] font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
