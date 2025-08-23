import React from "react";
import Logo from "../common/Logo";
import DesktopNavigation from "../navigation/DesktopNavigation";
import { Bell } from "lucide-react";
import MobileMenuButton from "../navigation/MobileMenuButton";
import MobileNavigation from "../navigation/MobileNavigation";

const Header = ({ mobileMenuOpen, setMobileMenuOpen }) => (
  <header className='sticky top-0 z-40 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700'>
    <div className='flex items-center justify-between px-6 py-4'>
      <div className='flex items-center space-x-4'>
        <Logo />
        <div className='hidden md:block h-6 w-px bg-gray-600' />
        {/* <SearchBar /> */}
      </div>

      <div className='flex items-center space-x-4'>
        <DesktopNavigation />

        <div className='hidden lg:flex items-center space-x-3'>
          <button className='relative p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-200'>
            <Bell className='w-5 h-5' />
            <span className='absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full'></span>
          </button>

          <div className='flex items-center space-x-3 pl-3 border-l border-gray-600'>
            <div className='w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center'>
              <span className='text-white text-sm font-semibold'>JD</span>
            </div>
            <div className='hidden lg:block'>
              <div className='text-sm font-medium text-white'>Dr. John Doe</div>
              <div className='text-xs text-gray-400'>Veterinarian</div>
            </div>
          </div>
        </div>

        <MobileMenuButton onClick={() => setMobileMenuOpen(true)} />
      </div>
    </div>

    <MobileNavigation isOpen={mobileMenuOpen} onClose={setMobileMenuOpen} />
  </header>
);
export default Header;
