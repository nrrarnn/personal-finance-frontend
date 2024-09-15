import { useForm, SubmitHandler, Controller } from "react-hook-form";
import api from "../../../api/api";
import withAuth from "../../../hoc/withAuth";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";

interface AddExpenseProps {
  token: string | null;
}

interface ExpenseFormInput {
  title: string;
  amount: number;
  category: string;
  description: string;
}

interface Category {
  _id: string;
  name: string;
}

const AddExpense: React.FC<AddExpenseProps> = ({ token }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  const { handleSubmit, control, formState: { errors }, reset } = useForm<ExpenseFormInput>({
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

  const onSubmit: SubmitHandler<ExpenseFormInput> = async (data) => {
    try {
      const response = await api.post('/expense', data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("Income added successfully:", response.data);
      
      reset();
    } catch (error) {
      console.error("Error adding income:", error);
    }
  };

  useEffect(() => {
    getCategories()
  },[])

  return (
    <div>
      <h1>Add Expense</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
              onChange={(e) => field.onChange(Number(e.target.value))} //
            />
          )}
        />

        <Controller
          name="category"
          control={control}
          rules={{ required: "Category is required" }}
          render={({ field, fieldState }) => (
            <Select
              {...field}
              label="Category"
              placeholder="Select a category"
              className="max-w-xs"
              aria-label="Category"
              items={categories}
            >
              {(category) => <SelectItem key={category.name} value={category.name}>{category.name}</SelectItem>}
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
            />
          )}
        />

        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
};

export default withAuth(AddExpense);
