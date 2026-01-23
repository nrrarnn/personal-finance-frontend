import { Button, useDisclosure, Card, CardBody, Chip, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import AddCategory from "./AddCategory";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useCategories } from "../../../hooks/useTransactions";
import { FaPlus } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import api from "../../../api/api";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useState } from "react";
import ConfirmDeleteModal from "../../ConfirmDeleteModal";
import LoadingSpinner from "../../LoadingSpinner";
import { Category } from "../../../types/types";

const ListCategories = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const { data: ListCategories = [], isLoading } = useCategories(token!);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [ isDeleteLoading, setIsDeleteLoading] = useState(false);
  const queryClient = useQueryClient();

  const incomeCategories = ListCategories.filter((category) => category.type === "income");
  const expenseCategories = ListCategories.filter((category) => category.type === "expense");

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    onOpen();
  };

  const handleConfirmDelete = (id: string) => {
    setDeleteTargetId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    setIsDeleteLoading(true);
    try {
      await api.delete(`/category/${deleteTargetId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsDeleteModalOpen(false);
      setDeleteTargetId(null);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Category deleted successfully");
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category");
    } finally {
      setIsDeleteLoading(false);
    }
  };

  const handleCloseModal = () => {
    onOpenChange();
    setEditingCategory(null);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-blue-50/30 p-4">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-start gap-2 justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold font-poppins text-gray-800 mb-2">Categories</h1>
            <p className="text-gray-600">Organize your transactions by category</p>
          </div>
          <Button
            color="primary"
            onPress={onOpen}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 font-semibold"
            startContent={<FaPlus className="w-4 h-4" />}
          >
            Add Category
          </Button>
        </div>

        <AddCategory token={token} isOpen={isOpen} onOpenChange={handleCloseModal} editingCategory={editingCategory} setEditingCategory={setEditingCategory} />

        {/* Income Categories Table */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Income Categories</h2>
          <Card className="shadow-md shadow-gray-300 border-0 bg-white/80 backdrop-blur-sm">
            <CardBody className="p-0">
              {incomeCategories.length > 0 ? (
                <Table aria-label="Income categories table" className="border-none">
                  <TableHeader>
                    <TableColumn className="bg-gradient-to-r from-green-50 to-emerald-50 border-b-2 border-green-200">ICON</TableColumn>
                    <TableColumn className="bg-gradient-to-r from-green-50 to-emerald-50 border-b-2 border-green-200">NAME</TableColumn>
                    <TableColumn className="bg-gradient-to-r from-green-50 to-emerald-50 border-b-2 border-green-200">TYPE</TableColumn>
                    <TableColumn className="bg-gradient-to-r from-green-50 to-emerald-50 border-b-2 border-green-200 text-center">ACTIONS</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {incomeCategories.map((category) => (
                      <TableRow key={category._id} className="hover:bg-slate-50 transition-colors">
                        <TableCell>
                          <span className="text-2xl">{category.icon}</span>
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold text-gray-800">{category.name}</span>
                        </TableCell>
                        <TableCell>
                          <Chip color="success" variant="flat" size="sm">
                            {category.type}
                          </Chip>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2 justify-center">
                            <Button size="sm" isIconOnly variant="flat" color="primary" onClick={() => handleEdit(category)} className="hover:scale-110 transition-transform">
                              <CiEdit className="text-lg" />
                            </Button>
                            <Button size="sm" isIconOnly variant="flat" color="danger" onClick={() => handleConfirmDelete(category._id)} className="hover:scale-110 transition-transform">
                              <MdDelete className="text-lg" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-gray-500">No income categories yet</div>
              )}
            </CardBody>
          </Card>
        </div>

        {/* Expense Categories Table */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Expense Categories</h2>
          <Card className="shadow-md shadow-gray-300 border-0 bg-white/80 backdrop-blur-sm">
            <CardBody className="p-0">
              {expenseCategories.length > 0 ? (
                <Table aria-label="Expense categories table" className="border-none">
                  <TableHeader>
                    <TableColumn className="bg-gradient-to-r from-red-50 to-rose-50 border-b-2 border-red-200">ICON</TableColumn>
                    <TableColumn className="bg-gradient-to-r from-red-50 to-rose-50 border-b-2 border-red-200">NAME</TableColumn>
                    <TableColumn className="bg-gradient-to-r from-red-50 to-rose-50 border-b-2 border-red-200">TYPE</TableColumn>
                    <TableColumn className="bg-gradient-to-r from-red-50 to-rose-50 border-b-2 border-red-200 text-center">ACTIONS</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {expenseCategories.map((category) => (
                      <TableRow key={category._id} className="hover:bg-slate-50 transition-colors">
                        <TableCell>
                          <span className="text-2xl">{category.icon}</span>
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold text-gray-800">{category.name}</span>
                        </TableCell>
                        <TableCell>
                          <Chip color="danger" variant="flat" size="sm">
                            {category.type}
                          </Chip>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2 justify-center">
                            <Button size="sm" isIconOnly variant="flat" color="primary" onClick={() => handleEdit(category)} className="hover:scale-110 transition-transform">
                              <CiEdit className="text-lg" />
                            </Button>
                            <Button size="sm" isIconOnly variant="flat" color="danger" onClick={() => handleConfirmDelete(category._id)} className="hover:scale-110 transition-transform">
                              <MdDelete className="text-lg" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-gray-500">No expense categories yet</div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
      <ConfirmDeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleDelete} isLoading={isLoading} itemName="category" />
    </div>
  );
};

export default ListCategories;
