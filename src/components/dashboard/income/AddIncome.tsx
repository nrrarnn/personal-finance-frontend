import { useForm, SubmitHandler, Controller } from "react-hook-form";
import api from "../../../api/api";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Category,  TransactionFormInput, TransactionResponse } from "../../../types/types";

interface AddIncomeProps {
  token: string | null;
  editingTransaction: TransactionResponse | null; 
  setEditingTransaction: (transaction: TransactionResponse | null) => void; 
}

const AddIncome: React.FC<AddIncomeProps> = ({ editingTransaction, setEditingTransaction, token}) => {
  const [categories, setCategories] = useState<Category[]>([]);

  const { handleSubmit, control, reset } = useForm<TransactionFormInput>({
    defaultValues: {
      title: "",
      amount: 0,
      category: "", 
      description: "",
    },
  });

  const getCategories = async () => {
    try {
      const response = await api.get<Category[]>('/categories', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const onSubmit: SubmitHandler<TransactionFormInput> = async (data) => {
    try {
      if (editingTransaction) {
        const response = await api.put(`/income/${editingTransaction._id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log("Income updated successfully:", response.data);
      } else {
        const response = await api.post('/income', data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log("Income added successfully:", response.data);
      }

      reset();  
      setEditingTransaction(null); 
    } catch (error) {
      console.error("Error adding income:", error);
    }
  };

  const incomeCategories = categories.filter(category => category.type === "income");

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (editingTransaction) {
      reset({
        title: editingTransaction.title || "",
        amount: editingTransaction.amount || 0,
        category: editingTransaction.category || "", 
        description: editingTransaction.description || "",
      });
    } else {
      console.log("Resetting Form...");
      reset(
        {
          title: "",
          amount: 0,
          category: "",
          description: "",
        }
      );
    }
  }, [editingTransaction, reset]);

  return (
    <div className="w-full md:w-[30%] p-3">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <Controller
          name="title"
          control={control}
          rules={{ required: "Title is required" }}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              type="text"
              label="Title"
              isInvalid={Boolean(fieldState.error)}
              errorMessage={fieldState.error?.message}
              color="primary"
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
              isInvalid={Boolean(fieldState.error)}
              errorMessage={fieldState.error?.message}
              value={field.value.toString()} 
              onChange={(e) => field.onChange(Number(e.target.value))} 
              color="primary"
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
              placeholder="Select a category"
              aria-label="Category"
              color="primary"
              value={field.value} 
              onChange={(selectedValue) => field.onChange(selectedValue)} 
            >
              {incomeCategories.map((category) => (
                <SelectItem key={category.name} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
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
              color="primary"
            />
          )}
        />

        <Button type="submit" color="primary">
          {editingTransaction ? "Update Income" : "+ Add Income"}
        </Button>
      </form>
    </div>
  );
};

export default AddIncome;
