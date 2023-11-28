import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "./useToast";
import { supabaseUpload } from "@/utils/supabase-image-upload";

const useAddProductImage = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { toast } = useToast();

  const addProductImageHandler = async (data) => {
    const productId = data.productId;
    const url = new URL(
      `/api/products/${productId}/images`,
      process.env.NEXT_PUBLIC_LOCATION_ORIGIN
    );

    const imageUrl = await supabaseUpload(data.image, "product_image");
    const newData = {
      url: `${process.env.NEXT_PUBLIC_SUPABASE_BUCKET_URL}/product_image/${imageUrl}`,
      description: data.description,
    };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
    const result = await res.json();

    if (result.error) throw new Error(result.error.message);

    return result;
  };

  return useMutation({
    mutationKey: ["products"],
    mutationFn: (data) => addProductImageHandler(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["products"]);
      router.refresh();
      toast({
        title: `New product image added.`,
        description: "A new product image was created successfully!",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error!",
        description: `${error.message}`,
      });
    },
  });
};

export default useAddProductImage;
