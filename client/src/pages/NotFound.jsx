import React from "react";
import { MapPin, Home, ArrowLeft, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import SafariAnimals from "../components/common/SafariAnimals";
import BackgroundDecoration from "../components/common/BackgroundDecoration";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-green-900 relative overflow-hidden'>
      {/* Background Elements */}
      <SafariAnimals />
      <div className='relative'>
        <BackgroundDecoration position='top' />
        <BackgroundDecoration position='bottom' />
      </div>

      {/* 404 Content */}
      <div className='relative z-10 min-h-screen flex items-center justify-center p-6'>
        <div className='max-w-3xl w-full text-center'>
          {/* 404 Header */}
          <div className='mb-8'>
            <div className='inline-flex items-center justify-center w-24 h-24 bg-orange-500/20 rounded-full mb-6'>
              <MapPin className='w-12 h-12 text-orange-400' />
            </div>

            {/* Large 404 */}
            <div className='text-8xl md:text-9xl font-bold text-white/10 mb-4 select-none'>
              404
            </div>

            <h1 className='text-4xl md:text-5xl font-bold text-white mb-4'>
              Lost in the Safari! 🦁
            </h1>

            <p className='text-xl text-gray-300 mb-2'>
              Oops! Looks like you've wandered off the beaten path.
            </p>
            <p className='text-gray-400'>
              The page you're looking for doesn't exist in our wildlife
              preserve.
            </p>
          </div>

          {/* Safari Animals */}
          <div className='flex justify-center items-center space-x-4 mb-8'>
            {["🦁", "🐘", "🦒", "🦓", "🐆"].map((animal, index) => (
              <div
                key={index}
                className='text-4xl md:text-5xl animate-bounce'
                style={{
                  animationDelay: `${index * 0.2}s`,
                  animationDuration: "2s",
                }}
              >
                {animal}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 justify-center mb-8'>
            <Link
              to='/dashboard'
              className='flex items-center justify-center space-x-2 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105'
            >
              <Home className='w-5 h-5' />
              <span>Return to Base Camp</span>
            </Link>

            <button
              onClick={handleGoBack}
              className='flex items-center justify-center space-x-2 px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105'
            >
              <ArrowLeft className='w-5 h-5' />
              <span>Retrace Steps</span>
            </button>
          </div>

          {/* Popular Destinations */}
          <div className='bg-gray-900/70 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6'>
            <div className='flex items-center justify-center space-x-2 mb-4'>
              <Search className='w-5 h-5 text-emerald-400' />
              <h3 className='text-lg font-semibold text-white'>
                Popular Safari Destinations
              </h3>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3'>
              <Link
                to='/dashboard'
                className='flex items-center space-x-2 px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-200 group'
              >
                <span className='text-2xl group-hover:scale-110 transition-transform'>
                  🏠
                </span>
                <span className='text-gray-300 group-hover:text-white'>
                  Dashboard
                </span>
              </Link>

              <Link
                to='/animals'
                className='flex items-center space-x-2 px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-200 group'
              >
                <span className='text-2xl group-hover:scale-110 transition-transform'>
                  🦁
                </span>
                <span className='text-gray-300 group-hover:text-white'>
                  Animals
                </span>
              </Link>

              <Link
                to='/staff'
                className='flex items-center space-x-2 px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-200 group'
              >
                <span className='text-2xl group-hover:scale-110 transition-transform'>
                  👥
                </span>
                <span className='text-gray-300 group-hover:text-white'>
                  Staff
                </span>
              </Link>

              <Link
                to='/scheduling'
                className='flex items-center space-x-2 px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-200 group'
              >
                <span className='text-2xl group-hover:scale-110 transition-transform'>
                  📅
                </span>
                <span className='text-gray-300 group-hover:text-white'>
                  Scheduling
                </span>
              </Link>
            </div>
          </div>

          {/* Fun Safari Fact */}
          <div className='mt-8'>
            <div className='inline-flex items-center space-x-3 px-6 py-4 bg-gradient-to-r from-orange-900/30 to-yellow-900/30 rounded-full border border-orange-700/50'>
              <span className='text-2xl'>🌍</span>
              <div className='text-left'>
                <p className='text-orange-200 text-sm font-medium'>
                  Safari Fact:
                </p>
                <p className='text-orange-300/80 text-xs'>
                  Even experienced guides sometimes take wrong turns - that's
                  how new paths are discovered!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
