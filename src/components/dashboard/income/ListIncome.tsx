import { useEffect, useState } from "react";
import api from "../../../api/api"
import withAuth from "../../../hoc/withAuth";

interface ListIncomeProps {
  token: string | null;
}
const ListIncome: React.FC<ListIncomeProps> = ({token}) => {
  const [listIncomes, setListIncomes] = useState([]);
  const getIncomes = async () => {
    try{
      const response = await api.get('/incomes', {
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
    getIncomes()
  },[])
  return (
    <div>
      <h1>List Income</h1>
    </div>
  )
}

export default withAuth(ListIncome)