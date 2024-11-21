import { Link, useParams } from "react-router-dom"
import withAuth from "../../../hoc/withAuth";
import { useEffect, useState } from "react";
import { Category, TokenProps, TransactionResponse } from "../../../types/types";
import { getByCategories, getCategories } from "../../../api/servicesApi";
import { Button, Card } from "@nextui-org/react";
import { FaCalendar } from "react-icons/fa6";
import { RiChat1Fill } from "react-icons/ri";

const ExpensesByCategory: React.FC<TokenProps> = ({token}) => {
  const { category } = useParams<Record<string, string | undefined>>();
  const transaction: string = 'expenses'
  const [listExpenses, setListExpenses] = useState<TransactionResponse[]>([]);
  const [listCategories, setListCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          if (!category) {
              console.error("Category is missing from URL parameters.");
              return null;
            }
          const [expenses, categories] = await Promise.all([
            getByCategories(token, transaction, category),
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
    <div>
      <h1>Expenses By Category</h1>
      <div className="py-3">
        <Button color="primary">
          <Link to={'/dashboard/categories'}>Kembali</Link>
      </Button>
      </div>
      
      <div className="w-full md:w-[60%] flex flex-col gap-3 h-screen">
        {listExpenses.length > 0 ? (
          listExpenses.map((expense) => {
            const category = listCategories.find(cat => cat.name === expense.category);
            return(
            <Card key={expense._id} className="w-full p-3 flex flex-row justify-between ">
              <div className="flex flex-row"> 
                <div className="flex justify-center items-center">
                <Button color="primary" variant="flat" className="w-[50px] h-[50px]">
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
  )
}

export default withAuth(ExpensesByCategory)