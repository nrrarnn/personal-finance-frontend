import { useState } from "react";
import { Button } from "@nextui-org/react";
import AddIncome from "./AddIncome";
import { FaCalendar } from "react-icons/fa6";
import { RiChat1Fill } from "react-icons/ri";
import { TransactionResponse } from "../../../types/types";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import api from "../../../api/api";
import { RootState } from "../../../store/store";
import { useSelector } from "react-redux";
import { useCategories, useIncomes } from "../../../hooks/useTransactions";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ConfirmDeleteModal from "../../ConfirmDeleteModal";
import LoadingSpinner from "../../LoadingSpinner";

const ListIncome = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const { data: listIncomes = [], isLoading: loadingIncomes } = useIncomes(token!);
  const { data: listCategories = [], isLoading: loadingCategories } = useCategories(token!);
  const [editingIncome, setEditingIncome] = useState<TransactionResponse | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();

  const handleConfirmDelete = (id: string) => {
    setDeleteTargetId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/transactions/${deleteTargetId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsDeleteModalOpen(false);
      setDeleteTargetId(null);
      queryClient.invalidateQueries({ queryKey: ["transactions", "income"] });
      toast.success("income deleted successfully");
    }catch (error) {
        console.error("Error deleting income:", error);
    }finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (income: TransactionResponse) => {
    setEditingIncome(income);
  };

  if (loadingIncomes || loadingCategories) return <LoadingSpinner/>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-poppins bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-2">Income Management</h1>
          <p className="text-gray-600 text-lg">Track and manage your income sources</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-[35%]">
            <div className="sticky top-8">
              <AddIncome editingTransaction={editingIncome} setEditingTransaction={setEditingIncome} token={token} />
            </div>
          </div>

          <div className="lg:w-[65%]">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-800">Recent Incomes</h2>
              <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {listIncomes.length} {listIncomes.length === 1 ? "item" : "items"}
              </div>
            </div>

            {listIncomes.length > 0 ? (
              <div className="space-y-4">
                {listIncomes.map((income ) => {
                  const category = income.category;
                  return (
                    <div className="p-4 sm:p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                      <div className="flex flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex items-start space-x-3 sm:space-x-4 flex-1 min-w-0">
                          <div className="relative flex-shrink-0">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-100 to-green-200 rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-lg sm:text-xl group-hover:shadow-lg transition-all duration-300 hover:scale-105">
                              {category?.icon || "💰"}
                            </div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="font-poppins font-semibold text-base sm:text-lg text-gray-800 mb-1 truncate">{income.title}</h3>

                            <div className="flex flex-wrap gap-2 sm:gap-4 text-sm text-gray-600 mb-2">
                              <div className="flex items-center gap-1.5">
                                <FaCalendar className="text-blue-500 text-xs sm:text-sm" />
                                <span className="text-xs sm:text-sm">
                                  {new Date(income.createdAt).toLocaleDateString("id-ID", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  })}
                                </span>
                              </div>
                            </div>

                            {income.description && (
                              <div className="flex items-start gap-1.5 text-sm text-gray-600">
                                <RiChat1Fill className="text-slate-500 mt-0.5 flex-shrink-0 text-xs sm:text-sm" />
                                <span className="line-clamp-2 text-xs sm:text-sm leading-relaxed">{income.description}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-3 sm:gap-4 sm:ml-4">
                          <div className="text-right">
                            <div className="text-sm  font-bold text-emerald-600 mb-0.5 sm:mb-1">+IDR {income.amount.toLocaleString("id-ID")}</div>
                            <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">{income.type}</div>
                          </div>

                          <div className="flex gap-2 opacity-100 transition-opacity duration-300">
                            <Button size="sm" variant="flat" color="primary" className="min-w-0 w-9 h-9 sm:w-10 sm:h-10 p-0 hover:scale-110 transition-transform duration-200 rounded-lg" onClick={() => handleEdit(income)}>
                              <CiEdit className="text-base sm:text-lg" />
                            </Button>
                            <Button size="sm" variant="flat" color="danger" className="min-w-0 w-9 h-9 sm:w-10 sm:h-10 p-0 hover:scale-110 transition-transform duration-200 rounded-lg" onClick={() => handleConfirmDelete(income._id)}>
                              <MdDelete className="text-base sm:text-lg" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">💰</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No incomes yet</h3>
                <p className="text-gray-600 mb-6">Start by adding your first income source</p>
                <div className="w-full max-w-md mx-auto h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-400 to-green-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            )}
          </div>
        </div>
        <ConfirmDeleteModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleDelete} isLoading={isLoading} itemName="income" />
      </div>
    </div>
  );
};

export default ListIncome;
