import { useForm, SubmitHandler, Controller } from "react-hook-form";
import api from "../../../api/api";
import withAuth from "../../../hoc/withAuth";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Category, TokenProps, TransactionFormInput } from "../../../types/types";


const AddExpense: React.FC<TokenProps> = ({ token, editingExpense, setEditingExpense }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  const { handleSubmit, control, formState: { errors }, reset } = useForm<TransactionFormInput>({
    defaultValues: {
      title: "",
      amount: 0,
      category: "",
      description: "",
    },
  });

  const getCategories = async () => {
    try{
      const response = await api.get<Category[]>('/categories', {
      headers: {
        Authorization: `Bearer ${token}`
      }
      })
      setCategories(response.data)
    } catch(error) {
      console.error(error)
    }
  }

  const onSubmit: SubmitHandler<TransactionFormInput> = async (data) => {
    try {
      if (editingExpense) {
        const response = await api.put(`/expense/${editingExpense._id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log("Expense updated successfully:", response.data);
      } else {
        const response = await api.post('/expense', data, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log("Expense added successfully:", response.data);
      }
      reset();
      setEditingExpense(null);
    } catch (error) {
      console.error("Error adding Expense:", error);
    }
  };

  const expenseCategories = categories.filter(category => category.type === "expense");

  useEffect(() => {
    getCategories()
  },[])

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
              color="primary"
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
              color="primary"
              isInvalid={Boolean(fieldState.error)}
              errorMessage={fieldState.error?.message}
              value={field.value.toString()} 
              onChange={(e) => field.onChange(Number(e.target.value))} //
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
              items={expenseCategories}
              onChange={(selectedValue) => field.onChange(selectedValue)} 
              value={field.value} 
            >
              {(category) => 
              <SelectItem key={category.name} value={category.name}>
                {category.name}
              </SelectItem>
              }
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
          {editingExpense ? "Update Expense" : "Add Expense"}
        </Button>
      </form>
    </div>
  );
};

export default withAuth(AddExpense);
