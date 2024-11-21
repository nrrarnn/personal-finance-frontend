import { Link, useParams } from "react-router-dom"
import withAuth from "../../../hoc/withAuth";
import { useEffect, useState } from "react";
import { Category, TokenProps, TransactionResponse } from "../../../types/types";
import { getByCategories, getCategories } from "../../../api/servicesApi";
import { Button, Card } from "@nextui-org/react";
import { FaCalendar } from "react-icons/fa6";
import { RiChat1Fill } from "react-icons/ri";

const IncomesByCategory: React.FC<TokenProps> = ({token}) => {
  const { category } = useParams<Record<string, string | undefined>>();
  const transaction: string = 'incomes'
  const [listIncomes, setListIncomes] = useState<TransactionResponse[]>([]);
  const [listCategories, setListCategories] = useState<Category[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          if (!category) {
              console.error("Category is missing from URL parameters.");
              return null;
            }
          const [incomes, categories] = await Promise.all([
            getByCategories(token, transaction, category),
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
  }, [token]);
  return (
    <div>
      <h1>Incomes By Category</h1>
      <div className="py-3">
        <Button color="primary">
          <Link to={'/dashboard/categories'}>Kembali</Link>
        </Button>
      </div>
      <div className="w-full md:w-[60%] flex flex-col gap-3 h-screen">
        {listIncomes.length > 0 ? (
          listIncomes.map((income) => {
            const category = listCategories.find(cat => cat.name === income.category);
            return(
            <Card key={income._id} className="w-full p-3 flex flex-row justify-between">
              <div className="w-full flex flex-row justify-between">
                  <div className="flex flex-col sm:flex-row">
                    <div className="flex items-center">
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
                </div>
                  <div className="flex justify-end w-full">
                    <p> + Rp. {income.amount}</p>
                  </div>
                <div>
              </div> 
            </Card>
          )})
        ) : (
          <p>No incomes available.</p>
        )}
    </div>
    </div>
  )
}

export default withAuth(IncomesByCategory)