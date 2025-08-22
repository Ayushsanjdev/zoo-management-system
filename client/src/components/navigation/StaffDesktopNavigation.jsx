import React from "react";
import { Calendar, ClipboardList, Clock, Heart, MessageSquare } from "lucide-react";

// Navigation configuration for staff view
const navigation = [
  { name: "My Tasks", href: "#tasks", icon: ClipboardList },
  { name: "Animal Care", href: "#animal-care", icon: Heart },
  { name: "My Schedule", href: "#schedule", icon: Calendar },
  { name: "Messages", href: "#messages", icon: MessageSquare },
  { name: "Time Clock", href: "#time", icon: Clock },
];

const StaffDesktopNavigation = () => (
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
export default StaffDesktopNavigation;