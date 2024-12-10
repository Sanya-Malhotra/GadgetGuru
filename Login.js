import React, { useContext, useState, useEffect } from "react";
import loginIcons from "../assest/signin.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";
import { auth, provider } from "../helpers/config";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);
  const [user, setUser] = useState(null); // Initialize with null for clarity
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const data = await signInWithPopup(auth, provider);
      setUser(data.user);
      setEmail(data.user.email);
      localStorage.setItem("email", data.user.email);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataResponse = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate("/");
      fetchUserDetails();
      fetchUserAddToCart();
    } else if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  return (
    <>
      {user ? (
        <Navigate to={"/"} />
      ) : (
        <section
          id="login"
          className="min-h-screen flex items-center justify-center bg-gray-100"
        >
          <div className="bg-white p-6 w-full max-w-sm mx-auto rounded-lg shadow-lg">
            <div className="w-20 h-20 mx-auto mb-4">
              <img
                src={loginIcons}
                alt="login icons"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Login
            </h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-600"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter email"
                  value={data.email}
                  onChange={handleOnChange}
                  className="p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-600"
                >
                  Password:
                </label>
                <div className="flex items-center border border-gray-300 rounded p-2 focus-within:border-blue-500 transition">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Enter password"
                    value={data.password}
                    onChange={handleOnChange}
                    className="flex-1 outline-none bg-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="text-gray-500 hover:text-gray-700 transition"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <Link
                  to={"/forgot-password"}
                  className="text-sm text-blue-600 hover:underline self-end"
                >
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition"
              >
                Login
              </button>
              <button
                type="button"
                onClick={handleLogin}
                className="bg-red-600 text-white py-2 rounded-full hover:bg-red-700 transition mt-2"
              >
                Google Login
              </button>
            </form>
            <p className="text-center text-gray-600 mt-6">
              Don't have an account?{" "}
              <Link to={"/sign-up"} className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </section>
      )}
    </>
  );
};

export default Login;
