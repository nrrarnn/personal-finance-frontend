import HomeDashboard from "../components/dashboard/HomeDashboard";
import ListIncome from "../components/dashboard/income/ListIncome";
import Sidebar from "../components/dashboard/Sidebar"
import { Route, Routes } from "react-router-dom";

const DashboardPage = () => {
  return(
    <>
      <Sidebar/>
      <div className="flex-1 ml-0 md:ml-64 p-4">
        <Routes>
          <Route path="/home" element={<HomeDashboard/>} />
          <Route path="/income" element={<ListIncome/>} />
          <Route path="/expense" element={<h1>ini adalah halaman settings </h1>} />
        </Routes>
      </div>
    </>
  )
}

export default DashboardPage