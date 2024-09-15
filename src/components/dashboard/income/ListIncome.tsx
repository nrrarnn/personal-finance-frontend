import { useEffect, useState } from "react";
import api from "../../../api/api"
import withAuth from "../../../hoc/withAuth";
import { Button, Card } from "@nextui-org/react";
import { Link } from "react-router-dom";
import AddIncome from "./AddIncome";
import { GiMoneyStack } from "react-icons/gi";

interface ListIncomeProps {
  token: string | null;
}

interface IncomeResponse {
  id: string;
  title: string;
  amount: number;
  category: string;
  type: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

const ListIncome: React.FC<ListIncomeProps> = ({token}) => {
  const [listIncomes, setListIncomes] = useState<IncomeResponse[]>([]);
  const getIncomes = async () => {
    try{
      const response = await api.get<IncomeResponse[]>('/incomes', {
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
    <div className="p-0 ">
      <h1 className="text-3xl font-bold font-poppins">Incomes</h1>
      <div className="flex flex-wrap w-full pt-16 gap-5">
        <AddIncome/>
        <div className="w-full md:w-[60%]">
        {listIncomes.length > 0 ? (
          listIncomes.map((income) => (
            <Card key={income.id} className="w-full p-3 flex flex-row">
              <div>
              <Button color="primary" variant="flat" className="w-10 h-10">
                <GiMoneyStack />
              </Button>
              </div>
              <div>
                <h3>{income.title}</h3>
                <p>Date: {new Date(income.createdAt).toLocaleDateString()}</p>
                <p>Description: {income.description}</p>
              </div>
              <div>
                <p>Amount: {income.amount}</p>
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

export default withAuth(ListIncome)