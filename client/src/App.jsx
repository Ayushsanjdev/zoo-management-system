import React, { useState } from "react";
import SafariAnimals from "./components/common/SafariAnimals";
import BackgroundDecoration from "./components/common/BackgroundDecoration";
import Header from "./components/layout/Header";
import DashboardContent from "./components/dashboard/DashboardContents";

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className='min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-green-900 relative overflow-hidden'>
      {/* Background Elements */}
      <SafariAnimals />
      <div className='relative'>
        <BackgroundDecoration position='top' />
        <BackgroundDecoration position='bottom' />
      </div>

      {/* Main Content */}
      <div className='relative z-10'>
        <Header
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        <main>
          <DashboardContent />
        </main>
      </div>
    </div>
  );
}

export default App;
