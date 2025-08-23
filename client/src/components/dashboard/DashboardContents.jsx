import React from "react";
import StatCard from "./StatCard";
import QuickActions from "./QuickActions";

const managementStats = [
  {
    label: "Animals Under Care",
    value: "1,247",
    change: "+12",
    trend: "up",
    icon: "🦁",
  },
  { label: "Active Staff", value: "89", change: "+3", trend: "up", icon: "👥" },
  // {
  //   label: "Today's Visitors",
  //   value: "2,458",
  //   change: "-156",
  //   trend: "down",
  //   icon: "🎫",
  // },
  {
    label: "Health Checkups Due",
    value: "23",
    change: "+5",
    trend: "urgent",
    icon: "🏥",
  },
];

const DashboardContent = () => (
  <div className='max-w-7xl mx-auto px-6 py-8'>
    <div className='mb-8'>
      <h1 className='text-3xl font-bold text-white'>Management Dashboard</h1>
      <p className='text-gray-400 mt-2'>
        Monitor and manage your zoo operations
      </p>
    </div>
    

    {/* Stats Grid */}
    <div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-6 mb-8'>
      {managementStats.map((stat, index) => (
        <StatCard key={index} stat={stat} />
      ))}
    </div>

    {/* Main Content Grid */}
    <div className='w-full gap-8'>
      <QuickActions />
    </div>
  </div>
);
export default DashboardContent;
