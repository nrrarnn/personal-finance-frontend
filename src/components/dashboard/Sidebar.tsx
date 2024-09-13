import { Divider } from "@nextui-org/react";
import { FaHome, FaSearch, FaCog } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../store/authSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fungsi untuk menangani logout
  const handleLogout = () => {
    dispatch(logout()); // Memanggil action logout
    navigate('/login'); // Mengarahkan ke halaman login
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-screen w-64 bg-gray-800 text-white hidden md:flex flex-col py-6`}>
        <h1 className="text-2xl font-bold mb-6 p-4">SaldaQ</h1>
        <Divider className="bg-slate-100 mb-5 opacity-60"/>
        <Link to="/dashboard/home" className="p-4 hover:bg-gray-700">
          <FaHome className="inline mr-2" /> Home
        </Link>
        <Link to={'/dashboard/income'} className="p-4 hover:bg-gray-700">
          <FaSearch className="inline mr-2" /> Search
        </Link>
        <Link to={'/dashboard/expense'} className="p-4 hover:bg-gray-700">
          <FaCog className="inline mr-2" /> Settings
        </Link>
        <button onClick={handleLogout} className="btn btn-primary">
        Logout
      </button>
      </div>

      {/* Sidebar untuk mobile, berbentuk icon di bawah */}
      <div className="md:hidden fixed bottom-0 w-full flex justify-center items-center">
        <div className=" w-full max-w-[350px] bg-black text-white flex justify-around py-6 rounded-[25px] transition-transform duration-300">
          <Link to="/dashboard/home" className=" hover:bg-gray-700">
            <FaHome className="text-2xl" />
          </Link>
          <Link to={'/dashboard/income'} className=" hover:bg-gray-700">
            <FaSearch className="text-2xl" />
          </Link>
          <Link to={'/dashboard/expense'} className=" hover:bg-gray-700">
            <FaCog className="text-2xl" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
