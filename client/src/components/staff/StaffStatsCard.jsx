import React from "react";

const StaffStatCard = ({ stat }) => {
  const getStatusColor = () => {
    switch (stat.trend) {
      case "good":
        return "text-green-400 bg-green-500/20 border-green-500/30";
      case "attention":
        return "text-orange-400 bg-orange-500/20 border-orange-500/30";
      default:
        return "text-blue-400 bg-gray-800/50 border-gray-700";
    }
  };

  return (
    <div
      className={`p-6 rounded-xl border backdrop-blur-sm hover:bg-gray-700/50 transition-all duration-300 ${getStatusColor()}`}
    >
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-3'>
          <span className='text-2xl'>{stat.icon}</span>
          <div>
            <p className='text-sm font-medium text-gray-300'>{stat.label}</p>
            <p className='text-2xl font-bold text-white'>{stat.value}</p>
          </div>
        </div>
        <div className='text-right'>
          {stat.completed && (
            <div className='text-sm text-green-400 font-medium'>
              {stat.completed} done
            </div>
          )}
          {stat.unread && (
            <div className='text-sm text-orange-400 font-medium'>
              {stat.unread} new
            </div>
          )}
          {stat.remaining && (
            <div className='text-sm text-gray-400'>{stat.remaining} left</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StaffStatCard;
