import React from "react";
import StatCard from "./StatCard";
import QuickActions from "./QuickActions";
import RecentActivity from "./RecentActivity";

//get all count from the server
const getAnimalCount = async () => {
  //base url
  const baseUrl = "http://localhost:4000";
  const response = await fetch(`${baseUrl}/api/animals/count`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const data = await response.json();
  return data.count;
};

const getEnclosureStaffCount = async () => {
  const baseUrl = "http://localhost:4000";
  const response = await fetch(`${baseUrl}/api/enclosure-staff/count`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  const data = await response.json();
  return data.count;
};

let enclosureStaffCountData = await getEnclosureStaffCount();

let animalCountData = await getAnimalCount();

// const managementStats = [
//   {
//     label: "Animals Under Care",
//     value: animalCountData.count.toString(),
//     change: animalCountData.addedToday,
//     trend: "up",
//     icon: "🦁",
//   },
//   { label: "Active Staff", value: enclosureStaffCountData.count, change: enclosureStaffCountData.addedToday, trend: "up", icon: "👥" },
//   {
//     label: "Today's Visitors",
//     value: "2,458",
//     change: "-156",
//     trend: "down",
//     icon: "🎫",
//   },
//   {
//     label: "Health Checkups Due",
//     value: "23",
//     change: "+5",
//     trend: "urgent",
//     icon: "🏥",
//   },
// ];

const managementStats = [
  {
    label: "Animals Under Care",
    value: "53",
    change: "+12",
    trend: "up",
    icon: "🦁",
  },
  { label: "Active Staff", value: "8", change: "+3", trend: "up", icon: "👥" },
  {
    label: "Today's Visitors",
    value: "N/A",
    change: "N/A",
    trend: "down",
    icon: "🎫",
  },
  {
    label: "Health Checkups Due",
    value: "2",
    change: "N/A",
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
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8'>
      {managementStats.map((stat, index) => (
        <StatCard key={index} stat={stat} />
      ))}
    </div>

    {/* Main Content Grid */}
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
      <QuickActions />
      <RecentActivity />
    </div>
  </div>
);
export default DashboardContent;
