import React from "react";
import { Calendar, ClipboardList, Clock, Heart, MessageSquare } from "lucide-react";
import StaffLogo from "../common/StaffLogo";

const navigation = [
  { name: "My Tasks", href: "#tasks", icon: ClipboardList },
  { name: "Animal Care", href: "#animal-care", icon: Heart },
  { name: "My Schedule", href: "#schedule", icon: Calendar },
  { name: "Messages", href: "#messages", icon: MessageSquare },
  { name: "Time Clock", href: "#time", icon: Clock },
];

const StaffMobileNavigation = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="lg:hidden">
      <div 
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={() => onClose(false)}
      />
      
      <div className="fixed inset-y-0 left-0 z-50 w-80 overflow-y-auto bg-gradient-to-b from-blue-900 to-gray-800 border-r border-gray-700">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <StaffLogo variant="full" />
            <button
              type="button"
              onClick={() => onClose(false)}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <nav className="space-y-2">
            {navigation.map((item) => {
              const IconComponent = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="group flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-200 hover:text-white hover:bg-gray-700 transition-all duration-200"
                  onClick={() => onClose(false)}
                >
                  <IconComponent className="w-5 h-5 text-blue-400" />
                  <span className="font-medium">{item.name}</span>
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default StaffMobileNavigation;