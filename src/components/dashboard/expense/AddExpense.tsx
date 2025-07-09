import { useForm, SubmitHandler, Controller } from "react-hook-form";
import api from "../../../api/api";
import { Button, Input, Select, SelectItem, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { TransactionFormInput, TransactionResponse } from "../../../types/types";
import { useCategories } from "../../../hooks/useTransactions";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

export interface AddExpenseProps {
  token: string | null;
  editingExpense: TransactionResponse | null;
  setEditingExpense: (expense: TransactionResponse | null) => void;
}

const AddExpense: React.FC<AddExpenseProps> = ({ token, editingExpense, setEditingExpense }) => {
  const { data: categories = [] } = useCategories(token!);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { handleSubmit, control, reset } = useForm<TransactionFormInput>({
    defaultValues: {
      title: "",
      amount: 0,
      category: "",
      description: "",
    },
  });
  const queryClient = useQueryClient();

  const onSubmit: SubmitHandler<TransactionFormInput> = async (data) => {
    setIsSubmitting(true);
    try {
      if (editingExpense) {
        await api.put(`/expense/${editingExpense._id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        queryClient.invalidateQueries({ queryKey: ["expenses"] });
        toast.success("Expense updated successfully");
        reset();
        setEditingExpense(null);
      } else {
        await api.post("/expense", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        queryClient.invalidateQueries({ queryKey: ["expenses"] });
        toast.success("Expense added successfully");
      }
      reset();
      setEditingExpense(null);
    } catch (error) {
      console.error("Error adding Expense:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const expenseCategories = categories.filter((category) => category.type === "expense");

  useEffect(() => {
    if (editingExpense) {
      reset({
        title: editingExpense.title || "",
        amount: editingExpense.amount || 0,
        category: editingExpense.category || "",
        description: editingExpense.description || "",
      });
    } else {
      reset({
        title: "",
        amount: 0,
        category: "",
        description: "",
      });
    }
  }, [editingExpense, reset]);

  return (
    <div className="w-full max-w-sm">
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="flex flex-col items-start px-6 pt-6 pb-2">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">{editingExpense ? "Edit Expense" : "Add New Expense"}</h2>
          <p className="text-gray-600 text-sm">{editingExpense ? "Update your expense details" : "Track your spending effectively"}</p>
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
                  label="Expense Title"
                  placeholder="e.g., Coffee, Gas, Groceries"
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
                  placeholder="Choose expense category"
                  aria-label="Category"
                  variant="bordered"
                  color="primary"
                  size="lg"
                  items={expenseCategories}
                  classNames={{
                    label: "text-gray-600 font-medium",
                    trigger: "border-gray-200 hover:border-primary-400 focus:border-primary-500 bg-white/50",
                    value: "text-gray-700",
                  }}
                  onChange={(selectedValue) => field.onChange(selectedValue)}
                  value={field.value || ""}
                >
                  {(category) => (
                    <SelectItem key={category.name} value={category.name}>
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
                  label="Description (Optional)"
                  placeholder="Additional notes about this expense"
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
                disabled={isSubmitting}
                size="lg"
                className="w-full font-semibold bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                {isSubmitting ? "Submitting..." : editingExpense ? "Update Expense" : "Add Expense"}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddExpense;
