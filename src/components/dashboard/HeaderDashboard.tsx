import React from "react";
import { FiUser, FiChevronDown } from "react-icons/fi";

interface HeaderProps {
  showNotifications?: boolean;
  showProfile?: boolean;
}

const HeaderDashboard: React.FC<HeaderProps> = ({ showProfile = true }) => {
  return (
    <div className="bg-white shadow-sm border-b border-gray-100 p-1.5 sticky top-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end items-center h-16">
            {showProfile && (
              <div className="relative">
                <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <FiUser className="w-4 h-4 text-white" />
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700">John Doe</span>
                  <FiChevronDown className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
  );
};

export default HeaderDashboard;
