import { Search } from "lucide-react";
import React from "react";

const SearchBar = ({ placeholder = "Search animals or staff..." }) => (
  <div className='relative max-w-lg w-full'>
    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
      <Search className='h-5 w-5 text-gray-400' />
    </div>
    <input
      type='text'
      placeholder={placeholder}
      className='block w-full pl-10 pr-3 py-2 border border-gray-600 rounded-lg leading-5 bg-gray-800/50 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200'
    />
  </div>
);
export default SearchBar;
