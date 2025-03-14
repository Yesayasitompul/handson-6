import { useMutation } from '@tanstack/react-query';
// Imports the useMutation hook from react-query for handling mutations (e.g., POST requests).
import axios from '../utils/AxiosInstansce';
// Imports a custom axios instance for making HTTP requests.
import { useEffect } from 'react';
// Imports the useEffect hook from React for performing side effects in function components.
import { useNavigate } from 'react-router-dom';
// Imports the useNavigate hook from react-router-dom for programmatic navigation.
import CommentFrom from '../components/CommentForm';
// Imports the CommentForm component for rendering the form to add a comment.

interface Comment {
  body: string,
  postId: number,
  user: {
    id: number
  }
}
// Defines a TypeScript interface for the Comment object, specifying the structure of the comment data.

const CommentAdd = async (data: Comment) => {
  return await axios.post("comments/add", data);
}
// Defines an asynchronous function CommentAdd that takes a Comment object as input and sends a POST request to add the comment.

const AddComment = () => {
  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: CommentAdd
  });
  // Uses the useMutation hook to create a mutation for adding a comment. The mutate function triggers the mutation, and isSuccess and isPending indicate the mutation's status.

  const navigate = useNavigate();
  // Uses the useNavigate hook to get a navigate function for programmatic navigation.

  useEffect(() => {
    if (isSuccess) {
      navigate("/comments", { replace: true });
    }
  }, [isSuccess]);
  // Uses the useEffect hook to navigate to the comments page if the mutation is successful.

  return (
    <div className="relative">
      {isPending && (
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
      <h2 className="text-2xl font-bold mb-6 mt-32 text-center">Add Comment</h2>
      <CommentFrom isEdit={false} mutateFn={mutate} />
    </div>
  );
  // Renders the AddComment component. If the mutation is pending, it shows a loading overlay. It also renders the CommentForm component, passing the mutate function and isEdit prop.
}

export default AddComment;
// Exports the AddComment component as the default export.