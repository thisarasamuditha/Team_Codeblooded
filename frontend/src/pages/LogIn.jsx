import React from "react";
import { Link } from "react-router-dom";
import logo from "../Images/Logo.png";

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#050934] via-[#0a1748] to-[#050934] p-4">
      {/* Card */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">
        
{/* Left Panel */}
<div className="bg-[#050934] text-white flex flex-col justify-center items-center p-8 md:w-1/2 relative">
  <div className="bg-white p-4 rounded-xl shadow-lg mb-6">
    <img src={logo} alt="Logo" className="w-20 drop-shadow-md" />
  </div>
  <h2 className="text-3xl font-extrabold tracking-wide">QUICK CASH</h2>
  <p className="mt-4 text-gray-300 text-center max-w-sm">
    Manage your finances with speed and simplicity.  
    Join us today for a smarter money experience.
  </p>
  <Link
    to="/signup"
    className="mt-6 px-6 py-2 border-2 border-lime-400 text-lime-400 rounded-full font-semibold hover:bg-lime-400 hover:text-[#050934] transition"
  >
    Create Account
  </Link>
</div>


        {/* Right Panel */}
        <div className="flex-1 flex flex-col justify-center items-center p-10">
          {/* Logo */}
          <div className="mb-6">
            <img src={logo} alt="Logo" className="w-16 drop-shadow-md" />
          </div>

          <h2 className="text-2xl font-bold text-green-700 mb-6 uppercase tracking-wide">
            Login to Continue
          </h2>

          {/* Login Form */}
          <form className="w-full max-w-sm space-y-5">
            <div className="relative">
              <input
                type="text"
                placeholder="Username"
                required
                className="w-full px-12 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-lime-400"
              />
              <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>

            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                required
                className="w-full px-12 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-lime-400"
              />
              <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-lime-400" />
                Remember me
              </label>
              <a className="text-green-700 hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-lime-400 text-[#050934] py-3 rounded-lg font-bold uppercase shadow-md hover:bg-green-700 hover:text-white transition"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center w-full max-w-sm my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="px-2 text-gray-500 text-sm">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Alternative Signup */}
          <p className="text-gray-600 text-sm mb-4">
            Don’t have an account yet?
          </p>
          <Link to="/signup" className="w-full max-w-sm">
            <button className="w-full py-3 border border-gray-300 rounded-lg bg-white hover:border-lime-400 hover:shadow transition">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
