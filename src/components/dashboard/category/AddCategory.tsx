import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import api from "../../../api/api";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { Category } from "../../../types/types";

interface AddCategoryProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  token: string | null;
  editingCategory?: Category | null;
  setEditingCategory?: (category: Category | null) => void;
}

interface CategoryFormInput {
  name: string;
  icon: string;
  type: string;
}

interface TypeSelect {
  value: string;
  label: string;
}
const AddCategory: React.FC<AddCategoryProps> = ({ isOpen, onOpenChange, token, editingCategory, setEditingCategory }) => {
  const { control, handleSubmit, reset } = useForm<CategoryFormInput>({
    defaultValues: {
      name: "",
      icon: "",
      type: "expense",
    },
  });
  const typeOptions: TypeSelect[] = [
    { value: "expense", label: "Expense" },
    { value: "income", label: "Income" },
  ];

  const [loading, setLoading] = useState<boolean>(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (editingCategory) {
      reset({
        name: editingCategory.name,
        icon: editingCategory.icon,
        type: editingCategory.type,
      });
    } else {
      reset({
        name: "",
        icon: "",
        type: "expense",
      });
    }
  }, [editingCategory, reset]);

  const onSubmit: SubmitHandler<CategoryFormInput> = async (data) => {
    setLoading(true);
    try {
      if (editingCategory) {
        await api.put(`/category/${editingCategory._id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Category updated successfully");
      } else {
        await api.post("/category", data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("Category created successfully");
      }
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      onOpenChange(false);
      setEditingCategory?.(null);
      reset();
    } catch (error) {
      console.error("Error saving category:", error);
      toast.error(editingCategory ? "Failed to update category" : "Failed to add category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{editingCategory ? "Edit Category" : "Create Your Category"}</ModalHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalBody>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "Category name is required" }}
                  render={({ field }) => <Input {...field} type="text" label="Category Name" placeholder="e.g., Groceries, Salary" variant="bordered" />}
                />
                <Controller name="icon" control={control} rules={{ required: "Icon is required" }} render={({ field }) => <Input {...field} type="text" label="Icon" placeholder="e.g., 🛒, 💰, 🍔" variant="bordered" />} />
                <Controller
                  name="type"
                  control={control}
                  rules={{ required: "Category type is required" }}
                  render={({ field }) => (
                    <Select {...field} label="Type" placeholder="Select type" selectedKeys={[field.value]} onChange={(e) => field.onChange(e.target.value)} items={typeOptions} variant="bordered">
                      {(option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      )}
                    </Select>
                  )}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    onClose();
                    setEditingCategory?.(null);
                  }}
                >
                  Close
                </Button>
                <Button color="primary" type="submit" disabled={loading}>
                  {loading ? (editingCategory ? "Updating..." : "Creating...") : editingCategory ? "Update" : "Create"}
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddCategory;
