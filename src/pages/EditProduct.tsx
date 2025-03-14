import { useMutation, useQuery } from "@tanstack/react-query";
// Imports the useMutation and useQuery hooks from react-query for handling mutations and queries.
import { useEffect } from "react";
// Imports the useEffect hook from React for performing side effects in function components.
import { useNavigate, useParams } from "react-router-dom";
// Imports the useNavigate and useParams hooks from react-router-dom for programmatic navigation and accessing route parameters.
import ProductForm, { ProductFormInput } from "../components/ProductForm";
// Imports the ProductForm component and the ProductFormInput type from the components directory.
import axios from "../utils/AxiosInstansce";
// Imports a custom axios instance for making HTTP requests.
import { fetchProductDetail } from "./ProductDetail";
// Imports the fetchProductDetail function from the ProductDetail module.

const editProduct = async (data: ProductFormInput, id: string | undefined) => {
  return await axios.put(`/products/${id}`, data);
};
// Defines an asynchronous function editProduct that takes a ProductFormInput object and an id as input and sends a PUT request to update the product.

const EditProduct = () => {
  const { id } = useParams();
  // Uses the useParams hook to get the id parameter from the route.

  const editProductMutation = useMutation({
    mutationFn: (data: ProductFormInput) => editProduct(data, id)
  });
  // Uses the useMutation hook to create a mutation for editing a product. The mutation function is editProduct.

  const getProductDetail = useQuery({
    queryKey: ["productDetail", id],
    queryFn: () => fetchProductDetail(id)
  });
  // Uses the useQuery hook to fetch the product details. The queryKey is "productDetail" and the query function is fetchProductDetail.

  const navigate = useNavigate();
  // Uses the useNavigate hook to get a navigate function for programmatic navigation.

  useEffect(() => {
    if (editProductMutation.isSuccess) {
      navigate("/product", { replace: true });
    }
  }, [editProductMutation.isSuccess]);
  // Uses the useEffect hook to navigate to the product page if the mutation is successful.

  return (
    <div className="relative">
      {(editProductMutation.isPending || getProductDetail.isFetching) && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="flex items-center bg-white/90 px-6 py-3 rounded-lg shadow-lg">
            <span className="text-2xl mr-4 text-gray-800">Loading...</span>
            <svg
              className="animate-spin h-5 w-5 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        </div>
      )}
      <h2 className="text-2xl font-bold mb-6 mt-10">Edit Product</h2>
      <ProductForm
        isEdit={true}
        mutateFn={editProductMutation.mutate}
        defaultInputData={getProductDetail.data?.data}
      />
    </div>
  );
  // Renders the EditProduct component. If the mutation is pending or the product details are being fetched, it shows a loading overlay. It also renders the ProductForm component, passing the mutate function, isEdit prop, and defaultInputData prop.
};

export default EditProduct;
// Exports the EditProduct component as the default export.