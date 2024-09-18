import { Button, Divider, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { FaHome, FaWallet } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../store/authSlice";
import { BiLogOut, BiSolidCategory } from "react-icons/bi";
import { FaMoneyBills } from "react-icons/fa6";
import { useState } from "react";


const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // Fungsi untuk menangani logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    dispatch(logout()); 
    setIsOpen(false);
    navigate('/');
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
          <button onClick={openModal} className="px-2 flex items-center gap-2">
            <BiLogOut />Logout
          </button>
        </div>
      </div>

      {/* Modal */}
      <Modal 
        size="md" 
        isOpen={isOpen} 
        onClose={closeModal}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Konfirmasi Logout</ModalHeader>
            <ModalBody>
              <p>Apakah Anda yakin ingin logout?</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={closeModal}>
                Batal
              </Button>
              <Button color="primary" onPress={handleLogout}>
                Logout
              </Button>
            </ModalFooter>
        </ModalContent>
      </Modal>

      <div className="md:hidden fixed-bottom flex justify-center items-center">
        <div className=" w-full rounded-full bg-white text-slate-800 flex justify-around py-3 transition-transform duration-300">
          <Link to="/dashboard/home" className="p-3 hover:bg-indigo-400 hover:text-white rounded-full">
            <FaHome className="text-2xl" />
          </Link>
          <Link to={'/dashboard/incomes'} className="p-3 hover:bg-indigo-400 hover:text-white rounded-full">
            <FaWallet className="text-2xl" />
          </Link>
          <Link to={'/dashboard/expenses'} className="p-3 hover:bg-indigo-400 hover:text-white rounded-full">
            <FaMoneyBills className="text-2xl" />
          </Link>
          <Link to={'/dashboard/categories'} className="p-3 hover:bg-indigo-400 hover:text-white rounded-full">
            <BiSolidCategory  className="text-2xl" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
