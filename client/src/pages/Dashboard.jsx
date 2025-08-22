import React, { useState } from "react";
import SafariAnimals from "../components/common/SafariAnimals";
import BackgroundDecoration from "../components/common/BackgroundDecoration";
import Header from "../components/layout/Header";
import DashboardContent from "../components/dashboard/DashboardContents";
import StaffDashboardContent from "../components/staff/StaffDashboardContent";
import StaffHeader from "../components/staff/StaffHeader";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-green-900 relative overflow-hidden">
      <SafariAnimals />
      <div className="relative">
        <BackgroundDecoration position="top" />
        <BackgroundDecoration position="bottom" />
      </div>

      <div className="relative z-10">
        {user.role === "ADMIN" ? (
          <Header
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
          />
        ) : (
          <StaffHeader
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
          />
        )}
        <main>
          {user.role === "ADMIN" ? (
            <DashboardContent />
          ) : (
            <StaffDashboardContent />
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
