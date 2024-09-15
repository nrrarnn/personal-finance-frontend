import ListCategories from "../components/dashboard/category/ListCategories";
import AddExpense from "../components/dashboard/expense/AddExpense";
import ExpensesByCategory from "../components/dashboard/expense/ExpensesByCategory";
import ListExpenses from "../components/dashboard/expense/ListExpenses";
import HomeDashboard from "../components/dashboard/HomeDashboard";
import AddIncome from "../components/dashboard/income/AddIncome";
import ListIncome from "../components/dashboard/income/ListIncome";
import Sidebar from "../components/dashboard/Sidebar"
import { Route, Routes } from "react-router-dom";

const DashboardPage = () => {
  return(
    <>
      <Sidebar/>
      <div className="flex-1 ml-0 md:ml-[200px] p-4 bg-[#f0f7ff]">
        <Routes>
          <Route path="/home" element={<HomeDashboard/>} />
          <Route path="/incomes" element={<ListIncome/>} />
          <Route path="/expenses" element={<ListExpenses/>} />
          <Route path="/expenses/:category" element={<ExpensesByCategory/>} />
          <Route path="/categories" element={<ListCategories/>} />
          <Route path="/incomes/add" element={<AddIncome/>} />
          <Route path="/expenses/add" element={<AddExpense/>} />
        </Routes>
      </div>
    </>
  )
}

export default DashboardPage