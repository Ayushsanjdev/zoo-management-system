import React from "react";
import SafariAnimals from "./SafariAnimals";
import BackgroundDecoration from "./BackgroundDecoration";

const LoadingSpinner = ({ message = "Loading your safari adventure..." }) => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-green-900 relative overflow-hidden'>
      {/* Background Elements */}
      <SafariAnimals />
      <div className='relative'>
        <BackgroundDecoration position='top' />
        <BackgroundDecoration position='bottom' />
      </div>

      {/* Loading Content */}
      <div className='relative z-10 min-h-screen flex items-center justify-center p-6'>
        <div className='text-center'>
          {/* Safari Loading Animation */}
          <div className='relative mb-8'>
            {/* Main spinning circle */}
            <div className='w-20 h-20 mx-auto border-4 border-emerald-600/30 border-t-emerald-500 rounded-full animate-spin'></div>

            {/* Inner pulsing dot */}
            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='w-3 h-3 bg-emerald-500 rounded-full animate-pulse'></div>
            </div>
          </div>

          {/* Loading Text */}
          <h2 className='text-2xl font-bold text-white mb-2'>{message}</h2>

          {/* Safari Animals Loading Indicators */}
          <div className='flex items-center justify-center space-x-4 mb-6'>
            {["🦁", "🐘", "🦒", "🦓"].map((animal, index) => (
              <div
                key={index}
                className='text-2xl animate-bounce'
                style={{
                  animationDelay: `${index * 0.2}s`,
                }}
              >
                {animal}
              </div>
            ))}
          </div>

          {/* Loading Progress Dots */}
          <div className='flex items-center justify-center space-x-2'>
            {[0, 1, 2].map((dot) => (
              <div
                key={dot}
                className='w-2 h-2 bg-emerald-500 rounded-full animate-pulse'
                style={{
                  animationDelay: `${dot * 0.3}s`,
                }}
              ></div>
            ))}
          </div>

          {/* Fun Loading Message */}
          <div className='mt-8 max-w-md mx-auto'>
            <div className='bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50'>
              <p className='text-gray-300 text-sm'>
                🌿 Gathering the animals for your next adventure...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
