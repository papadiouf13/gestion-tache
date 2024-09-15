import React from 'react';
import { FaMoon } from 'react-icons/fa';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filter: string;
  onFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  toggleDarkMode: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange, filter, onFilterChange, toggleDarkMode }) => {
  return (
    <div className="flex items-center border-b border-gray-300 py-2">
      <input
        type="text"
        value={searchTerm}
        onChange={onSearchChange}
        placeholder="Search note..."
        className="w-full p-2 text-sm focus:text-indigo-500 focus:outline-indigo-500 rounded-md"
      />
      <select
        value={filter}
        onChange={onFilterChange}
        className="ml-2 px-3 py-2 border bg-indigo-500 text-white border-gray-300 rounded-md focus:outline-none"
      >
        <option value="all">ALL</option>
        <option value="complete">Complete</option>
        <option value="incomplete">Incomplete</option>
      </select>
      <button onClick={toggleDarkMode} className="ml-2 px-3 py-2 bg-indigo-500 text-white rounded-md focus:outline-none">
        <FaMoon />
      </button>
    </div>
  );
};

export default SearchBar;
