import { useEffect, useState } from "react";
import withAuth from "../../../hoc/withAuth";
import { Button, Card } from "@nextui-org/react";
import { FaCalendar } from "react-icons/fa6";
import { RiChat1Fill } from "react-icons/ri";
import AddExpense from "./AddExpense";
import { Category, TokenProps, TransactionResponse } from "../../../types/types";
import { getCategories, getExpenses } from "../../../api/servicesApi";

const ListExpenses: React.FC<TokenProps> = ({token}) => {
  const [listExpenses, setListExpenses] = useState<TransactionResponse[]>([]);
  const [listCategories, setListCategories] = useState<Category[]>([]);

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
  }, [token]);

  return (
    <div className="p-0 ">
      <h1 className="text-3xl font-bold font-poppins">Incomes</h1>
      <div className="flex flex-wrap w-full pt-16 gap-5">
        <AddExpense/>
        <div className="w-full md:w-[60%] flex flex-col gap-3">
        {listExpenses.length > 0 ? (
          listExpenses.map((expense) => {
            const category = listCategories.find(cat => cat.name === expense.category);
            return(
            <Card key={expense.id} className="w-full p-3 flex flex-row justify-between ">
              <div className="flex flex-row"> 
                <div className="flex justify-center items-center">
                <Button color="secondary" variant="flat" className="w-[50px] h-[50px]">
                  {category?.icon}
                </Button>
                </div>
                <div className="px-4">
                  <h3 className="font-poppins font-semibold text-slate-800">{expense.title}</h3>
                  <p className="flex items-center gap-2"><FaCalendar /> {new Date(expense.createdAt).toLocaleDateString()}</p>
                  <p className="flex items-center gap-2"><RiChat1Fill />{expense.description}</p>
                </div>
              </div>
              <div className="flex pr-4 justify-right">
                <p> + Rp. {expense.amount}</p>
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