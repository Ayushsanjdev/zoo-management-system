import React from "react";
import StaffStatCard from "./StaffStatsCard";
import TodaysTasks from "./TodaysTasks";
import MyAnimals from "./MyAnimals";

const staffStats = [
  {
    label: "Tasks Today",
    value: "8",
    completed: "5",
    icon: "✅",
    trend: "good",
  },
  {
    label: "Animals Assigned",
    value: "12",
    care: "ongoing",
    icon: "🦁",
    trend: "normal",
  },
  {
    label: "Hours This Week",
    value: "32",
    remaining: "8",
    icon: "⏰",
    trend: "normal",
  },
  {
    label: "Messages",
    value: "3",
    unread: "1",
    icon: "💬",
    trend: "attention",
  },
];

const StaffDashboardContent = () => (
  <div className='max-w-7xl mx-auto px-6 py-8'>
    <div className='mb-8'>
      <h1 className='text-3xl font-bold text-white'>Good Morning, Sarah!</h1>
      <p className='text-gray-400 mt-2'>
        Ready to take care of our amazing animals today?
      </p>
    </div>

    {/* Stats Grid */}
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8'>
      {staffStats.map((stat, index) => (
        <StaffStatCard key={index} stat={stat} />
      ))}
    </div>

    {/* Main Content Grid */}
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
      <TodaysTasks />
      <MyAnimals />
    </div>
  </div>
);

export default StaffDashboardContent;
