import React, { useState } from "react";
import SafariAnimals from "./components/common/SafariAnimals";
import BackgroundDecoration from "./components/common/BackgroundDecoration";
import Header from "./components/layout/Header";
import DashboardContent from "./components/dashboard/DashboardContents";
import StaffDashboardContent from "./components/staff/StaffDashboardContent";
import StaffHeader from "./components/staff/StaffHeader";

const USER_TYPE = "Admin";

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className='min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-green-900 relative overflow-hidden'>
      <SafariAnimals />
      <div className='relative'>
        <BackgroundDecoration position='top' />
        <BackgroundDecoration position='bottom' />
      </div>

      <div className='relative z-10'>
        {USER_TYPE === "Admin" ? (
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
          {USER_TYPE === "Admin" ? (
            <DashboardContent />
          ) : (
            <StaffDashboardContent />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
