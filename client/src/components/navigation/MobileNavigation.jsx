import React from "react";
import {
  Activity,
  BarChart3,
  Calendar,
  Settings,
  Users,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import Logo from "../common/Logo";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Animal Management", href: "/animals", icon: Activity },
  { name: "Staff Management", href: "/staff", icon: Users },
  { name: "Scheduling", href: "/scheduling", icon: Calendar },
  { name: "Settings", href: "/settings", icon: Settings },
];

const MobileNavigation = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className='lg:hidden'>
      <div
        className='fixed inset-0 z-50 bg-black/60 backdrop-blur-sm'
        onClick={() => onClose(false)}
      />

      <div className='fixed inset-y-0 left-0 z-50 w-80 overflow-y-auto bg-gradient-to-b from-gray-900 to-gray-800 border-r border-gray-700'>
        <div className='p-6'>
          <div className='flex items-center justify-between mb-8'>
            <Logo variant='full' />
            <button
              type='button'
              onClick={() => onClose(false)}
              className='p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-200'
            >
              <X className='h-5 w-5' />
            </button>
          </div>

          <nav className='space-y-2'>
            {navigation.map((item) => {
              const IconComponent = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `group flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-emerald-600 text-white"
                        : "text-gray-200 hover:text-white hover:bg-gray-700"
                    }`
                  }
                  onClick={() => onClose(false)}
                >
                  <IconComponent
                    className={`w-5 h-5 ${({ isActive }) =>
                      isActive ? "text-white" : "text-emerald-400"}`}
                  />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;
