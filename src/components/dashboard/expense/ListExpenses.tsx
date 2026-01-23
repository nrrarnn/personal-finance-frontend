import { useState, useMemo } from "react";
import { Button, Modal, ModalContent, ModalHeader, ModalBody, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, Input, Select, SelectItem, Pagination } from "@nextui-org/react";
import { TransactionResponse } from "../../../types/types";
import AddExpense from "./AddExpense";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { IoSearchSharp, IoFilter } from "react-icons/io5";
import api from "../../../api/api";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import { useCategories, useExpenses } from "../../../hooks/useTransactions";
import ConfirmDeleteModal from "../../ConfirmDeleteModal";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import LoadingSpinner from "../../LoadingSpinner";

const ListExpenses = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const { data: listExpenses = [], isLoading: isExpensesLoading } = useExpenses(token!);
  const { isLoading: isCategoriesLoading } = useCategories(token!);
  const [editingExpense, setEditingExpense] = useState<TransactionResponse | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const queryClient = useQueryClient();
  const { data: categories = [] } = useCategories(token!);
  const expenseCategories = categories.filter((cat) => cat.type === "expense");

  const handleConfirmDelete = (id: string) => {
    setDeleteTargetId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await api.delete(`/transactions/${deleteTargetId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsDeleteModalOpen(false);
      setDeleteTargetId(null);
      queryClient.invalidateQueries({ queryKey: ["transactions", "expense"] });
      toast.success("Expense deleted successfully");
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast.error("Failed to delete expense");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (expense: TransactionResponse) => {
    setEditingExpense(expense);
    setIsAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setEditingExpense(null);
  };

  // Filter and search logic
  const filteredExpenses = useMemo(() => {
    return listExpenses.filter((expense) => {
      const matchesSearch = expense.title.toLowerCase().includes(searchValue.toLowerCase()) || expense.description?.toLowerCase().includes(searchValue.toLowerCase());
      const matchesCategory = selectedCategory ? expense.category?._id === selectedCategory : true;
      const transactionDate = new Date(expense.date || expense.createdAt);
      const matchesStartDate = startDate ? transactionDate >= new Date(startDate) : true;
      const matchesEndDate = endDate ? transactionDate <= new Date(endDate) : true;

      return matchesSearch && matchesCategory && matchesStartDate && matchesEndDate;
    });
  }, [listExpenses, searchValue, selectedCategory, startDate, endDate]);

  // Pagination logic
  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);
  const paginatedExpenses = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredExpenses.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredExpenses, currentPage]);

  if (isExpensesLoading || isCategoriesLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold font-poppins bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">Expense Management</h1>
            <p className="text-gray-600 text-lg">Track and manage your expenses sources</p>
          </div>
          <Button isIconOnly className="bg-gradient-to-r from-red-600 to-red-700 text-white hover:shadow-lg transition-all" size="lg" onClick={() => setIsAddModalOpen(true)}>
            <FaPlus className="text-xl" />
          </Button>
        </div>

        {/* Filters Section */}
        <div className="mb-6 p-4 bg-white/60 backdrop-blur-sm shadow-md border border-white/50 rounded-xl">
          <div className="flex items-center gap-2 mb-4">
            <IoFilter className="text-gray-700 text-lg" />
            <h3 className="font-semibold text-gray-800">Filters & Search</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <Input
              isClearable
              placeholder="Search by title or description"
              startContent={<IoSearchSharp className="text-gray-400" />}
              value={searchValue}
              onValueChange={setSearchValue}
              classNames={{
                input: "text-gray-700",
                inputWrapper: "bg-gray-100 border-gray-200 hover:border-red-300",
              }}
            />
            <Select
              label="Category"
              placeholder="Filter by category"
              selectedKeys={selectedCategory ? [selectedCategory] : []}
              onChange={(e) => setSelectedCategory(e.target.value)}
              items={[{ _id: "", name: "All Categories", type: "expense", icon: "" }, ...expenseCategories]}
              classNames={{
                label: "text-gray-700",
                trigger: "bg-gray-100 border-gray-200 hover:border-red-300",
              }}
            >
              {(category) => <SelectItem key={category._id}>{category.name}</SelectItem>}
            </Select>
            <Input
              type="date"
              label="Start Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              classNames={{
                label: "text-gray-700",
                inputWrapper: "bg-gray-100 border-gray-200 hover:border-red-300",
              }}
            />
            <Input
              type="date"
              label="End Date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              classNames={{
                label: "text-gray-700",
                inputWrapper: "bg-gray-100 border-gray-200 hover:border-red-300",
              }}
            />
          </div>
          {(searchValue || selectedCategory || startDate || endDate) && (
            <Button
              size="sm"
              variant="flat"
              className="mt-3 bg-gray-300 text-gray-800"
              onClick={() => {
                setSearchValue("");
                setSelectedCategory("");
                setStartDate("");
                setEndDate("");
                setCurrentPage(1);
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>

        <div className="bg-white/60 backdrop-blur-sm shadow-lg border border-white/50 rounded-xl overflow-hidden">
          {paginatedExpenses.length > 0 ? (
            <>
              <div className="p-4 bg-slate-50 border-b border-white/50 flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-700">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredExpenses.length)} of {filteredExpenses.length} items
                </span>
              </div>
              <Table aria-label="Expenses table" className="border-none">
                <TableHeader>
                  <TableColumn className="bg-gradient-to-r from-red-50 to-rose-50 border-b-2 border-red-200">CATEGORY</TableColumn>
                  <TableColumn className="bg-gradient-to-r from-red-50 to-rose-50 border-b-2 border-red-200">TITLE</TableColumn>
                  <TableColumn className="bg-gradient-to-r from-red-50 to-rose-50 border-b-2 border-red-200">AMOUNT</TableColumn>
                  <TableColumn className="bg-gradient-to-r from-red-50 to-rose-50 border-b-2 border-red-200">DATE</TableColumn>
                  <TableColumn className="bg-gradient-to-r from-red-50 to-rose-50 border-b-2 border-red-200">DESCRIPTION</TableColumn>
                  <TableColumn className="bg-gradient-to-r from-red-50 to-rose-50 border-b-2 border-red-200 text-center">ACTIONS</TableColumn>
                </TableHeader>
                <TableBody>
                  {paginatedExpenses.map((expense) => (
                    <TableRow key={expense._id} className="hover:bg-slate-50 transition-colors">
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 bg-gradient-to-br from-red-100 to-red-200 rounded-lg flex items-center justify-center">{expense.category?.icon || "💰"}</div>
                          <span className="text-sm font-medium text-gray-700">{expense.category?.name || "Unknown"}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-gray-800">{expense.title}</span>
                      </TableCell>
                      <TableCell>
                        <Chip className="bg-red-100 text-red-700 font-semibold">-IDR {expense.amount.toLocaleString("id-ID")}</Chip>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600">
                          {expense.date
                            ? new Date(expense.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
                            : new Date(expense.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600 truncate max-w-xs">{expense.description || "-"}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2 justify-center">
                          <Button size="sm" isIconOnly variant="flat" color="primary" onClick={() => handleEdit(expense)} className="hover:scale-110 transition-transform">
                            <CiEdit className="text-lg" />
                          </Button>
                          <Button size="sm" isIconOnly variant="flat" color="danger" onClick={() => handleConfirmDelete(expense._id)} className="hover:scale-110 transition-transform">
                            <MdDelete className="text-lg" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="p-4 bg-slate-50 border-t border-white/50 flex justify-center">
                  <Pagination total={totalPages} page={currentPage} onChange={setCurrentPage} color="danger" showControls className="gap-2" />
                </div>
              )}
            </>
          ) : filteredExpenses.length === 0 && (searchValue || selectedCategory || startDate || endDate) ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No results found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters</p>
              <Button
                size="sm"
                variant="flat"
                className="bg-gray-300 text-gray-800"
                onClick={() => {
                  setSearchValue("");
                  setSelectedCategory("");
                  setStartDate("");
                  setEndDate("");
                  setCurrentPage(1);
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No expenses yet</h3>
              <p className="text-gray-600 mb-6">Start by adding your first expense</p>
              <Button color="primary" className="bg-gradient-to-r from-red-600 to-red-700" onClick={() => setIsAddModalOpen(true)}>
                <FaPlus className="mr-2" />
                Add Your First Expense
              </Button>
            </div>
          )}
        </div>

        <Modal isOpen={isAddModalOpen} onClose={handleCloseModal} size="2xl" backdrop="blur">
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">{editingExpense ? "Edit Expense" : "Add New Expense"}</ModalHeader>
            <ModalBody>
              <AddExpense editingExpense={editingExpense} setEditingExpense={setEditingExpense} token={token} onSuccess={handleCloseModal} isModal={true} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
      <ConfirmDeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleDelete} isLoading={isLoading} itemName="expense" />
    </div>
  );
};

export default ListExpenses;
