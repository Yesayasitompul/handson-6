import { useMutation } from '@tanstack/react-query';
// Imports the useMutation hook from react-query for handling mutations.
import axios from '../utils/AxiosInstansce';
// Imports a custom axios instance for making HTTP requests.
import { useEffect } from 'react';
// Imports the useEffect hook from React for performing side effects in function components.
import { useNavigate } from 'react-router-dom';
// Imports the useNavigate hook from react-router-dom for programmatic navigation.
import PostForm from '../components/PostForm';
// Imports the PostForm component for rendering the form to add a post.

interface postDat {
  title: string;
  body: string;
  tags: string[];
  reactions: reactionType;
  views: number;
  userId: number;
}
// Defines a TypeScript interface for the postDat object, specifying the structure of the post data.

interface reactionType {
  likes: number;
  dislikes: number;
}
// Defines a TypeScript interface for the reactionType object, specifying the structure of the reactions data.

const addPost = async (data: postDat) => {
  return await axios.post("/posts/add", data);
};
// Defines an asynchronous function addPost that takes a postDat object as input and sends a POST request to add a new post.

const PostAdd = () => {
  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: addPost
  });
  // Uses the useMutation hook to create a mutation for adding a post. The mutation function is addPost.

  const navigate = useNavigate();
  // Uses the useNavigate hook to get a navigate function for programmatic navigation.

  useEffect(() => {
    console.log("test");
    if (isSuccess) {
      navigate("/posts", { replace: true });
    }
  }, [isSuccess]);
  // Uses the useEffect hook to navigate to the posts page if the mutation is successful.

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
      <h2 className="text-2xl font-bold mb-6 mt-10 text-center">Add Post</h2>
      <PostForm isEdit={false} mutateFn={mutate} />
    </div>
  );
  // Renders the PostAdd component. If the mutation is pending, it shows a loading overlay. It also renders the PostForm component, passing the mutate function and setting isEdit to false.
}

export default PostAdd;
// Exports the PostAdd component as the default export.