import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";

function AdminSignup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BACKEND_URL}/admin/signup`,
        { firstName, lastName, email, password },
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );
      toast.success(response.data.message);
      navigate("/admin/login");
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.errors || "Signup failed");
      }
    }
  };

  return (
    <div className="bg-gradient-to-r from-black to-gray-800 min-h-screen flex flex-col">
      {/* Header */}
      <header className="w-full flex justify-between items-center p-5 bg-gray-900/50 backdrop-blur-md fixed top-0 left-0 z-10">
        <div className="flex items-center space-x-2">
          <img src="logo.webp" alt="Logo" className="w-12 h-12 sm:w-16 sm:h-16 rounded-full" />
          <Link to="/" className="text-lg sm:text-2xl text-pink-600 font-bold font-serif">HustleLearn</Link>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Link to="/admin/login" className="py-2 px-3 sm:py-2 sm:px-4 border border-white rounded text-white text-sm sm:text-base">Login</Link>
          <Link to="/courses" className="py-2 px-3 sm:py-2 sm:px-4 border border-white rounded text-white text-sm sm:text-base">Join Now</Link>
        </div>
      </header>

      {/* Signup Form */}
      <div className="flex flex-1 items-center justify-center p-4 mt-20 sm:mt-24">
        <div className="bg-gray-900 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">
            Welcome to <span className="text-pink-600">HustleLearn</span>
          </h2>
          <p className="text-center text-gray-400 mb-6">Signup to join!</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="firstname" className="text-gray-400">Firstname</label>
              <input
                type="text"
                id="firstname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-2 sm:p-3 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Your Firstname"
              />
            </div>
            <div>
              <label htmlFor="lastname" className="text-gray-400">Lastname</label>
              <input
                type="text"
                id="lastname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-2 sm:p-3 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Your Lastname"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-gray-400">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 sm:p-3 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Your Email"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-gray-400">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 sm:p-3 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Your Password"
              />
            </div>
            {errorMessage && (
              <div className="text-red-500 text-center">{errorMessage}</div>
            )}
            <button type="submit" className="w-full py-2 sm:py-3 bg-gradient-to-r from-orange-500 to-pink-500 rounded-md text-white font-bold">
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminSignup;
