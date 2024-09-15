import { useEffect, useState } from "react";
import api from "../../api/api";
import withAuth from "../../hoc/withAuth"
import { Button, Card, CardBody } from "@nextui-org/react";
import { MdEmojiTransportation, MdFastfood } from "react-icons/md";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { IoFastFoodOutline } from "react-icons/io5";

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
          <h1 className="font-poppins font-semibold p-1">Categories</h1>
          <div className=" w-[100%] md:w-[60%]">
            <div className="flex flex-wrap gap-2">
              <Button className="p-8" variant="flat" color="primary">
                <MdFastfood className="text-3xl" />
              </Button>
              <Button className="p-8" variant="flat" color="danger">
                <MdEmojiTransportation className="text-3xl"/>
              </Button>
              <Button className="p-8" variant="flat" color="success">
                <FaMoneyBillTrendUp className="text-3xl" />
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <h1 className="font-poppins font-semibold p-1">Last Transactions</h1>
          <div>
            <Card className="bg-blue-400 text-white">
              <CardBody className="flex flex-row justify-between">
                <Button className="p-2 text-xl text-white h-[50px]" color="primary">
                  <IoFastFoodOutline />
                </Button>
                <div className="flex flex-row justify-between w-full">
                  <div className="pl-3">
                    <h1 className="font-bold text-lg">Breakfast</h1>
                    <p>expense</p>
                  </div>
                  <div className="text-sm">
                    -Rp. 25.000
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
} 

export default withAuth(HomeDashboard)