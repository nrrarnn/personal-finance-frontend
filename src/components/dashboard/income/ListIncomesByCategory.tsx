import { useParams } from "react-router-dom"
import withAuth from "../../../hoc/withAuth";
import api from "../../../api/api";
import { useEffect, useState } from "react";

interface IncomesByCategoryProps {
  token: string | null;
}

interface IncomeResponse {
  id: string;
  title: string;
  amount: number;
  category: string;
  description: string;
}

const IncomesByCategory: React.FC<IncomesByCategoryProps> = ({token}) => {
  const { category } = useParams();
  const [listIncomes, setListIncomes] = useState<IncomeResponse[]>([]);

  const getIncomesByCategory = async () => {
    try{
      const response = await api.get<IncomeResponse[]>(`/incomes/${category}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setListIncomes(response.data)
    } catch(error) {
      console.error(error)
    }
    
  }
  useEffect(() => {
      getIncomesByCategory()
    },[category])
  return (
    <div>
      <h1>Incomes By Category</h1>
      {
        listIncomes.map((income) => (
          <div key={income.id}>
            <h3>{income.title}</h3>
            <p>Amount: {income.amount}</p>
            <p>Category: {income.category}</p>
            <p>Description: {income.description}</p>
          </div>
        ))
      }
    </div>
  )
}

export default withAuth(IncomesByCategory)