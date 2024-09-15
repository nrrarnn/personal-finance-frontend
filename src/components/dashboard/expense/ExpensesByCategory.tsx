import { useParams } from "react-router-dom"
import withAuth from "../../../hoc/withAuth";
import api from "../../../api/api";
import { useEffect, useState } from "react";

interface ExpensesByCategoryProps {
  token: string | null;
}

interface ExpenseResponse {
  id: string;
  title: string;
  amount: number;
  category: string;
  description: string;
}

const ExpensesByCategory: React.FC<ExpensesByCategoryProps> = ({token}) => {
  const { category } = useParams();
  const [listExpenses, setListExpenses] = useState<ExpenseResponse[]>([]);

  const getExpensesByCategory = async () => {
    try{
      const response = await api.get<ExpenseResponse[]>(`/expenses/${category}`, {
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
      getExpensesByCategory()
    },[category])
  return (
    <div>
      <h1>Expenses By Category</h1>
      {
        listExpenses.map((expense) => (
          <div key={expense.id}>
            <h3>{expense.title}</h3>
            <p>Amount: {expense.amount}</p>
            <p>Category: {expense.category}</p>
            <p>Description: {expense.description}</p>
          </div>
        ))
      }
    </div>
  )
}

export default withAuth(ExpensesByCategory)