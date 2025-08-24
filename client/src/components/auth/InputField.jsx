import React from "react";
import { Eye, EyeOff } from "lucide-react";

const InputField = ({
  type = "text",
  placeholder,
  value,
  onChange,
  icon: Icon,
  error,
  showPasswordToggle = false,
  showPassword = false,
  onTogglePassword,
}) => (
  <div className="space-y-2">
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type={showPasswordToggle ? (showPassword ? "text" : "password") : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="block w-full pl-10 pr-12 py-3 border border-gray-600 rounded-lg leading-5 bg-gray-800/50 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
      />
      {showPasswordToggle && (
        <button
          type="button"
          onClick={onTogglePassword}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-300" />
          ) : (
            <Eye className="h-5 w-5 text-gray-400 hover:text-gray-300" />
          )}
        </button>
      )}
    </div>
    {error && <p className="text-red-400 text-sm">{error}</p>}
  </div>
);

export default InputField;
