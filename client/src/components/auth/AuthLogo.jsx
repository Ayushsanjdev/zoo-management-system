import React from "react";

const AuthLogo = () => (
  <div className="flex flex-col items-center space-y-4">
    <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl shadow-2xl">
      <span className="text-4xl">🦁</span>
    </div>
    <div className="text-center">
      <h1 className="text-3xl font-bold text-white">Wild Safari Zoo</h1>
      <p className="text-emerald-200 text-sm mt-1">Management System</p>
    </div>
  </div>
);

export default AuthLogo;
