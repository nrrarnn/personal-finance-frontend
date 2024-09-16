import { useEffect, useState } from "react";
import api from "../../../api/api"
import withAuth from "../../../hoc/withAuth";
import { Button, Card } from "@nextui-org/react";
import { Link } from "react-router-dom";
import AddIncome from "./AddIncome";
import { GiMoneyStack } from "react-icons/gi";
import { FaCalendar } from "react-icons/fa6";
import { RiChat1Fill } from "react-icons/ri";

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
        <div className="w-full md:w-[60%] flex flex-col gap-3">
        {listIncomes.length > 0 ? (
          listIncomes.map((income) => (
            <Card key={income.id} className="w-full p-3 flex flex-row justify-between ">
              <div className="flex flex-row"> 
                <div className="flex justify-center items-center">
                <Button color="primary" variant="flat" className="w-[50px] h-[50px]">
                  <GiMoneyStack className="text-3xl" />
                </Button>
                </div>
                <div className="px-4">
                  <h3 className="font-poppins font-semibold text-slate-800">{income.title}</h3>
                  <p className="flex items-center gap-2"><FaCalendar /> {new Date(income.createdAt).toLocaleDateString()}</p>
                  <p className="flex items-center gap-2"><RiChat1Fill />{income.description}</p>
                </div>
              </div>
              <div className="flex pr-4 justify-right">
                <p> + Rp. {income.amount}</p>
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