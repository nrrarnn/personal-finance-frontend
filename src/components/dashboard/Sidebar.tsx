import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiHome, FiCreditCard, FiGrid, FiLogOut, FiX, FiCheck, FiChevronRight, FiTrendingUp } from "react-icons/fi";


const Sidebar = () => {
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const location = useLocation();

  const openLogoutModal = () => setIsLogoutModalOpen(true);
  const closeLogoutModal = () => setIsLogoutModalOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    setIsLogoutModalOpen(false);
    navigate("/");
  };

  const menuItems = [
    { path: "/dashboard/home", label: "Dashboard", icon: FiHome },
    { path: "/dashboard/incomes", label: "Income", icon: FiTrendingUp },
    { path: "/dashboard/expenses", label: "Expenses", icon: FiCreditCard },
    { path: "/dashboard/categories", label: "Categories", icon: FiGrid },
  ];

  return (
    <>
      <div className="hidden md:flex flex-col fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-gray-800">SaldaQ</h1>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive ? "bg-blue-50 text-blue-700 border border-blue-100 shadow-sm" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"}`} />
                <span className="font-medium">{item.label}</span>
                {isActive && <FiChevronRight className="w-4 h-4 ml-auto text-blue-600" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button onClick={openLogoutModal} className="flex items-center gap-3 w-full px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200">
            <FiLogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 shadow-lg">
        <div className="flex justify-around">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link key={item.path} to={item.path} className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 ${isActive ? "text-blue-600 bg-blue-50" : "text-gray-400 hover:text-gray-600"}`}>
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {isLogoutModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 overflow-hidden">
            <div className="p-6 pb-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Confirm Logout</h3>
                <button onClick={closeLogoutModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <FiX className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="px-6 pb-6">
              <p className="text-gray-600">Are you sure you want to logout? You'll need to sign in again to access your account.</p>
            </div>

            <div className="px-6 py-4 bg-gray-50 flex gap-3 justify-end">
              <button onClick={closeLogoutModal} className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors">
                Cancel
              </button>
              <button onClick={handleLogout} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-2">
                <FiCheck className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
