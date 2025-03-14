import { useMutation, useQuery } from '@tanstack/react-query';
// Imports the useMutation and useQuery hooks from react-query for handling mutations and queries.
import axios from '../utils/AxiosInstansce';
// Imports a custom axios instance for making HTTP requests.
import { useEffect } from 'react';
// Imports the useEffect hook from React for performing side effects in function components.
import { useNavigate, useParams } from 'react-router-dom';
// Imports the useNavigate and useParams hooks from react-router-dom for programmatic navigation and accessing route parameters.
import TodoForm from '../components/TodoForm';
// Imports the TodoForm component for rendering the form to edit a todo.

interface Todo {
  todo: string,
  completed: boolean,
  userId: number
}
// Defines a TypeScript interface for the Todo object, specifying the structure of the todo data.

const TodoEdit = async (data: Todo, id: string | undefined) => {
  return await axios.put(`/todo/${id}`, data);
};
// Defines an asynchronous function TodoEdit that takes a Todo object and an id as input and sends a PUT request to update the todo.

const fetchTodoDat = (id: string | undefined) => {
  return axios.get<Todo>(`/todo/${id}`);
};
// Defines an asynchronous function fetchTodoDat that takes an id as input and sends a GET request to fetch the todo data.

const EditTodo = () => {
  const { id } = useParams();
  // Uses the useParams hook to get the id parameter from the route.

  const getTodoDat = useQuery({
    queryKey: ["TodoDat", id],
    queryFn: () => fetchTodoDat(id)
  });
  // Uses the useQuery hook to fetch the todo data. The queryKey is "TodoDat" and the query function is fetchTodoDat.

  const navigate = useNavigate();
  // Uses the useNavigate hook to get a navigate function for programmatic navigation.

  const editTodoMutation = useMutation({
    mutationFn: (data: Todo) => TodoEdit(data, id)
  });
  // Uses the useMutation hook to create a mutation for editing a todo. The mutation function is TodoEdit.

  useEffect(() => {
    if (editTodoMutation.isSuccess) {
      navigate("/todo", { replace: true });
    }
  }, [editTodoMutation.isSuccess]);
  // Uses the useEffect hook to navigate to the todo page if the mutation is successful.

  return (
    <div className="relative">
      {editTodoMutation.isPending && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center">
          <div className="flex items-center bg-white/90 px-6 py-3 rounded-lg shadow-lg">
            <span className="text-2xl mr-4 text-gray-800">Adding...</span>
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
      <h2 className="text-2xl font-bold mb-6 mt-25 text-center">Edit Todo</h2>
      <TodoForm isEdit={true} mutateFn={editTodoMutation.mutate} defaultInputData={getTodoDat.data?.data} />
    </div>
  );
  // Renders the EditTodo component. If the mutation is pending, it shows a loading overlay. It also renders the TodoForm component, passing the mutate function, isEdit prop, and defaultInputData prop.
}

export default EditTodo;
// Exports the EditTodo component as the default export.