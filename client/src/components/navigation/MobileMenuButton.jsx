import { Menu } from "lucide-react";
import React from "react";

const MobileMenuButton = ({ onClick }) => (
  <button
    type='button'
    onClick={onClick}
    className='lg:hidden p-2 rounded-lg text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-200'
  >
    <span className='sr-only'>Open navigation menu</span>
    <Menu className='h-6 w-6' />
  </button>
);
export default MobileMenuButton;
