import React, { useState } from "react";
import loginIcons from "../assest/signin.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imageTobase64 from "../helpers/imageTobase64";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    profilePic: "",
  });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageTobase64(file);
    setData((prev) => ({
      ...prev,
      profilePic: imagePic,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(SummaryApi.signUP.url, {
        method: SummaryApi.signUP.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const dataApi = await dataResponse.json();

      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/login");
      } else if (dataApi.error) {
        toast.error(dataApi.message);
      }
    } else {
      toast.error("Please check password and confirm password");
    }
  };

  return (
    <section
      id="signup"
      className="min-h-screen flex items-center justify-center bg-gray-100"
    >
      <div className="bg-white p-6 w-full max-w-md mx-auto rounded-lg shadow-lg">
        <div className="w-24 h-24 mx-auto relative overflow-hidden rounded-full mb-4">
          <img
            src={data.profilePic || loginIcons}
            alt="Profile"
            className="w-full h-full object-cover"
          />
          <label className="cursor-pointer absolute bottom-0 w-full text-center bg-gray-700 bg-opacity-50 text-white text-xs py-2">
            Upload Photo
            <input type="file" className="hidden" onChange={handleUploadPic} />
          </label>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Name:
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              name="name"
              value={data.name}
              onChange={handleOnChange}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email:
            </label>
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              value={data.email}
              onChange={handleOnChange}
              required
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Password:
            </label>
            <div className="flex items-center border border-gray-300 rounded mt-1">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={data.password}
                name="password"
                onChange={handleOnChange}
                required
                className="w-full p-2 bg-transparent focus:outline-none"
              />
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700 p-2"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Confirm Password:
            </label>
            <div className="flex items-center border border-gray-300 rounded mt-1">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Enter confirm password"
                value={data.confirmPassword}
                name="confirmPassword"
                onChange={handleOnChange}
                required
                className="w-full p-2 bg-transparent focus:outline-none"
              />
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700 p-2"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 w-full rounded-full hover:bg-blue-700 transition mt-4"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignUp;
