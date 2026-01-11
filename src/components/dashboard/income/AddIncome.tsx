import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button, Input, Select, SelectItem, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { SetStateAction, useEffect, useState, Dispatch } from "react";
import { FaPlus } from "react-icons/fa6";
import { useCategories } from "../../../hooks/useTransactions";
import api from "../../../api/api";
import { toast } from "react-toastify";
import { TransactionResponse } from "../../../types/types";
import { useQueryClient } from "@tanstack/react-query";


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
  const queryClient = useQueryClient();

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
      const payload = { ...data, type: "income" };
      if (editingTransaction) {
        const response = await api.put(`/transactions/${editingTransaction?._id}`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          queryClient.invalidateQueries({ queryKey: ["transactions", "income"] });
          toast.success("Income updated successfully");
          reset();
          setEditingTransaction(null);
        } else {
          toast.error("Failed to update income:");
        }
      } else {
        const response = await api.post("/transactions", payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          queryClient.invalidateQueries({ queryKey: ["transactions", "income"] });
          toast.success("Income added successfully");
        } else {
          toast.error("Failed to add income:");
        }
        reset();
        setEditingTransaction(null);
      }
    } catch (error) {
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
        category: editingTransaction.category._id || "",
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
    <div className="w-full max-w-sm">
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="flex flex-col items-start px-6 pt-6 pb-2">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">{editingTransaction ? "Edit Income" : "Add New Income"}</h2>
          <p className="text-gray-600 text-sm">{editingTransaction ? "Update your income details" : "Track your spending effectively"}</p>
        </CardHeader>
        <Divider className="opacity-20" />
        <CardBody className="px-6 pt-4 pb-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Controller
              name="title"
              control={control}
              rules={{ required: "Title is required" }}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  type="text"
                  label="Income Title"
                  placeholder="e.g., Salary, Freelance"
                  variant="bordered"
                  color="primary"
                  size="lg"
                  classNames={{
                    input: "text-gray-700",
                    label: "text-gray-600 font-medium",
                    inputWrapper: "border-gray-200 hover:border-red-400 focus-within:border-red-500 bg-white/50",
                  }}
                  isInvalid={Boolean(fieldState.error)}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="amount"
              control={control}
              rules={{ required: "Amount is required", min: { value: 1, message: "Amount must be positive" } }}
              render={({ field, fieldState }) => (
                <Input
                  {...field}
                  type="number"
                  label="Amount"
                  placeholder="0.00"
                  variant="bordered"
                  color="primary"
                  size="lg"
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-gray-500 font-medium">IDR</span>
                    </div>
                  }
                  classNames={{
                    input: "text-gray-700 font-medium",
                    label: "text-gray-600 font-medium",
                    inputWrapper: "border-gray-200 hover:border-primary-400 focus-within:border-primary-500 bg-white/50",
                  }}
                  isInvalid={Boolean(fieldState.error)}
                  errorMessage={fieldState.error?.message}
                  value={field.value.toString()}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              )}
            />

            <Controller
              name="category"
              control={control}
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Category"
                  placeholder="Choose income category"
                  aria-label="Category"
                  variant="bordered"
                  color="primary"
                  size="lg"
                  items={incomeCategories}
                  classNames={{
                    label: "text-gray-600 font-medium",
                    trigger: "border-gray-200 hover:border-primary-400 focus:border-primary-500 bg-white/50",
                    value: "text-gray-700",
                  }}
                  onChange={(selectedValue) => field.onChange(selectedValue)}
                  value={field.value}
                >
                  {(category) => (
                    <SelectItem key={category._id} value={category._id}>
                      {category.name}
                    </SelectItem>
                  )}
                </Select>
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Description"
                  placeholder="Additional notes about this income"
                  variant="bordered"
                  color="primary"
                  size="lg"
                  classNames={{
                    input: "text-gray-700",
                    label: "text-gray-600 font-medium",
                    inputWrapper: "border-gray-200 hover:border-primary-400 focus-within:border-primary-500 bg-white/50",
                  }}
                />
              )}
            />

            <div className="pt-2">
              <Button
                type="submit"
                color="primary"
                size="lg"
                disabled={isSubmitting}
                className="w-full font-semibold bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                {
                  isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <FaPlus className="animate-spin mr-2" />
                      Processing...
                    </span>
                  ) : (
                    editingTransaction ? "Update Income" : "Add Income"
                  )
                }
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddIncome;
