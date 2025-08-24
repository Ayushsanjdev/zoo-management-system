import React from "react";
import DashboardContent from "../components/dashboard/DashboardContents";
import StaffDashboardContent from "../components/staff/StaffDashboardContent";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  return (
    <>
      {user?.role === "ADMIN" ? (
        <DashboardContent />
      ) : (
        <StaffDashboardContent />
      )}
    </>
  );
}

export default Dashboard;
