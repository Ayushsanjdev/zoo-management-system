import React from "react";

const ActionButton = ({
  onClick,
  children,
  variant = "primary",
  size = "md",
  className = "",
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800";

  const variants = {
    primary:
      "bg-emerald-600 hover:bg-emerald-500 text-white focus:ring-emerald-500",
    secondary: "bg-gray-600 hover:bg-gray-500 text-white focus:ring-gray-500",
    danger: "bg-red-600 hover:bg-red-500 text-white focus:ring-red-500",
    outline:
      "border border-gray-500 text-gray-300 hover:bg-gray-600 hover:text-white focus:ring-gray-500",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};

export default ActionButton;
