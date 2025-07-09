import { useState } from "react";
import { Button, Card } from "@nextui-org/react";
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

const ListIncome = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const { data: listIncomes = [], isLoading: loadingIncomes } = useIncomes(token!);
  const { data: listCategories = [], isLoading: loadingCategories } = useCategories(token!);
  const [editingIncome, setEditingIncome] = useState<TransactionResponse | null>(null);

  const queryClient = useQueryClient();

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/income/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      queryClient.invalidateQueries({ queryKey: ["incomes"] });
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleEdit = (income: TransactionResponse) => {
    setEditingIncome(income);
  };

  if (loadingIncomes || loadingCategories) return <div className="text-center py-16">Loading...</div>;

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
                {listIncomes.map((income, index) => {
                  const category = listCategories.find((cat) => cat.name === income.category);
                  return (
                    <Card
                      key={income._id}
                      className="group hover:shadow-xl shadow-gray-400/20 hover:shadow-gray-200 transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:bg-white/90 hover:scale-[1.02] animate-fade-in"
                      style={{
                        animationDelay: `${index * 0.1}s`,
                      }}
                    >
                      <div className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-4 flex-1">
                            <div className="relative">
                              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-white text-xl group-hover:shadow-xl transition-shadow duration-300">
                                {category?.icon || "💰"}
                              </div>
                            </div>

                            <div className="flex-1 min-w-0">
                              <h3 className="font-poppins font-semibold text-lg text-gray-800 mb-1 truncate">{income.title}</h3>

                              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
                                <div className="flex items-center gap-1.5">
                                  <FaCalendar className="text-blue-500" />
                                  <span>
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
                                  <RiChat1Fill className="text-green-500 mt-0.5 flex-shrink-0" />
                                  <span className="line-clamp-2">{income.description}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-start gap-4 ml-4">
                            <div className="text-right">
                              <div className="text-xl font-bold text-green-600 mb-1">+Rp {income.amount.toLocaleString("id-ID")}</div>
                              <div className="text-xs text-gray-500 uppercase tracking-wide">Income</div>
                            </div>

                            <div className="flex gap-2 opacity-100 transition-opacity duration-300">
                              <Button size="sm" variant="flat" color="primary" className="min-w-0 w-10 h-10 p-0 hover:scale-110 transition-transform duration-200" onClick={() => handleEdit(income)}>
                                <CiEdit className="text-lg" />
                              </Button>
                              <Button size="sm" variant="flat" color="danger" className="min-w-0 w-10 h-10 p-0 hover:scale-110 transition-transform duration-200" onClick={() => handleDelete(income._id)}>
                                <MdDelete className="text-lg" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
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
      </div>
    </div>
  );
};

export default ListIncome;
