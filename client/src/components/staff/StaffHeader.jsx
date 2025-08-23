import React from "react";
import StaffLogo from "../common/StaffLogo";
import StaffDesktopNavigation from "../navigation/StaffDesktopNavigation";
import { Bell, Menu } from "lucide-react";
import StaffMobileNavigation from "../navigation/StaffMobileNavigation";

const StaffHeader = ({ mobileMenuOpen, setMobileMenuOpen }) => (
  <header className='sticky top-0 z-40 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700'>
    <div className='flex items-center justify-between px-6 py-4'>
      <div className='flex items-center space-x-4'>
        <StaffLogo />
        <div className='hidden md:block h-6 w-px bg-gray-600' />
        <SearchBar />
      </div>

      <div className='flex items-center space-x-4'>
        <StaffDesktopNavigation />

        <div className='hidden lg:flex items-center space-x-3'>
          <button className='relative p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-200'>
            <Bell className='w-5 h-5' />
            <span className='absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full'></span>
          </button>

          <div className='flex items-center space-x-3 pl-3 border-l border-gray-600'>
            <div className='w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center'>
              <span className='text-white text-sm font-semibold'>SK</span>
            </div>
            <div className='hidden lg:block'>
              <div className='text-sm font-medium text-white'>
                Sarah Johnson
              </div>
              <div className='text-xs text-gray-400'>Zookeeper</div>
            </div>
          </div>
        </div>

        <button
          type='button'
          onClick={() => setMobileMenuOpen(true)}
          className='lg:hidden p-2 rounded-lg text-gray-200 hover:text-white hover:bg-white/10 transition-all duration-200'
        >
          <Menu className='h-6 w-6' />
        </button>
      </div>
    </div>

    <StaffMobileNavigation
      isOpen={mobileMenuOpen}
      onClose={setMobileMenuOpen}
    />
  </header>
);

export default StaffHeader;
