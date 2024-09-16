import { useEffect, useState } from "react";
import api from "../../../api/api"
import withAuth from "../../../hoc/withAuth"
import { Button, useDisclosure } from "@nextui-org/react";
import AddCategory from "./AddCategory";
import { Link } from "react-router-dom";

interface ListCategoriesProps {
  token: string | null;
}

interface Category {
  _id: string;
  name: string;
  type: string;
  icon: string;
}

const ListCategories: React.FC<ListCategoriesProps> = ({token}) => {
  const [ListCategories, setListCategories] = useState<Category[]>([]);
  
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const getCategories = async () => {
    try{
      const response = await api.get<Category[]>('/categories', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setListCategories(response.data)
    } catch(error) {
      console.error(error)
    }
  }

  const incomeCategories = ListCategories.filter((category) => category.type === "income")
  const expenseCategories = ListCategories.filter((category) => category.type === "expense")
  const colors: string[] = ['primary', 'secondary', "success", "warning"];
  const truncateText = (text: string, maxLength:number) => {
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  useEffect(() => {
    getCategories()
  },[ListCategories])
  return (
    <div>
      <Button color="primary" onPress={onOpen} className="right-5 top-5 absolute ">+ Add Category</Button>
      
      <AddCategory token={token} isOpen={isOpen} onOpenChange={onOpenChange}/>
      <div className=" pt-10">
      <h1 className="font-poppins font-bold text-2xl pt-4 pb-3">Income Categories</h1>
      <div className="flex flex-wrap gap-3">
        {
          incomeCategories.map((category, index) => {
          
          const backgroundColor: string = colors[index % colors.length];

          return(  
            <Button color={backgroundColor} key={category._id} className="w-[80px] h-[80px]" variant="flat"> 
              <Link to={`/dashboard/incomes/${category.name}`} className="p-3">
                <p className="text-xl">{category.icon}</p>
                <p className="text-[13px]">{category.name}</p>
              </Link> 
            </Button>
          )})
        }
      </div>
      <h1 className="pt-8 pb-4 font-poppins font-bold text-2xl">Expense Categories</h1>
      <div className="flex flex-wrap gap-3">
        {
          expenseCategories.map((category,index) => {
          const backgroundColor: string = colors[index % colors.length];
          return(
          <Button key={category._id} color={backgroundColor} className={`w-[80px] h-[80px]`} variant="flat"> 
            <Link to={`/dashboard/expenses/${category.name}`} className="p-3">
              <p className="text-xl">{category.icon}</p>
              {truncateText(category.name, 9)}
            </Link> 
          </Button> 
          )})
        }
      </div>
      </div>
    </div>
  )
}

export default withAuth(ListCategories)