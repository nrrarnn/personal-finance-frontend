import { Link, useParams } from "react-router-dom";
import { BreadcrumbItem, Breadcrumbs, Button, Card, CardBody, Chip, Select, SelectItem } from "@nextui-org/react";
import { FaCalendar, FaArrowLeft, FaMoneyBillWave } from "react-icons/fa6";
import { RiChat1Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useCategories, useCategoryTransactions } from "../../../hooks/useTransactions";
import LoadingSpinner from "../../LoadingSpinner";
import { useState } from "react";

const CategoryDetail = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const { categoryId } = useParams<Record<string, string | undefined>>();
  const { data: listCategories = [] } = useCategories(token!);

  // Get current date for default values
  const currentDate = new Date();
  const [month, setMonth] = useState<number>(currentDate.getMonth() + 1);
  const [year, setYear] = useState<number>(currentDate.getFullYear());

  const categoryData = listCategories.find((cat) => cat._id === categoryId);
  const { data: categoryTransactionData, isLoading } = useCategoryTransactions(token!, categoryId || "", month, year);

  const totalAmount = categoryTransactionData?.totalAmount || 0;
  const transactions = categoryTransactionData?.transactions || [];

  // Get available years
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  // Get months
  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const categoryType = categoryData?.type === "income" ? "income" : "expense";
  const categoryIcon = categoryData?.icon || "💰";
  const categoryName = categoryData?.name || "Category";

  return (
    <div className={`min-h-screen pb-20 ${categoryType === "income" ? "bg-gradient-to-br from-slate-50 to-green-50/30" : "bg-gradient-to-br from-slate-50 to-red-50/30"}`}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <Breadcrumbs className="mb-4">
            <BreadcrumbItem>
              <Link to="/dashboard/categories" className="text-gray-600 hover:text-primary">
                Categories
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <span className={`font-medium ${categoryType === "income" ? "text-green-600" : "text-red-600"}`}>{categoryName} Details</span>
            </BreadcrumbItem>
          </Breadcrumbs>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 bg-gradient-to-br rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg ${categoryType === "income" ? "from-green-500 to-green-600" : "from-red-500 to-red-600"}`}>
                {categoryIcon}
              </div>
              <div>
                <h1 className="text-4xl font-bold font-poppins text-gray-800 mb-1">{categoryName}</h1>
                <p className="text-gray-600">Track your {categoryName.toLowerCase()} transactions</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className={`bg-gradient-to-r border rounded-2xl px-4 py-2 flex items-center gap-2 ${categoryType === "income" ? "from-green-50 to-green-100 border-green-200" : "from-red-50 to-red-100 border-red-200"}`}>
                <FaMoneyBillWave className={categoryType === "income" ? "text-green-600" : "text-red-600"} />
                <span className={`font-semibold ${categoryType === "income" ? "text-green-700" : "text-red-700"}`}>Total: IDR {totalAmount.toLocaleString()}</span>
              </div>
              <Button color="primary" variant="bordered" className="font-semibold hover:bg-primary-50" startContent={<FaArrowLeft className="w-4 h-4" />}>
                <Link to="/dashboard/categories">Back to Categories</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <Card className="mb-8 shadow-md shadow-gray-300 border-0 bg-white/80 backdrop-blur-sm">
          <CardBody className="p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-end">
              <Select label="Select Month" value={month.toString()} onChange={(e) => setMonth(parseInt(e.target.value))} className="flex-1" size="sm">
                {months.map((m) => (
                  <SelectItem key={m.value} value={m.value.toString()}>
                    {m.label}
                  </SelectItem>
                ))}
              </Select>

              <Select label="Select Year" value={year.toString()} onChange={(e) => setYear(parseInt(e.target.value))} className="flex-1" size="sm">
                {years.map((y) => (
                  <SelectItem key={y} value={y.toString()}>
                    {y}
                  </SelectItem>
                ))}
              </Select>

              <Button
                color="primary"
                size="sm"
                className="font-semibold"
                onClick={() => {
                  const today = new Date();
                  setMonth(today.getMonth() + 1);
                  setYear(today.getFullYear());
                }}
              >
                Reset
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Transactions List Section */}
        <div className="w-full lg:w-[70%]">
          {transactions.length > 0 ? (
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <Card key={transaction._id} className="w-full shadow-md hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:bg-white/90">
                  <CardBody className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      {/* Left Section - Category Icon and Details */}
                      <div className="flex items-start gap-4 flex-1">
                        <div className="flex-shrink-0">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg ${categoryType === "income" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>{categoryIcon}</div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-poppins font-bold text-lg text-gray-800 truncate">{transaction.title}</h3>
                            <Chip size="sm" variant="flat" color={categoryType === "income" ? "success" : "danger"} className="text-xs font-medium">
                              {categoryName}
                            </Chip>
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <FaCalendar className="w-3 h-3" />
                              <span>{new Date(transaction.date || transaction.createdAt).toLocaleDateString()}</span>
                            </div>

                            {transaction.description && (
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <RiChat1Fill className="w-3 h-3" />
                                <span className="truncate">{transaction.description}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right Section - Amount */}
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className={`text-lg font-bold font-poppins ${categoryType === "income" ? "text-green-600" : "text-red-600"}`}>
                            {categoryType === "income" ? "+" : "-"} IDR {transaction.amount.toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-500">{transaction.type}</p>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="w-full shadow-md border-0 bg-white/80 backdrop-blur-sm">
              <CardBody className="p-12 text-center">
                <div className="text-gray-500">
                  <p className="text-lg font-semibold mb-2">No transactions found</p>
                  <p className="text-sm">
                    No {categoryName.toLowerCase()} transactions for {months.find((m) => m.value === month)?.label} {year}
                  </p>
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;
