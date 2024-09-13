import { useEffect, useState } from "react";
import api from "../../api/api";
import withAuth from "../../hoc/withAuth"

interface DashboardProps {
  token: string | null;
  username: string | null; 
}

interface BalanceResponse {
  balance: number;
  totalIncome: number;
  totalExpense: number;
}

const HomeDashboard: React.FC<DashboardProps> = ({token, username}) => {
  const [balance, setBalance] = useState<number | null>(null);
  const [totalIncome, setTotalIncome] = useState<number | null>(null);
  const [totalExpense, setTotalExpense] = useState<number | null>(null);
  const getBalance = async () => {
    try {
      const response = await api.get<BalanceResponse>('/balance', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setBalance(response.data.balance)
      setTotalIncome(response.data.totalIncome)
      setTotalExpense(response.data.totalExpense)
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getBalance()
  },[])

  return (
    <>
      <div>Hello {username}</div>
      <div>Balance: {balance}</div>
      <div>Income : {totalIncome }</div>
      <div>Expense : {totalExpense }</div>
    </>
  )
} 

export default withAuth(HomeDashboard)