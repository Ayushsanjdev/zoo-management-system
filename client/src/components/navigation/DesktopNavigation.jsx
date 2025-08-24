import React from "react";
import { Activity, BarChart3, Calendar, Settings, Users } from "lucide-react";
import { NavLink } from "react-router-dom";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
  { name: "Animal Management", href: "/animals", icon: Activity },
  { name: "Staff Management", href: "/staff", icon: Users },
  { name: "Scheduling", href: "/scheduling", icon: Calendar },
  { name: "Settings", href: "/settings", icon: Settings },
];

const DesktopNavigation = () => (
  <div className='hidden lg:flex lg:gap-x-1'>
    {navigation.map((item) => {
      const IconComponent = item.icon;
      return (
        <NavLink
          key={item.name}
          to={item.href}
          className={({ isActive }) =>
            `group flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              isActive
                ? "bg-emerald-600 text-white"
                : "text-gray-200 hover:text-white hover:bg-white/10"
            }`
          }
        >
          <IconComponent className='w-4 h-4' />
          <span>{item.name}</span>
        </NavLink>
      );
    })}
  </div>
);

export default DesktopNavigation;
