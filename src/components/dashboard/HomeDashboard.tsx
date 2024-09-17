import { useEffect, useState } from "react";
import api from "../../api/api";
import withAuth from "../../hoc/withAuth"
import { Button, Calendar, Card, CardBody, ScrollShadow } from "@nextui-org/react";
import { IoFastFoodOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { truncateText } from "../../data/functionTruncate";
import { colors } from "../../data/colors";
import { getLocalTimeZone, today } from "@internationalized/date";
import { Category, TransactionResponse } from "../../types/types";

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
  const [balance, setBalance] = useState<number>(0);
  const [totalIncome, setTotalIncome] = useState<number >(0);
  const [totalExpense, setTotalExpense] = useState<number >(0);
  const [listExpenses, setListExpenses] = useState<TransactionResponse[]>([]);
  const [listIncomes, setListIncomes] = useState<TransactionResponse[]>([]);
  const [listCategories, setListCategories] = useState<Category[]>([]);
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

  const getExpenses = async () => {
    try{
      const response = await api.get<TransactionResponse[]>('/expenses', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setListExpenses(response.data)
    } catch(error) {
      console.error(error)
    }
  }

  const getIncomes = async () => {
    try{
      const response = await api.get<TransactionResponse[]>('/incomes', {
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
    getBalance()
    getCategories()
    getExpenses()
    getIncomes()
  },[])

  const enhancedTransactions = [
  ...listExpenses.map(expense => {
    const category = listCategories.find(category => category.name === expense.category);
    return {
      ...expense,
      type: 'expense',
      categoryName: category?.name || 'Unknown',
      icon: category?.icon || '❓',
    };
  }),
  ...listIncomes.map(income => {
    const category = listCategories.find(category => category.name === income.category);
    return {
      ...income,
      type: 'income',
      categoryName: category?.name || 'Unknown',
      icon: category?.icon || '💰',
    };
  })
];

const sortedTransactions = enhancedTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));


  return (
    <>
      <div className="p-4">
        <div className="text-md font-normal">Hello, {username} !</div>
        <div className="text-3xl font-extrabold font-poppins">Welcome To SaldaQ</div>
        <div className="flex flex-col md:flex-row mt-6 gap-2 w-full">
          <Card className="w-[95%] md:w-[400px] h-[100px] bg-[#88a2ff] text-white">
            <CardBody>
              <div>Balance</div>
              <div className="text-3xl font-bold">Rp. {balance.toLocaleString('id-ID')}</div>
            </CardBody>
          </Card>
          <div className="flex flex-row gap-2 w-full">
            <Card className="w-[47%] md:w-[300px] h-[100px] bg-sky-300 text-white "  >
            <CardBody>
              <div>Income</div>
              <div className="text-md md:text-3xl font-bold">Rp. {totalIncome.toLocaleString('id-ID')}</div>
            </CardBody>
            </Card>
            <Card className="w-[47%] md:w-[300px] h-[100px] bg-red-300 text-white">
              <CardBody>
                <div>Expense</div>
                <div className="text-md md:text-3xl font-bold">Rp. {totalExpense.toLocaleString('id-ID')}</div>
              </CardBody>
            </Card>
          </div>
        </div>

        <div className="mt-5">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-[50%]">
              <div className="w-full flex flex-col">
                <div className="flex flex-row justify-between pr-3">
                  <h1 className="font-poppins font-semibold p-1">Categories</h1>
                  <h6 className="text-sm font-poppins"><Link to={'/dashboard/categories'}>See all</Link></h6>
                </div>
                  <ScrollShadow
                    hideScrollBar 
                    orientation="horizontal" > 
                    <div className="flex flex-row gap-1">
                  {
                    listCategories.slice(0, 6).map((category,index) => {
                    const backgroundColor: string = colors[index % colors.length];
                    return(
                    <Button key={category._id} color={backgroundColor} className={`w-[80px] h-[80px]`} variant="flat"> 
                      <Link to={`/dashboard/${category.type == 'income' ? 'incomes' : 'expenses'}/${category.name}`} className="p-3">
                        <p className="text-xl">{category.icon}</p>
                        {truncateText(category.name, 9)}
                      </Link> 
                    </Button> 
                    )})
                  }
                    </div>
                  </ScrollShadow>
              </div> 
              <div className="mt-5 w-full">
                <h1 className="font-poppins font-semibold p-1">Last Transactions</h1>
                <div className="flex flex-col gap-3">
                  {sortedTransactions.map((transaction, index) => (
                    <Card key={index} className={`${transaction.type === 'expense' ? 'bg-indigo-300' : 'bg-blue-300'} text-white`}>
                      <CardBody className="flex flex-row justify-between">
                        <Button className="p-2 text-xl text-white h-[50px]" color="primary" variant="flat">
                          {transaction.icon} 
                        </Button>
                        <div className="flex flex-row justify-between w-full">
                          <div className="pl-3">
                            <h1 className="font-bold text-lg">{transaction.categoryName}</h1>
                            <p>{transaction.type}</p>
                          </div>
                          <div className="text-sm">
                            {transaction.type === 'expense' ? `-Rp. ${transaction.amount}` : `+Rp. ${transaction.amount}`}
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full md:w-[50%]">
              <div className="w-full flex justify-center p-6">
                <div className="flex gap-x-4">
                  <Calendar aaria-label="Date (Read Only)" 
                    value={today(getLocalTimeZone())} 
                    isReadOnly  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 

export default withAuth(HomeDashboard)