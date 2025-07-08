"use client";

import { useState } from "react";
import { Avatar, Button, Card, CardBody, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ScrollShadow, Tab, Tabs } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import { truncateText } from "../../data/functionTruncate";
import { colors, colors2 } from "../../data/colors";
import { ChartData } from "../../types/types";
import { VictoryTheme, VictoryPie } from "victory";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authSlice";
import { BiLogOut, BiTrendingUp, BiTrendingDown, BiWallet } from "react-icons/bi";
import { RootState } from "../../store/store";
import { FaArrowUp, FaArrowDown, FaEye, FaChartLine } from "react-icons/fa";
import { useBalance, useCategories, useExpenses, useIncomes } from "../../hooks/useTransactions";

const HomeDashboard = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const username = useSelector((state: RootState) => state.auth.username);
  const email = useSelector((state: RootState) => state.auth.email);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    dispatch(logout());
    setIsOpen(false);
    navigate("/");
  };

  const { data: balanceData, isLoading: isBalanceLoading } = useBalance(token!);
  const { data: listCategories = [] } = useCategories(token!);
  const { data: listExpenses = [] } = useExpenses(token!);
  const { data: listIncomes = [] } = useIncomes(token!);

  const balance = balanceData?.balance || 0;
  const totalIncome = balanceData?.totalIncome || 0;
  const totalExpense = balanceData?.totalExpense || 0;

  if (isBalanceLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-slate-600">Loading...</div>
      </div>
    );
  }

  const enhancedTransactions = [
    ...listExpenses.map((expense) => {
      const category = listCategories.find((category) => category.name === expense.category);
      return {
        ...expense,
        type: "expense",
        categoryName: category?.name || "Unknown",
        icon: category?.icon || "❓",
      };
    }),
    ...listIncomes.map((income) => {
      const category = listCategories.find((category) => category.name === income.category);
      return {
        ...income,
        type: "income",
        categoryName: category?.name || "Unknown",
        icon: category?.icon || "💰",
      };
    }),
  ];

  const sortedTransactions = enhancedTransactions.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

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

  const savingsRate = totalIncome > 0 ? (((totalIncome - totalExpense) / totalIncome) * 100).toFixed(1) : 0;

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pb-32 p-2">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-row justify-between items-center mb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse"></div>
              <span className="text-slate-600 font-medium">Hello, {username}!</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">Welcome To SaldaQ</h1>
          </div>
          <div className="block md:hidden">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform hover:scale-105 ring-2 ring-indigo-200"
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
                    <BiLogOut />
                    Log Out
                  </button>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          <div className="lg:col-span-1">
            <Card className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white shadow-2xl shadow-indigo-500/20 border-0 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full -ml-12 -mb-12"></div>
              <CardBody className="p-6 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <BiWallet className="text-2xl opacity-90" />
                    <span className="text-white/90 font-medium">Total Balance</span>
                  </div>
                  <FaEye className="text-white/70 hover:text-white cursor-pointer transition-colors" />
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2">Rp. {balance.toLocaleString("id-ID")}</div>
                <div className="flex items-center gap-2 text-white/80">
                  <span className="text-sm">Savings Rate:</span>
                  <span className="text-sm font-semibold">{savingsRate}%</span>
                </div>
              </CardBody>
            </Card>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20 border-0">
              <CardBody className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <FaArrowUp className="text-lg" />
                    </div>
                    <span className="font-medium">Income</span>
                  </div>
                  <BiTrendingUp className="text-2xl opacity-80" />
                </div>
                <div className="text-xl md:text-2xl font-bold">Rp. {totalIncome.toLocaleString("id-ID")}</div>
                <div className="text-white/80 text-sm mt-2">This month</div>
              </CardBody>
            </Card>

            <Card className="bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-lg shadow-rose-500/20 border-0">
              <CardBody className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <FaArrowDown className="text-lg" />
                    </div>
                    <span className="font-medium">Expense</span>
                  </div>
                  <BiTrendingDown className="text-2xl opacity-80" />
                </div>
                <div className="text-xl md:text-2xl font-bold">Rp. {totalExpense.toLocaleString("id-ID")}</div>
                <div className="text-white/80 text-sm mt-2">This month</div>
              </CardBody>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="bg-white/60 backdrop-blur-sm shadow-md shadow-gray-500/10 border border-white/50">
              <CardBody className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-slate-800">Categories</h2>
                  <Link to="/dashboard/categories" className="text-indigo-600 hover:text-indigo-800 font-medium text-sm transition-colors">
                    See all →
                  </Link>
                </div>
                <ScrollShadow hideScrollBar orientation="horizontal">
                  <div className="flex gap-3 pb-2">
                    {listCategories.slice(0, 6).map((category, index) => {
                      const backgroundColor = colors2[index % colors.length];
                      return (
                        <Link key={category._id} to={`/dashboard/${category.type === "income" ? "incomes" : "expenses"}/${category.name}`}>
                          <div className={`min-w-[80px] h-20 hover:from-indigo-100 hover:to-purple-100 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-200 hover:scale-105 hover:shadow-lg cursor-pointer group ${backgroundColor}`}>
                            <div className="text-2xl group-hover:scale-110 transition-transform">{category.icon}</div>
                            <div className="text-xs font-medium text-slate-600 group-hover:text-indigo-600 transition-colors">{truncateText(category.name, 9)}</div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </ScrollShadow>
              </CardBody>
            </Card>

            <Card className="bg-white/60 backdrop-blur-sm shadow-md shadow-gray-500/10 border border-white/50">
              <CardBody className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FaChartLine className="text-indigo-600" />
                  <h2 className="text-xl font-bold text-slate-800">Recent Transactions</h2>
                </div>
                <div className="space-y-3">
                  {sortedTransactions.slice(0, 5).map((transaction, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 bg-white/50 rounded-lg hover:bg-white/70 transition-all duration-200 hover:shadow-md">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${transaction.type === "expense" ? "bg-gradient-to-br from-rose-100 to-rose-200" : "bg-gradient-to-br from-emerald-100 to-emerald-200"}`}
                      >
                        {transaction.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-slate-800">{transaction.categoryName}</div>
                        <div className="text-sm text-slate-500 capitalize">{transaction.type}</div>
                      </div>
                      <div className={`font-bold ${transaction.type === "expense" ? "text-rose-600" : "text-emerald-600"}`}>
                        {transaction.type === "expense" ? "-" : "+"}Rp. {transaction.amount.toLocaleString("id-ID")}
                      </div>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          </div>

          <div>
            <Card className="bg-white/60 backdrop-blur-sm shadow-lg border border-white/50">
              <CardBody className="p-6">
                <h2 className="text-xl font-bold text-slate-800 mb-4">Financial Overview</h2>
                <Tabs
                  aria-label="Financial Charts"
                  classNames={{
                    tabList: "gap-6 w-full relative rounded-lg bg-slate-100/50 p-1",
                    cursor: "w-full bg-white shadow-lg",
                    tab: "max-w-fit px-4 py-2 h-10",
                    tabContent: "group-data-[selected=true]:text-indigo-600 font-medium",
                  }}
                >
                  <Tab key="incomes" title="Income Distribution">
                    <div className="mt-4">
                      {result.length > 0 ? (
                        <div className="bg-white/50 rounded-lg p-4">
                          <VictoryPie
                            data={result}
                            theme={VictoryTheme.clean}
                            colorScale={["#10b981", "#06b6d4", "#3b82f6", "#6366f1", "#8b5cf6", "#d946ef"]}
                            innerRadius={50}
                            padAngle={2}
                            animate={{
                              duration: 1000,
                              onLoad: { duration: 500 },
                            }}
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-64 text-slate-500">
                          <div className="text-center">
                            <div className="text-4xl mb-2">📊</div>
                            <div>No income data available</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </Tab>
                  <Tab key="expenses" title="Expense Breakdown">
                    <div className="mt-4">
                      {resultExpenses.length > 0 ? (
                        <div className="bg-white/50 rounded-lg p-4">
                          <VictoryPie
                            data={resultExpenses}
                            theme={VictoryTheme.clean}
                            colorScale={["#ef4444", "#f97316", "#eab308", "#84cc16", "#06b6d4", "#6366f1"]}
                            innerRadius={50}
                            padAngle={2}
                            animate={{
                              duration: 1000,
                              onLoad: { duration: 500 },
                            }}
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-64 text-slate-500">
                          <div className="text-center">
                            <div className="text-4xl mb-2">💸</div>
                            <div>No expense data available</div>
                          </div>
                        </div>
                      )}
                    </div>
                  </Tab>
                </Tabs>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>

      <Modal
        size="sm"
        isOpen={isOpen}
        onClose={closeModal}
        classNames={{
          backdrop: "bg-slate-900/50 backdrop-opacity-50",
          base: "border border-slate-200 bg-white shadow-2xl",
          header: "border-b border-slate-200",
          body: "py-6",
          footer: "border-t border-slate-200",
        }}
      >
        <ModalContent>
          <ModalHeader className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-red-400 to-red-500 rounded-lg flex items-center justify-center">
              <BiLogOut className="text-white text-lg" />
            </div>
            <span className="text-slate-800 font-semibold">Konfirmasi Logout</span>
          </ModalHeader>
          <ModalBody>
            <p className="text-slate-600">Apakah Anda yakin ingin logout dari akun Anda?</p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={closeModal} className="font-medium">
              Batal
            </Button>
            <Button onPress={handleLogout} className="bg-gradient-to-r from-red-500 to-red-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200">
              Logout
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </section>
  );
};

export default HomeDashboard;
