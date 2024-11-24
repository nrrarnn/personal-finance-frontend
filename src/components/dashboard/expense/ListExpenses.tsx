import { useEffect, useState } from "react";
import withAuth from "../../../hoc/withAuth";
import { Button, Card } from "@nextui-org/react";
import { FaCalendar } from "react-icons/fa6";
import { RiChat1Fill } from "react-icons/ri";
import AddExpense from "./AddExpense";
import { Category, TokenProps, TransactionResponse } from "../../../types/types";
import { getCategories, getExpenses } from "../../../api/servicesApi";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import api from "../../../api/api";

const ListExpenses: React.FC<TokenProps> = ({token}) => {
  const [listExpenses, setListExpenses] = useState<TransactionResponse[]>([]);
  const [listCategories, setListCategories] = useState<Category[]>([]);
  const [editingExpense, setEditingExpense] = useState<TransactionResponse | null>(null);

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/expense/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setListExpenses(listExpenses.filter(expense => expense._id !== id));
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const handleEdit = (expense: TransactionResponse) => {
    setEditingExpense(expense);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const [expenses, categories] = await Promise.all([
            getExpenses(token),
            getCategories(token)
          ]);
          setListExpenses(expenses);
          setListCategories(categories);
        } catch (error) {
          console.error('Error loading data:', error);
        }
      }
    };

    fetchData();
  }, [token, listExpenses, listCategories]);

  return (
    <div className="pb-20">
      <h1 className="text-3xl font-bold font-poppins">Expenses</h1>
      <div className="flex flex-wrap w-full pt-16 gap-5">
        <AddExpense editingExpense={editingExpense} setEditingExpense={setEditingExpense} token={token}/>
        <div className="w-full md:w-[60%] flex flex-col gap-3">
        {listExpenses.length > 0 ? (
          listExpenses.map((expense) => {
            const category = listCategories.find(cat => cat.name === expense.category);
            return(
            <Card key={expense._id} className="w-full p-3 flex flex-row justify-between">
              <div className="w-full flex flex-row justify-between">
                <div className="flex flex-col sm:flex-row">
                  <div className="flex items-center">
                    <Button color="primary" variant="flat" className="w-[50px] h-[50px]">
                      {category?.icon}
                    </Button>
                    </div>
                    <div className="sm:ml-3">
                      <h3 className="font-poppins font-semibold text-slate-800">{expense.title}</h3>
                      <p className="flex items-center gap-2"><FaCalendar /> {new Date(expense.createdAt).toLocaleDateString()}</p>
                      <p className="flex items-center gap-2"><RiChat1Fill />{expense.description}</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mr-3 w-full">
                  <p> + Rp. {expense.amount}</p>
                </div>
                <div className="block">
                  <div className="flex flex-col gap-2">
                    <button className="px-3 py-3 rounded-xl text-white bg-blue-400" onClick={() => handleEdit(expense)}><CiEdit /></button>
                    <button className="px-3 py-3 rounded-xl text-white bg-red-400" onClick={() => handleDelete(expense._id)}><MdDelete /></button>
                  </div>
                </div>
              <div>
            </div> 
            </Card>
          )})
        ) : (
          <p>No expenses available.</p>
        )}
      </div>
      </div>
      
    </div>
  )
}

export default withAuth(ListExpenses)