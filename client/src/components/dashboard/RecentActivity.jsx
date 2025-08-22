import React from "react";

const RecentActivity = () => {
  const activities = [
    {
      time: "10:30 AM",
      action: "Tiger health check completed",
      user: "Dr. Smith",
      type: "medical",
    },
    {
      time: "09:45 AM",
      action: "New penguin feeding schedule",
      user: "Jane Cooper",
      type: "schedule",
    },
    {
      time: "09:12 AM",
      action: "Staff meeting scheduled",
      user: "Mike Johnson",
      type: "admin",
    },
    {
      time: "08:30 AM",
      action: "Lion enclosure maintenance",
      user: "Tom Wilson",
      type: "maintenance",
    },
  ];

  return (
    <div className='bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6'>
      <h3 className='text-lg font-semibold text-white mb-4'>Recent Activity</h3>
      <div className='space-y-4'>
        {activities.map((activity, index) => (
          <div
            key={index}
            className='flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-700/50 transition-all duration-200'
          >
            <div className='w-2 h-2 rounded-full bg-emerald-400 mt-2'></div>
            <div className='flex-1 min-w-0'>
              <p className='text-sm font-medium text-white'>
                {activity.action}
              </p>
              <p className='text-xs text-gray-400 mt-1'>
                by {activity.user} at {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default RecentActivity;
