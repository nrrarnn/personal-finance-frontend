import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input} from "@nextui-org/react"
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
}
const AddCategory: React.FC<AddCategoryProps> = ({isOpen, onOpenChange, token}) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<CategoryFormInput>();

  const [loading, setLoading] = useState<boolean>(false); // State untuk loading

  // Fungsi submit form
  const onSubmit: SubmitHandler<CategoryFormInput> = async (data) => {
    try {
      setLoading(true);
      // Mengirim data ke backend
      const response = await api.post(
        "/category", // Endpoint di backend
        data, // Data dari form (berisi nama kategori)
        {
          headers: {
            Authorization: `Bearer ${token}`, // Menggunakan token untuk autentikasi
          },
        }
      );
      console.log("Category added:", response.data);
      onOpenChange(false); // Menutup modal setelah sukses
      reset(); // Mereset form setelah sukses
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
                  placeholder="Category"
                  {...register("name", { required: "Category name is required" })}
                  /> 
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