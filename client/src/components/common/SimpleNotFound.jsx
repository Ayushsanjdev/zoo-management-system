// components/common/SimpleNotFound.jsx
import React from "react";
import { MapPin, Home, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const SimpleNotFound = ({
  title = "Page Not Found",
  message = "The page you're looking for doesn't exist.",
  showBackButton = true,
}) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className='min-h-[400px] flex items-center justify-center p-6'>
      <div className='max-w-md w-full text-center'>
        <div className='mb-6'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-orange-500/20 rounded-full mb-4'>
            <MapPin className='w-8 h-8 text-orange-400' />
          </div>

          <h2 className='text-2xl font-bold text-white mb-2'>{title}</h2>
          <p className='text-gray-400'>{message}</p>
        </div>

        <div className='flex flex-col sm:flex-row gap-3 justify-center'>
          <Link
            to='/dashboard'
            className='flex items-center justify-center space-x-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors'
          >
            <Home className='w-4 h-4' />
            <span>Go Home</span>
          </Link>

          {showBackButton && (
            <button
              onClick={handleGoBack}
              className='flex items-center justify-center space-x-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors'
            >
              <ArrowLeft className='w-4 h-4' />
              <span>Go Back</span>
            </button>
          )}
        </div>

        <div className='mt-6'>
          <div className='inline-flex items-center space-x-2 px-4 py-2 bg-gray-800/50 rounded-full'>
            <span className='text-xl'>🗺️</span>
            <span className='text-gray-400 text-sm'>Lost in the safari?</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleNotFound;
