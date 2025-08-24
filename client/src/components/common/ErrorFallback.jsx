import React from "react";
import { AlertTriangle, RefreshCw, Home, Bug } from "lucide-react";
import { Link } from "react-router-dom";
import BackgroundDecoration from "./BackgroundDecoration";
import SafariAnimals from "./SafariAnimals";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-green-900 relative overflow-hidden'>
      {/* Background Elements */}
      <SafariAnimals />
      <div className='relative'>
        <BackgroundDecoration position='top' />
        <BackgroundDecoration position='bottom' />
      </div>

      {/* Error Content */}
      <div className='relative z-10 min-h-screen flex items-center justify-center p-6'>
        <div className='max-w-2xl w-full'>
          {/* Main Error Card */}
          <div className='bg-gray-900/90 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-2xl p-8'>
            {/* Icon and Title */}
            <div className='text-center mb-8'>
              <div className='inline-flex items-center justify-center w-20 h-20 bg-red-500/20 rounded-full mb-6'>
                <AlertTriangle className='w-10 h-10 text-red-400' />
              </div>
              <h1 className='text-3xl font-bold text-white mb-2'>
                Wild Error Encountered! 🦁
              </h1>
              <p className='text-gray-400 text-lg'>
                Looks like something scared our safari animals away...
              </p>
            </div>

            {/* Error Details (in development) */}
            {process.env.NODE_ENV === "development" && error && (
              <div className='bg-gray-800/50 rounded-lg p-4 mb-6 border border-gray-700'>
                <div className='flex items-center space-x-2 mb-3'>
                  <Bug className='w-5 h-5 text-yellow-400' />
                  <span className='text-yellow-400 font-semibold'>
                    Development Error:
                  </span>
                </div>
                <div className='text-sm text-gray-300 font-mono bg-gray-900/50 p-3 rounded overflow-auto max-h-32'>
                  {error.message}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <button
                onClick={resetErrorBoundary}
                className='flex items-center justify-center space-x-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105'
              >
                <RefreshCw className='w-5 h-5' />
                <span>Reset App</span>
              </button>

              <Link
                to='/dashboard'
                className='flex items-center justify-center space-x-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105'
                onClick={resetErrorBoundary}
              >
                <Home className='w-5 h-5' />
                <span>Return to Safari</span>
              </Link>
            </div>

            {/* Fun Message */}
            <div className='mt-8 text-center'>
              <div className='inline-flex items-center space-x-2 px-4 py-2 bg-emerald-600/20 rounded-full border border-emerald-600/30'>
                <span className='text-2xl'>🐘</span>
                <span className='text-emerald-400 text-sm'>
                  Don't worry, elephants never forget... we'll fix this!
                </span>
              </div>
            </div>
          </div>

          {/* Safari Tip Card */}
          <div className='mt-6 bg-gradient-to-r from-orange-900/30 to-yellow-900/30 backdrop-blur-sm rounded-xl border border-orange-700/50 p-6'>
            <div className='flex items-start space-x-3'>
              <span className='text-3xl'>🦒</span>
              <div>
                <h3 className='text-lg font-semibold text-orange-200 mb-2'>
                  Safari Tip:
                </h3>
                <p className='text-orange-300/80 text-sm'>
                  In the wild, when things go wrong, the best trackers know to
                  retrace their steps. Try refreshing or going back to familiar
                  territory (the dashboard)!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;
