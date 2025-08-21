import React from "react";
import { Activity, BarChart3, Calendar, Settings, Users } from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "#dashboard", icon: BarChart3 },
  { name: "Animal Management", href: "#animals", icon: Activity },
  { name: "Staff Management", href: "#staff", icon: Users },
  { name: "Scheduling", href: "#scheduling", icon: Calendar },
  { name: "Settings", href: "#settings", icon: Settings },
];

const DesktopNavigation = () => (
  <div className='hidden lg:flex lg:gap-x-1'>
    {navigation.map((item) => {
      const IconComponent = item.icon;
      return (
        <a
          key={item.name}
          href={item.href}
          className='group flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-200'
        >
          <IconComponent className='w-4 h-4' />
          <span>{item.name}</span>
        </a>
      );
    })}
  </div>
);
export default DesktopNavigation;
