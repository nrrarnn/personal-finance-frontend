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

  useEffect(() => {
    getCategories()
  },[ListCategories])
  return (
    <div>
      <h1>List Categories</h1>
      <Button onPress={onOpen}>Add Category</Button>
      
      <AddCategory token={token} isOpen={isOpen} onOpenChange={onOpenChange}/>

      {
        ListCategories.map((category) => (
        <Link to={`/dashboard/expenses/${category.name}`} key={category._id}>
          <li>{category.name}</li>
        </Link> 
        ))
      }
    </div>
  )
}

export default withAuth(ListCategories)