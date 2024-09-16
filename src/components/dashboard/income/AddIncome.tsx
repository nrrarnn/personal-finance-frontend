import { useForm, SubmitHandler, Controller } from "react-hook-form";
import api from "../../../api/api";
import withAuth from "../../../hoc/withAuth";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";

interface AddIncomeProps {
  token: string | null;
}

interface IncomeFormInput {
  title: string;
  amount: number;
  category: string;
  description: string;
}

interface Category {
  _id: string;
  name: string;
  icon: string;
  type: string;
}

const AddIncome: React.FC<AddIncomeProps> = ({ token }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  const { handleSubmit, control, formState: { errors }, reset } = useForm<IncomeFormInput>({
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

  const onSubmit: SubmitHandler<IncomeFormInput> = async (data) => {
    try {
      const response = await api.post('/income', data, {
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

  const incomeCategories = categories.filter(category => category.type === "income");

  useEffect(() => {
    getCategories()
  },[])

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
          render={({ field, fieldState }) => (
            <Select
              {...field}
              label="Category"
              placeholder="Select a category"
              aria-label="Category"
              color="primary"
              items={incomeCategories} 
              onChange={(selectedValue) => field.onChange(selectedValue)} 
              value={field.value} 
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
              label="Description"
              color="primary"
            />
          )}
        />

        <Button type="submit" color="primary">+ Add Income</Button>
      </form>
    </div>
  );
};

export default withAuth(AddIncome);
