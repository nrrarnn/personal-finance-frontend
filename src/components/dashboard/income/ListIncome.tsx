import { useEffect, useState } from "react";
import withAuth from "../../../hoc/withAuth";
import { Button, Card } from "@nextui-org/react";
import AddIncome from "./AddIncome";
import { FaCalendar } from "react-icons/fa6";
import { RiChat1Fill } from "react-icons/ri";
import { Category, TokenProps, TransactionResponse } from "../../../types/types";
import { getCategories, getIncomes } from "../../../api/servicesApi";

const ListIncome: React.FC<TokenProps> = ({token}) => {
  const [listIncomes, setListIncomes] = useState<TransactionResponse[]>([]);
  const [listCategories, setListCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          const [incomes, categories] = await Promise.all([
            getIncomes(token),
            getCategories(token)
          ]);
          setListIncomes(incomes);
          setListCategories(categories);
        } catch (error) {
          console.error('Error loading data:', error);
        }
      }
    };

    fetchData();
  }, [token, listCategories, listIncomes]);

  return (
    <div className="pb-20">
      <h1 className="text-3xl font-bold font-poppins">Incomes</h1>
      <div className="flex flex-wrap w-full pt-16 gap-5">
        <AddIncome/>
        <div className="w-full md:w-[60%] flex flex-col gap-3">
        {listIncomes.length > 0 ? (
          listIncomes.map((income) => {
            const category = listCategories.find(cat => cat.name === income.category);
            return(
            <Card key={income.id} className="w-full p-3 flex flex-row justify-between ">
              <div className="flex flex-row"> 
                <div className="flex justify-center items-center">
                <Button color="primary" variant="flat" className="w-[50px] h-[50px]">
                  {category?.icon}
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
          )})
        ) : (
          <p>No incomes available.</p>
        )}
      </div>
      </div>
      
    </div>
  )
}

export default withAuth(ListIncome)