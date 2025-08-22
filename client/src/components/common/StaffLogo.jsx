import { User } from "lucide-react";
import React from "react";


const StaffLogo = ({ variant = "default" }) => (
  <div className="flex items-center space-x-3">
    <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg">
      <User className="w-6 h-6 text-white" />
    </div>
    <div className="flex flex-col">
      <span className="text-white font-bold text-lg leading-tight">Staff Portal</span>
      {variant === "full" && (
        <span className="text-blue-200 text-xs">Zoo Management</span>
      )}
    </div>
  </div>
);

export default StaffLogo;