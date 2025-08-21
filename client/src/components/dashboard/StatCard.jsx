import React from "react";


const StatCard = ({ stat }) => {
  const trendColor =
    stat.trend === "up"
      ? "text-green-400"
      : stat.trend === "down"
      ? "text-red-400"
      : "text-orange-400";

  const bgColor =
    stat.trend === "urgent"
      ? "bg-orange-500/20 border-orange-500/30"
      : "bg-gray-800/50 border-gray-700";

  return (
    <div
      className={`p-6 rounded-xl border backdrop-blur-sm hover:bg-gray-700/50 transition-all duration-300 ${bgColor}`}
    >
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-3'>
          <span className='text-2xl'>{stat.icon}</span>
          <div>
            <p className='text-sm font-medium text-gray-400'>{stat.label}</p>
            <p className='text-2xl font-bold text-white'>{stat.value}</p>
          </div>
        </div>
        <div className={`text-sm font-medium ${trendColor}`}>{stat.change}</div>
      </div>
    </div>
  );
};
export default StatCard;
