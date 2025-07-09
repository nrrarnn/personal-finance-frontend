import { Link, useParams } from "react-router-dom";
import { Button, Card, CardBody, Chip, Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import { FaCalendar, FaArrowLeft, FaArrowUp, FaMoneyBillWave } from "react-icons/fa6";
import { RiChat1Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useByCategory, useCategories } from "../../../hooks/useTransactions";

const IncomesByCategory = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const { category } = useParams<Record<string, string | undefined>>();
  const transaction: string = "incomes";
  const { data: listIncomes = [] } = useByCategory(token!, transaction, category!);
  const { data: listCategories = [] } = useCategories(token!);

  const categoryData = listCategories.find((cat) => cat.name === category);
  const totalAmount = listIncomes.reduce((sum, income) => sum + income.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50/30 pb-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Breadcrumbs className="mb-4">
            <BreadcrumbItem>
              <Link to="/dashboard/categories" className="text-gray-600 hover:text-emerald-600">
                Categories
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <span className="text-emerald-600 font-medium">{category} Income</span>
            </BreadcrumbItem>
          </Breadcrumbs>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg">{categoryData?.icon || "💰"}</div>
              <div>
                <h1 className="text-4xl font-bold font-poppins text-gray-800 mb-1">{category} Income</h1>
                <p className="text-gray-600">Track your {category?.toLowerCase()} earnings</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200 rounded-2xl px-4 py-2 flex items-center gap-2">
                <FaArrowUp className="text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Total: IDR {totalAmount.toLocaleString()}</span>
              </div>
              <Button color="primary" variant="bordered" className="font-semibold hover:bg-primary-50" startContent={<FaArrowLeft className="w-4 h-4" />}>
                <Link to={"/dashboard/categories"}>Back to Categories</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[70%]">
          {listIncomes.length > 0 ? (
            <div className="space-y-4">
              {listIncomes.map((income) => {
                const category = listCategories.find((cat) => cat.name === income.category);
                return (
                  <Card key={income._id} className="w-full shadow-md hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:bg-white/90">
                    <CardBody className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="flex-shrink-0">
                            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg">{category?.icon || "💰"}</div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-poppins font-bold text-lg text-gray-800 truncate">{income.title}</h3>
                              <Chip size="sm" variant="flat" color="success" className="text-xs font-medium">
                                {income.category}
                              </Chip>
                            </div>

                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <FaCalendar className="w-3 h-3" />
                                <span>{new Date(income.createdAt).toLocaleDateString()}</span>
                              </div>

                              {income.description && (
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <RiChat1Fill className="w-3 h-3" />
                                  <span className="truncate">{income.description}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <div className="text-right">
                            <div className="flex items-center gap-2">
                              <FaArrowUp className="w-4 h-4 text-emerald-600" />
                              <p className="text-2xl font-bold text-emerald-600">+ IDR {income.amount.toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card className="w-full shadow-md border-0 bg-white/80 backdrop-blur-sm">
              <CardBody className="p-12 text-center">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaMoneyBillWave className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No {category?.toLowerCase()} income yet</h3>
                <p className="text-gray-500">Start tracking your {category?.toLowerCase()} earnings by adding your first entry</p>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default IncomesByCategory;
