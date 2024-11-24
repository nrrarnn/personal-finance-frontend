import { useEffect, useState } from "react";
import withAuth from "../../../hoc/withAuth";
import { Button, Card } from "@nextui-org/react";
import AddIncome from "./AddIncome";
import { FaCalendar } from "react-icons/fa6";
import { RiChat1Fill } from "react-icons/ri";
import { Category, TokenProps, TransactionResponse } from "../../../types/types";
import { getCategories, getIncomes } from "../../../api/servicesApi";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import api from "../../../api/api";

const ListIncome: React.FC<TokenProps> = ({token}) => {
  const [listIncomes, setListIncomes] = useState<TransactionResponse[]>([]);
  const [listCategories, setListCategories] = useState<Category[]>([]);
  const [editingIncome, setEditingIncome] = useState<TransactionResponse | null>(null);

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/income/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setListIncomes(listIncomes.filter(income => income._id !== id));
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const handleEdit = (income: TransactionResponse) => {
    setEditingIncome(income);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const [incomes, categories] = await Promise.all([
            getIncomes(token),
            getCategories(token)
          ]);
          setListIncomes(incomes);
          setListCategories(categories);
        } catch (error) {
          console.error('Error loading data:', error);
        }
      }
    };

    fetchData();
  }, [token, listCategories, listIncomes]);

  return (
    <div className="pb-20">
      <h1 className="text-3xl font-bold font-poppins">Incomes</h1>
      <div className="flex flex-wrap w-full pt-16 gap-5">
        <AddIncome editingTransaction={editingIncome} setEditingTransaction={setEditingIncome} token={token}/>
        <div className="w-full md:w-[60%] flex flex-col gap-3">
        {listIncomes.length > 0 ? (
          listIncomes.map((income) => {
            const category = listCategories.find(cat => cat.name === income.category);
            return(
            <Card key={income._id} className="w-full p-3 flex flex-row justify-between">
              <div className="w-full flex flex-row justify-between">
                <div className="flex flex-col sm:flex-row">
                  <div className="flex items-center">
                    <Button color="primary" variant="flat" className="w-[50px] h-[50px]">
                      {category?.icon}
                    </Button>
                    </div>
                    <div className="sm:ml-3 ">
                      <h3 className="font-poppins font-semibold text-slate-800">{income.title}</h3>
                      <p className="flex items-center gap-2"><FaCalendar /> {new Date(income.createdAt).toLocaleDateString()}</p>
                      <p className="flex items-center gap-2"><RiChat1Fill />{income.description}</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pr-3 w-full">
                  <p> + Rp. {income.amount}</p>
                </div>
                <div className="block">
                  <div className="flex flex-col gap-2">
                    <button className="px-3 py-3 rounded-xl text-white bg-blue-400" onClick={() => handleEdit(income)}><CiEdit /></button>
                    <button className="px-3 py-3 rounded-xl text-white bg-red-400" onClick={() => handleDelete(income._id)}><MdDelete /></button>
                  </div>
                </div>
              <div>
            </div> 
            </Card>
          )})
        ) : (
          <p>No incomes available.</p>
        )}
      </div>
      </div>
      
    </div>
  )
}

export default withAuth(ListIncome)