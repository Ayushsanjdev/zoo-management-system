import React, { useState } from "react";
import Header from "../layout/Header"; // Admin header
import StaffHeader from "../staff/StaffHeader"; // Staff header
import SafariAnimals from "../common/SafariAnimals";
import BackgroundDecoration from "../common/BackgroundDecoration";
import { useAuth } from "../../context/AuthContext";

const Layout = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className='min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-green-900 relative overflow-hidden'>
      {/* Safari Animals Animation */}
      <SafariAnimals />

      {/* Background Decorations */}
      <div className='relative'>
        <BackgroundDecoration position='top' />
        <BackgroundDecoration position='bottom' />
      </div>

      <div className='relative z-10'>
        {/* Conditional Header based on user role */}
        {user?.role === "ADMIN" ? (
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

        {/* Main Content */}
        <main>
          <div className='max-w-7xl mx-auto py-6 px-6'>{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
