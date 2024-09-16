import { useEffect, useState } from "react";
import api from "../../../api/api"
import withAuth from "../../../hoc/withAuth";
import { Button, Card } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { GiMoneyStack } from "react-icons/gi";
import { FaCalendar } from "react-icons/fa6";
import { RiChat1Fill } from "react-icons/ri";
import AddExpense from "./AddExpense";

interface ListExpenseProps {
  token: string | null;
}

interface ExpenseResponse {
  id: string;
  title: string;
  amount: number;
  category: string;
  type: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

const ListExpenses: React.FC<ListExpenseProps> = ({token}) => {
  const [listExpenses, setListExpenses] = useState<ExpenseResponse[]>([]);
  const getExpenses = async () => {
    try{
      const response = await api.get<ExpenseResponse[]>('/expenses', {
      headers: {
        Authorization: `Bearer ${token}`
      }
      })

      setListExpenses(response.data)
    } catch(error) {
      console.error(error)
    }   
  }

  useEffect(() => {
    getExpenses()
  },[])
  return (
    <div className="p-0 ">
      <h1 className="text-3xl font-bold font-poppins">Incomes</h1>
      <div className="flex flex-wrap w-full pt-16 gap-5">
        <AddExpense/>
        <div className="w-full md:w-[60%] flex flex-col gap-3">
        {listExpenses.length > 0 ? (
          listExpenses.map((expense) => (
            <Card key={expense.id} className="w-full p-3 flex flex-row justify-between">
              <div className="flex flex-row"> 
                <div className="flex justify-center items-center">
                <Button color="secondary" variant="flat" className="w-[50px] h-[50px]">
                  <p className="text-xl">🏃‍♂️</p>
                </Button>
                </div>
                <div className="px-4">
                  <h3 className="font-poppins font-semibold text-slate-800">{expense.title}</h3>
                  <p className="flex items-center gap-2"><FaCalendar className="text-xl" /> {new Date(expense.createdAt).toLocaleDateString()}</p>
                  <p className="flex items-center gap-2"><RiChat1Fill className="text-xl"/><span className="flex flex-wrap">{expense.description}</span> </p>
                </div>
              </div>
              <div className="flex pr-4 justify-right">
                <p> - Rp. {expense.amount}</p>
              </div>
              
            </Card>
          ))
        ) : (
          <p>No incomes available.</p>
        )}
      </div>
      </div>
      
    </div>
  )
}

export default withAuth(ListExpenses)