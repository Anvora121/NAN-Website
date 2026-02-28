import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../utils/api";

function SignIn({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("Please enter email and password.");
      return;
    }

    /* ================= ADMIN LOGIN ================= */
    try {
      const adminRes = await api.post("/admin/login", form);

      if (adminRes.data?.token) {
        localStorage.setItem("token", adminRes.data.token);
        localStorage.setItem("role", "admin");

        setIsLoggedIn(true);
        navigate("/admin/dashboard");
        return; // 🔴 IMPORTANT: stop here
      }
    } catch (err) {
      // silently fail → try user login
    }

    /* ================= USER LOGIN ================= */
    try {
      const res = await api.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", "user");

      setIsLoggedIn(true);
      navigate("/");
    } catch (err) {
      setError("Invalid credentials. Please sign up if you don't have an account.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAEDCD] px-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        {/* LEFT */}
        <div className="hidden md:flex flex-col items-center justify-center bg-[#CCD5AE] p-10">
          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            alt="User"
            className="w-32 h-32 rounded-full shadow-lg mb-6"
          />
          <h2 className="text-xl font-semibold text-[#6B705C]">
            Welcome back
          </h2>
          <p className="text-sm text-[#6B705C]/70 mt-2 text-center">
            Login to continue shopping your favorite collections
          </p>
        </div>

        {/* RIGHT */}
        <div className="p-10">
          <h1 className="text-2xl font-semibold text-[#6B705C] mb-6">
            Login
          </h1>

          {error && (
            <p className="mb-4 text-sm text-red-500">{error}</p>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
            />

            <button
              type="submit"
              className="w-full py-3 bg-[#D4A373] text-white rounded-md tracking-wide hover:opacity-90"
            >
              LOGIN
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-[#6B705C]/80">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-[#D4A373] font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
