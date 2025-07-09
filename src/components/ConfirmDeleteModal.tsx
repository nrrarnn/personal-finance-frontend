import { FiX } from "react-icons/fi";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  itemName?: string;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ isOpen, onClose, onConfirm, isLoading, itemName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 overflow-hidden">
        <div className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Confirm Deletion</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <FiX className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="px-6 pb-6">
          <p className="text-gray-600">Are you sure you want to delete{itemName ? ` "${itemName}"` : " this item"}? This action cannot be undone.</p>
        </div>

        <div className="px-6 py-4 bg-gray-50 flex gap-3 justify-end">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors">
            Cancel
          </button>
          <button onClick={onConfirm}  disabled={isLoading} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-2">
            {
              isLoading ? "Deleting..." : "Delete"
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
