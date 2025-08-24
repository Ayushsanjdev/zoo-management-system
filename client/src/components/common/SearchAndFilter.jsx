import React from "react";
import ActionButton from "./ActionButton";
import { Filter, Plus, Search } from "lucide-react";

const SearchAndFilter = ({ searchTerm, onSearchChange, onFilter, onAdd, addButtonText }) => (
  <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 mb-6 border border-gray-700">
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div className="flex-1 max-w-lg">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <ActionButton onClick={onFilter} variant="outline" size="sm">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </ActionButton>
        
        <ActionButton onClick={onAdd} variant="primary" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          {addButtonText}
        </ActionButton>
      </div>
    </div>
  </div>
);
export default SearchAndFilter;
