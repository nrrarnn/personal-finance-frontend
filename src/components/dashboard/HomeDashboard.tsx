"use client"
import { useEffect, useState } from "react";
import api from "../../api/api";
import { Avatar, Button, Card, CardBody, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ScrollShadow, Tab, Tabs } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import { truncateText } from "../../data/functionTruncate";
import { colors } from "../../data/colors";
import { Category, ChartData, TransactionResponse } from "../../types/types";
import { VictoryTheme, VictoryPie } from "victory";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";
import { BiLogOut } from "react-icons/bi";
import { RootState } from "../../store/store";



interface BalanceResponse {
  balance: number;
  totalIncome: number;
  totalExpense: number;
}

const HomeDashboard = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const username = useSelector((state: RootState) => state.auth.username);
  const email = useSelector((state: RootState) => state.auth.email);

  const [balance, setBalance] = useState<number>(0);
  const [totalIncome, setTotalIncome] = useState<number >(0);
  const [totalExpense, setTotalExpense] = useState<number >(0);
  const [listExpenses, setListExpenses] = useState<TransactionResponse[]>([]);
  const [listIncomes, setListIncomes] = useState<TransactionResponse[]>([]);
  const [listCategories, setListCategories] = useState<Category[]>([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    dispatch(logout()); 
    setIsOpen(false);
    navigate('/');
  };
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

const sortedTransactions = enhancedTransactions.sort(
  (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
);



const dataSample = listIncomes.reduce<ChartData>((acc, category) => {
  if (acc[category.category]) {
    acc[category.category].y += category.amount;
  } else {
    acc[category.category] = { x: category.category, y: category.amount };
  }
  return acc;
}, {});

const result = Object.values(dataSample);

const dataExpenses = listExpenses.reduce<ChartData>((acc, category) => {
  if (acc[category.category]) {
    acc[category.category].y += category.amount;
  } else {
    acc[category.category] = { x: category.category, y: category.amount };
  }
  return acc;
}, {});

const resultExpenses = Object.values(dataExpenses);

  return (
    <section className="w-full bg-[#f0f7ff] pb-32 ">
      <div className="p-4">
        <div className="flex flex-row justify-between px-4">
          <div>
            <div className="text-md font-normal">Hello, {username} !</div>
            <div className="text-xl md:text-3xl font-extrabold font-poppins">Welcome To SaldaQ</div>
          </div>
          <div className="block md:hidden">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  src="https://img.freepik.com/free-psd/3d-illustration-person_23-2149436192.jpg?t=st=1726625364~exp=1726628964~hmac=5a87525a29dae77f1ef01badda331588c349077da8797d323fba51cd6f8ebcf8&w=740"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{email}</p>
                </DropdownItem>
                <DropdownItem key="logout" color="danger">
                  <button onClick={openModal} className="px-2 flex items-center gap-2">
                      <BiLogOut />Log Out
                  </button>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <Modal 
        size="sm" 
        isOpen={isOpen} 
        onClose={closeModal} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Konfirmasi Logout</ModalHeader>
            <ModalBody>
              <p>Apakah Anda yakin ingin logout?</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={closeModal}>
                Batal
              </Button>
              <Button color="primary" onPress={handleLogout}>
                Logout
              </Button>
            </ModalFooter>
        </ModalContent>
      </Modal>
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

        <div className="pt-5 bg-[#f0f7ff] w-full">
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
                    <Button key={category._id} color={backgroundColor as "primary"} className={`w-[80px] h-[80px]`} variant="flat"> 
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
              <div className="pt-5 w-full">
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
              <div className="w-full flex justify-center flex-col p-6 ">
                <Tabs aria-label="Options">
                  <Tab key="incomes" title="Incomes">
                    <Card>
                        <VictoryPie
                        startAngle={90}
                        endAngle={450}
                        data={result}
                        theme={VictoryTheme.clean}
                      />
                    </Card>  
                  </Tab>
                  <Tab key="expense" title="Expenses">
                    <Card>
                      <VictoryPie
                      startAngle={90}
                      endAngle={450}
                      data={resultExpenses}
                      theme={VictoryTheme.clean}
                    />
                    </Card>  
                  </Tab>
                </Tabs>
                  
                  
                    <div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 



export default HomeDashboard