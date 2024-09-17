import { Divider } from "@nextui-org/react";
import { FaHome, FaSearch, FaCog, FaWallet } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../store/authSlice";
import { BiLogOut, BiSolidCategory } from "react-icons/bi";
import { FaMoneyBills } from "react-icons/fa6";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fungsi untuk menangani logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    dispatch(logout()); 
    navigate('/login');
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className={`fixed left-0 top-0 h-screen w-[200px] bg-indigo-600 text-white hidden md:flex flex-col py-6 px-6`}>
        <h1 className="text-2xl font-extrabold mb-6 p-4 text-center">SaldaQ</h1>
        <Divider className="bg-slate-100 mb-5 opacity-60"/>
        <Link to="/dashboard/home" className="p-4 hover:bg-indigo-700 rounded-lg">
          <FaHome className="inline mr-2" /> Home
        </Link>
        <Link to={'/dashboard/incomes'} className="p-4 hover:bg-indigo-700 rounded-lg">
          <FaWallet className="inline mr-2" /> Income
        </Link>
        <Link to={'/dashboard/expenses'} className="p-4 hover:bg-indigo-700 rounded-lg">
          <FaMoneyBills className="inline mr-2" /> Expense
        </Link>
        <Link to={'/dashboard/categories'} className="p-4 hover:bg-indigo-700 rounded-lg">
          <BiSolidCategory className="inline mr-2" /> Category
        </Link>
        <div className="mt-auto px-4">
          <button onClick={handleLogout} className="px-2 flex items-center gap-2">
            <BiLogOut />Logout
          </button>
        </div>
      </div>

      <div className="md:hidden fixed bottom-2 w-full flex justify-center items-center z-[9999]">
        <div className=" w-full max-w-[350px] bg-indigo-600 text-white flex justify-around py-3 rounded-[25px] transition-transform duration-300">
          <Link to="/dashboard/home" className="p-3 hover:bg-indigo-700 rounded-full">
            <FaHome className="text-2xl" />
          </Link>
          <Link to={'/dashboard/incomes'} className="p-3 hover:bg-indigo-700 rounded-full">
            <FaWallet className="text-2xl" />
          </Link>
          <Link to={'/dashboard/expenses'} className="p-3 hover:bg-indigo-700 rounded-full">
            <FaMoneyBills className="text-2xl" />
          </Link>
          <Link to={'/dashboard/categories'} className="p-3 hover:bg-indigo-700 rounded-full">
            <BiSolidCategory  className="text-2xl" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
