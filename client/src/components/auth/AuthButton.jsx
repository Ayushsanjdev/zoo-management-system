import React from "react";

const AuthButton = ({
  children,
  onClick,
  variant = "primary",
  disabled = false,
  className = "",
}) => {
  const baseClasses =
    "w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";

  const variants = {
    primary:
      "bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-white focus:ring-emerald-500 shadow-lg hover:shadow-xl",
    secondary: "bg-gray-700 hover:bg-gray-600 text-white focus:ring-gray-500",
    outline:
      "border-2 border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-white focus:ring-emerald-500",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default AuthButton;
