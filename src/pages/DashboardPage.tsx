import ListCategories from "../components/dashboard/category/ListCategories";
import ExpensesByCategory from "../components/dashboard/expense/ExpensesByCategory";
import ListExpenses from "../components/dashboard/expense/ListExpenses";
import HomeDashboard from "../components/dashboard/HomeDashboard";
import ListIncome from "../components/dashboard/income/ListIncome";
import ListIncomesByCategory from "../components/dashboard/income/ListIncomesByCategory";
import Sidebar from "../components/dashboard/Sidebar"
import { Route, Routes } from "react-router-dom";

const DashboardPage = () => {
  return(
    <>
      <Sidebar/>
      <div className="flex-1 ml-0 md:ml-[200px] p-4 bg-[#f0f7ff] h-full py-10">
        <Routes>
          <Route path="/home" element={<HomeDashboard/>} />
          <Route path="/incomes" element={<ListIncome/>} />
          <Route path="/incomes/:category" element={<ListIncomesByCategory/>} />
          <Route path="/expenses" element={<ListExpenses/>} />
          <Route path="/expenses/:category" element={<ExpensesByCategory/>} />
          <Route path="/categories" element={<ListCategories/>} />
        </Routes>
      </div>
    </>
  )
}

export default DashboardPage