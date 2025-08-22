import { Shield } from "lucide-react";
import React from "react";

const Logo = ({ variant = "default" }) => (
  <div className='flex items-center space-x-3'>
    <div className='flex items-center justify-center w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-lg'>
      <Shield className='w-6 h-6 text-white' />
    </div>
    <div className='flex flex-col'>
      <span className='text-white font-bold text-lg leading-tight'>ZooMS</span>
      {variant === "full" && (
        <span className='text-green-200 text-xs'>Management System</span>
      )}
    </div>
  </div>
);
export default Logo;
