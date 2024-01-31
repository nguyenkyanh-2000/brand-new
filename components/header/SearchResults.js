import useQueryProducts from "@/hooks/useQueryProducts";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useDebounce } from "use-debounce";

function SearchResults({ searchTerm, setIsDialogOpen }) {
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const { data, isPending } = useQueryProducts({ search: debouncedSearchTerm });
  const router = useRouter();

  if (isPending)
    return (
      <div className="mt-2 flex max-h-96 items-center justify-center overflow-y-auto rounded-2xl border bg-background p-4 shadow-md">
        <Loader2 className="h-20 w-20 animate-spin rounded-full"></Loader2>
      </div>
    );

  if (data.products.length === 0)
    return (
      <div className="mt-2 flex max-h-96 items-center justify-center overflow-y-auto rounded-2xl border bg-background p-4 shadow-md">
        <div className="flex justify-center">{`No results for "${searchTerm}"`}</div>
      </div>
    );

  return (
    <div className="mt-2 max-h-96 overflow-y-auto rounded-2xl border bg-background p-4 shadow-md">
      {data.products.map((product) => (
        <div
          key={product.id}
          onClick={() => {
            router.push(`/products/${product.id}`);
            setIsDialogOpen(false);
          }}
          className="flex items-center justify-between gap-3 rounded-md px-2 hover:cursor-pointer hover:bg-muted"
        >
          <div className="text-lg">{product.name}</div>
          <div className="text-sm">
            {product.category.charAt(0).toUpperCase() +
              product.category.slice(1)}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
