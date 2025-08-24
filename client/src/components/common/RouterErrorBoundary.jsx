import React from "react";
import { AlertTriangle, RefreshCw, Home, Bug } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import BackgroundDecoration from "./BackgroundDecoration";
import SafariAnimals from "./SafariAnimals";

// This is a functional component that can use router hooks
const RouterErrorFallback = ({ error, resetErrorBoundary }) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    resetErrorBoundary();
    navigate("/dashboard");
  };

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
                Safari Route Lost! 🦁
              </h1>
              <p className='text-gray-400 text-lg'>
                Looks like we took a wrong turn in the wilderness...
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
                <span>Try Again</span>
              </button>

              <button
                onClick={handleGoHome}
                className='flex items-center justify-center space-x-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105'
              >
                <Home className='w-5 h-5' />
                <span>Back to Base Camp</span>
              </button>
            </div>

            {/* Fun Message */}
            <div className='mt-8 text-center'>
              <div className='inline-flex items-center space-x-2 px-4 py-2 bg-emerald-600/20 rounded-full border border-emerald-600/30'>
                <span className='text-2xl'>🗺️</span>
                <span className='text-emerald-400 text-sm'>
                  Our safari guide is recalculating the route!
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Class component wrapper to use as Error Boundary
class RouterErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  resetErrorBoundary = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <RouterErrorFallback
          error={this.state.error}
          resetErrorBoundary={this.resetErrorBoundary}
        />
      );
    }

    return this.props.children;
  }
}

export default RouterErrorBoundary;
