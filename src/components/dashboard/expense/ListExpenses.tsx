import { useEffect, useState } from "react";
import api from "../../../api/api"
import withAuth from "../../../hoc/withAuth";
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

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
    <div>
      <h1>List Income</h1>
      <Button ><Link to="/dashboard/expenses/add">Add Expense</Link></Button>
      <ul>
        {listExpenses.length > 0 ? (
          listExpenses.map((expense) => (
            <li key={expense.id}>
              <h3>{expense.title}</h3>
              <p>Amount: {expense.amount}</p>
              <p>Category: {expense.category}</p>
              <p>Type: {expense.type}</p>
              <p>Description: {expense.description}</p>
              <p>Date: {new Date(expense.createdAt).toLocaleDateString()}</p>
            </li>
          ))
        ) : (
          <p>No incomes available.</p>
        )}
      </ul>
    </div>
  )
}

export default withAuth(ListExpenses)