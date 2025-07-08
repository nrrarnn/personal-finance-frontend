import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button, Input, Select, SelectItem, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { SetStateAction, useEffect, useState, Dispatch } from "react";
import { FaPlus, FaDollarSign, FaTag, FaFile } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { useCategories } from "../../../hooks/useTransactions";
import api from "../../../api/api";
import { toast } from "react-toastify";
import { TransactionResponse } from "../../../types/types";


interface TransactionFormInput {
  title: string;
  amount: number;
  category: string;
  description: string;
}

interface AddIncomeProps {
  token: string | null;
  editingTransaction: TransactionResponse | null;
  setEditingTransaction: Dispatch<SetStateAction<TransactionResponse | null>>;
}

const AddIncome: React.FC<AddIncomeProps> = ({ editingTransaction, setEditingTransaction, token }) => {
  const {data: categories = []} = useCategories(token || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    handleSubmit,
    control,
    reset,
  } = useForm<TransactionFormInput>({
    defaultValues: {
      title: "",
      amount: 0,
      category: "",
      description: "",
    },
  });

  const onSubmit: SubmitHandler<TransactionFormInput> = async (data) => {
    setIsSubmitting(true);
    try {
      if(editingTransaction){
      const response = await api.put(`/income/${editingTransaction?._id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        toast.success("Income updated successfully");
      } else {
        toast.error("Failed to update income:");
      } 
    }else {
      const response = await api.post("/income", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Response:", response);
      if (response.status === 200) {
        toast.success("Income added successfully");
      } else {
        toast.error("Failed to add income:");
      }
      reset();
      setEditingTransaction(null);
    }} catch (error) {
      console.error("Error processing income:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const incomeCategories = categories.filter((category) => category.type === "income");

  useEffect(() => {
    if (editingTransaction) {
      reset({
        title: editingTransaction.title || "",
        amount: editingTransaction.amount || 0,
        category: editingTransaction.category || "",
        description: editingTransaction.description || "",
      });
    } else {
      reset({
        title: "",
        amount: 0,
        category: "",
        description: "",
      });
    }
  }, [editingTransaction, reset]);

  return (
    <div className="w-full max-w-sm mx-auto">
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">{editingTransaction ? <MdEdit className="h-5 w-5 text-white" /> : <FaPlus className="h-5 w-5 text-white" />}</div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{editingTransaction ? "Update Income" : "Add New Income"}</h2>
              <p className="text-sm text-gray-500">{editingTransaction ? "Modify your income entry" : "Track your earnings"}</p>
            </div>
          </div>
        </CardHeader>

        <Divider />

        <CardBody className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Controller
              name="title"
              control={control}
              rules={{ required: "Title is required" }}
              render={({ field, fieldState }) => (
                <div className="space-y-2">
                  <Input
                    {...field}
                    type="text"
                    label="Income Title"
                    placeholder="e.g., Monthly Salary"
                    isInvalid={Boolean(fieldState.error)}
                    errorMessage={fieldState.error?.message}
                    classNames={{
                      input: "text-gray-700",
                      label: "text-gray-600 font-medium",
                    }}
                    startContent={<FaFile className="h-4 w-4 text-gray-400" />}
                    variant="bordered"
                  />
                </div>
              )}
            />

            <Controller
              name="amount"
              control={control}
              rules={{
                required: "Amount is required",
                min: { value: 0.01, message: "Amount must be positive" },
              }}
              render={({ field, fieldState }) => (
                <div className="space-y-2">
                  <Input
                    {...field}
                    type="number"
                    label="Amount"
                    placeholder="0.00"
                    isInvalid={Boolean(fieldState.error)}
                    errorMessage={fieldState.error?.message}
                    value={field.value.toString()}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    classNames={{
                      input: "text-gray-700 text-lg font-medium",
                      label: "text-gray-600 font-medium",
                    }}
                    startContent={<FaDollarSign className="h-4 w-4 text-green-500" />}
                    variant="bordered"
                  />
                </div>
              )}
            />

            <Controller
              name="category"
              control={control}
              rules={{ required: "Category is required" }}
              render={({ field, fieldState }) => (
                <div className="space-y-2">
                  <Select
                    {...field}
                    label="Category"
                    placeholder="Choose income category"
                    aria-label="Income Category"
                    isInvalid={Boolean(fieldState.error)}
                    errorMessage={fieldState.error?.message}
                    classNames={{
                      label: "text-gray-600 font-medium",
                      trigger: "border-gray-200 hover:border-gray-300",
                    }}
                    startContent={<FaTag className="h-4 w-4 text-gray-400" />}
                    variant="bordered"
                    value={field.value}
                    onChange={(selectedValue) => field.onChange(selectedValue)}
                  >
                    {incomeCategories.map((category) => (
                      <SelectItem key={category.name} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <Input
                    {...field}
                    type="text"
                    label="Description (Optional)"
                    placeholder="Add notes about this income"
                    classNames={{
                      input: "text-gray-700",
                      label: "text-gray-600 font-medium",
                    }}
                    variant="bordered"
                  />
                </div>
              )}
            />

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                size="lg"
                isLoading={isSubmitting}
                startContent={!isSubmitting && (editingTransaction ? <MdEdit className="h-4 w-4" /> : <FaPlus className="h-4 w-4" />)}
              >
                {isSubmitting ? "Processing..." : editingTransaction ? "Update Income" : "Add Income"}
              </Button>
            </div>

            {editingTransaction && (
              <Button
                type="button"
                variant="light"
                className="w-full text-gray-500 hover:text-gray-700"
                onPress={() => {
                  setEditingTransaction(null);
                  reset();
                }}
              >
                Cancel Edit
              </Button>
            )}
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddIncome;
