import { useMutation, useQuery } from "@tanstack/react-query";
// Imports the useMutation and useQuery hooks from react-query for handling mutations and queries.
import { useEffect } from "react";
// Imports the useEffect hook from React for performing side effects in function components.
import { useNavigate, useParams } from "react-router-dom";
// Imports the useNavigate and useParams hooks from react-router-dom for programmatic navigation and accessing route parameters.
import axios from "../utils/AxiosInstansce";
// Imports a custom axios instance for making HTTP requests.
import RecipeForm, { Recipe } from "../components/RecipesForm";
// Imports the RecipeForm component and the Recipe type from the components directory.
import { fetchRecipeDetail } from "./RecipesDetail";
// Imports the fetchRecipeDetail function from the RecipesDetail module.

const editRecipe = async (data: Recipe, id: string | undefined) => {
  return await axios.put(`/recipes/${id}`, data);
};
// Defines an asynchronous function editRecipe that takes a Recipe object and an id as input and sends a PUT request to update the recipe.

const EditRecipes = () => {
  const { id } = useParams();
  // Uses the useParams hook to get the id parameter from the route.

  const editRecipeMutation = useMutation({
    mutationFn: (data: Recipe) => editRecipe(data, id)
  });
  // Uses the useMutation hook to create a mutation for editing a recipe. The mutation function is editRecipe.

  const getRecipeDetail = useQuery({
    queryKey: ["recipeDetail", id],
    queryFn: () => fetchRecipeDetail(id)
  });
  // Uses the useQuery hook to fetch the recipe details. The queryKey is "recipeDetail" and the query function is fetchRecipeDetail.

  const navigate = useNavigate();
  // Uses the useNavigate hook to get a navigate function for programmatic navigation.

  useEffect(() => {
    if (editRecipeMutation.isSuccess) {
      navigate("/recipes", { replace: true });
    }
  }, [editRecipeMutation.isSuccess]);
  // Uses the useEffect hook to navigate to the recipes page if the mutation is successful.

  return (
    <div className="relative">
      {(editRecipeMutation.isPending || getRecipeDetail.isFetching) && (
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
      <h2 className="text-2xl font-bold mb-6 mt-10 text-center">Edit Recipe</h2>
      <RecipeForm
        isEdit={true}
        mutateFn={editRecipeMutation.mutate}
        defaultInputData={getRecipeDetail.data?.data}
      />
    </div>
  );
  // Renders the EditRecipes component. If the mutation is pending or the recipe details are being fetched, it shows a loading overlay. It also renders the RecipeForm component, passing the mutate function, isEdit prop, and defaultInputData prop.
}

export default EditRecipes;
// Exports the EditRecipes component as the default export.