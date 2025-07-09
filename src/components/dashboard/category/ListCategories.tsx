import { Button, useDisclosure, Card, CardBody, Chip } from "@nextui-org/react";
import AddCategory from "./AddCategory";
import { Link } from "react-router-dom";
import { colors, colors2 } from "../../../data/colors";
import { truncateText } from "../../../data/functionTruncate";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useCategories } from "../../../hooks/useTransactions";
import { FaPlus, FaArrowUp, FaArrowDown, FaWallet, FaMoneyBillWave } from "react-icons/fa6";

const ListCategories = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const { data: ListCategories = [] } = useCategories(token!);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const incomeCategories = ListCategories.filter((category) => category.type === "income");
  const expenseCategories = ListCategories.filter((category) => category.type === "expense");

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-blue-50/30 p-4">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold font-poppins text-gray-800 mb-2">Categories</h1>
            <p className="text-gray-600">Organize your transactions by category</p>
          </div>
          <Button
            color="primary"
            onPress={onOpen}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 font-semibold"
            startContent={<FaPlus className="w-4 h-4" />}
          >
            Add Category
          </Button>
        </div>

        <AddCategory token={token} isOpen={isOpen} onOpenChange={onOpenChange} />

        {/* Income Categories Section */}
        <div className="mb-12">
          <Card className="shadow-md shadow-gray-300 border-0 bg-white/80 backdrop-blur-sm mb-6">
            <CardBody className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                  <FaArrowUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-poppins font-bold text-2xl text-gray-800">Income Categories</h2>
                  <p className="text-sm text-gray-600">Money coming in</p>
                </div>
                <Chip size="sm" variant="flat" color="success" className="ml-auto">
                  {incomeCategories.length} categories
                </Chip>
              </div>

              {incomeCategories.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                  {incomeCategories.map((category, index) => {
                    const backgroundColor: string = colors2[index % colors.length];

                    return (
                      <Link to={`/dashboard/incomes/${category.name}`} key={category._id} className="group">
                        <Card className={`h-24 shadow-none transition-all duration-300 hover:scale-105 ${backgroundColor}`}>
                          <CardBody className="p-3 flex flex-col items-center justify-center text-center">
                            <div className="text-2xl mb-1 group-hover:scale-110 transition-transform duration-200">{category.icon}</div>
                            <p className="text-xs font-medium text-emerald-700 leading-tight">{truncateText(category.name, 9)}</p>
                          </CardBody>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FaMoneyBillWave className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No income categories yet</p>
                </div>
              )}
            </CardBody>
          </Card>
        </div>

        {/* Expense Categories Section */}
        <div className="mb-8">
          <Card className="shadow-md shadow-gray-300 border-0 bg-white/80 backdrop-blur-sm">
            <CardBody className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center">
                  <FaArrowDown className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-poppins font-bold text-2xl text-gray-800">Expense Categories</h2>
                  <p className="text-sm text-gray-600">Money going out</p>
                </div>
                <Chip size="sm" variant="flat" color="danger" className="ml-auto">
                  {expenseCategories.length} categories
                </Chip>
              </div>

              {expenseCategories.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                  {expenseCategories.map((category, index) => {
                    const backgroundColor: string = colors2[index % colors.length];

                    return (
                      <Link to={`/dashboard/expenses/${category.name}`} key={category._id} className="group">
                        <Card className={`h-24 shadow-none transition-all duration-300 ${backgroundColor} hover:scale-105 `}>
                          <CardBody className="p-3 flex flex-col items-center justify-center text-center">
                            <div className="text-2xl mb-1 group-hover:scale-110 transition-transform duration-200">{category.icon}</div>
                            <p className="text-xs font-medium text-red-700 leading-tight">{truncateText(category.name, 9)}</p>
                          </CardBody>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FaWallet className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No expense categories yet</p>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ListCategories;
