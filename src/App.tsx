import { QueryClient, QueryClientProvider } from "@tanstack/react-query" 
// Imports QueryClient and QueryClientProvider from react-query for managing server state and caching.
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"; 
// Imports functions and components from react-router-dom for client-side routing.
import RootLayout from "./layouts/RootLayout";
// Imports the RootLayout component which serves as the base layout for the app.
import Post from "./pages/Post";
// Imports the Post component for the posts page.
import Product from "./pages/Product";
// Imports the Product component for the products page.
import Recipes from "./pages/Recipes";
// Imports the Recipes component for the recipes page.
import ProductDetail from "./pages/ProductDetail";
// Imports the ProductDetail component for displaying details of a specific product.
import Home from "./pages/Home";
// Imports the Home component for the home page.
import AddProduct from "../src/pages/AddProduct";
// Imports the AddProduct component for adding a new product.
import EditProduct from "./pages/EditProduct";
// Imports the EditProduct component for editing an existing product.
import RecipesDetail from "./pages/RecipesDetail";
// Imports the RecipesDetail component for displaying details of a specific recipe.
import EditRecipes from "./pages/EditRecipes";
// Imports the EditRecipes component for editing an existing recipe.
import AddRecipes from "./pages/AddRecipes";
// Imports the AddRecipes component for adding a new recipe.
import PostAdd from "./pages/PostAdd";
// Imports the PostAdd component for adding a new post.
import PostEdit from "./pages/PostEdit";
// Imports the PostEdit component for editing an existing post.
import Todo from "./pages/Todo";
// Imports the Todo component for the todo page.
import Comments from "./pages/Comments";
// Imports the Comments component for the comments page.
import AddTodo from "./pages/AddTodo";
// Imports the AddTodo component for adding a new todo.
import EditTodo from "./pages/EditTodo";
// Imports the EditTodo component for editing an existing todo.
import AddComment from "./pages/AddComment";
// Imports the AddComment component for adding a new comment.
import EditComment from "./pages/EditComment";
// Imports the EditComment component for editing an existing comment.

const queryClient = new QueryClient()
// Creates an instance of QueryClient, which is required to use React Query for managing API calls efficiently.

function App() {
    const router = createBrowserRouter(createRoutesFromElements(
        // Creates a router using createBrowserRouter and createRoutesFromElements functions.
        <Route path="/" element={<RootLayout />}>
            // Defines the root route with RootLayout as the base layout.
            <Route index element={<Home/>} />
            // Defines the index route (home page) with Home component.
            <Route path="product" element={<Product />} />
            // Defines the route for products page with Product component.
            <Route path="product/add" element={<AddProduct />} />
            // Defines the route for adding a new product with AddProduct component.
            <Route path="product/:id" element={<ProductDetail/>}/>
            // Defines the route for product details page with ProductDetail component.
            <Route path="product/:id/edit" element={<EditProduct/>}/>
            // Defines the route for editing a product with EditProduct component.
            <Route path="recipes/:id/edit" element={<EditRecipes/>}/>
            // Defines the route for editing a recipe with EditRecipes component.
            <Route path="recipes" element={<Recipes />} />
            // Defines the route for recipes page with Recipes component.
            <Route path="recipes/add" element={<AddRecipes />} />
            // Defines the route for adding a new recipe with AddRecipes component.
            <Route path="product/add" element={<AddProduct />} />
            // Defines the route for adding a new product with AddProduct component (duplicate route).
            <Route path="recipes/:id" element={<RecipesDetail />} />
            // Defines the route for recipe details page with RecipesDetail component.
            <Route path="/todo" element={<Todo/>}/>
            // Defines the route for todo page with Todo component.
            <Route path="/todo/add" element={<AddTodo/>}/>
            // Defines the route for adding a new todo with AddTodo component.
            <Route path="posts" element={<Post />} />
            // Defines the route for posts page with Post component.
            <Route path="posts/add" element={<PostAdd />} />
            // Defines the route for adding a new post with PostAdd component.
            <Route path="posts/:id/edit" element={<PostEdit />} />
            // Defines the route for editing a post with PostEdit component.
            <Route path="/comments" element={<Comments/>}/>
            // Defines the route for comments page with Comments component.
            <Route path="/todo/:id/edit" element={<EditTodo/>}/>
            // Defines the route for editing a todo with EditTodo component.
            <Route path="comments/add"element={<AddComment/>} />
            // Defines the route for adding a new comment with AddComment component.
            <Route path="comments/:id/edit" element={<EditComment/>}/>
            // Defines the route for editing a comment with EditComment component.
        </Route>
    ));
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </>
    )
}

export default App
// Exports the App component as the default export.