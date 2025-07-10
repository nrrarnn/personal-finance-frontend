import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem} from "@nextui-org/react"
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import api from "../../../api/api";

interface AddCategoryProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void; 
  token: string | null; 
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
const AddCategory: React.FC<AddCategoryProps> = ({isOpen, onOpenChange, token}) => {
  const { register, handleSubmit, reset } = useForm<CategoryFormInput>();
  const typeOptions: TypeSelect[] = [
    { value: "expense", label: "Expense" },
    { value: "income", label: "Income" }
  ];

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<CategoryFormInput> = async (data) => {
    setLoading(true);
    try {
      await api.post(
        "/category", 
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      onOpenChange(false); 
      reset();
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Failed to add category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Create Your Category</ModalHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>
                  <Input
                  type="text"
                  placeholder="Category Name"
                  {...register("name", { required: "Category name is required" })}
                />
                <Input
                  type="text"
                  placeholder="Icon"
                  {...register("icon", { required: "Icon is required" })}
                />
                <Select
                  placeholder="Select type"
                  {...register("type", { required: "Category type is required" })}
                >
                  {typeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose} >
                  Close
                </Button>
                <Button color="primary" onPress={onClose} type="submit">
                  {loading ? "Creating..." : "Create"}
                </Button>
              </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
  )
}

export default AddCategory