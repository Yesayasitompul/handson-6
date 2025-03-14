import { useMutation, useQuery } from '@tanstack/react-query';
// Imports the useMutation and useQuery hooks from react-query for handling mutations and queries.
import axios from '../utils/AxiosInstansce';
// Imports a custom axios instance for making HTTP requests.
import { useEffect } from 'react';
// Imports the useEffect hook from React for performing side effects in function components.
import { useNavigate, useParams } from 'react-router-dom';
// Imports the useNavigate and useParams hooks from react-router-dom for programmatic navigation and accessing route parameters.
import PostForm from '../components/PostForm';
// Imports the PostForm component for rendering the form to edit a post.

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

export const fetchPostDetail = async (id: string | undefined) => {
  return await axios.get<postDat>(`/post/${id}`);
};
// Defines an asynchronous function fetchPostDetail that takes an id as input and sends a GET request to fetch the post details.

const editPost = async (data: postDat, id: string | undefined) => {
  return await axios.put(`/posts/${id}`, data);
};
// Defines an asynchronous function editPost that takes a postDat object and an id as input and sends a PUT request to update the post.

const PostEdit = () => {
  const { id } = useParams();
  // Uses the useParams hook to get the id parameter from the route.

  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: (data: postDat) => editPost(data, id)
  });
  // Uses the useMutation hook to create a mutation for editing a post. The mutation function is editPost.

  const getPostData = useQuery({
    queryKey: ["postDatDetail", id],
    queryFn: () => fetchPostDetail(id)
  });
  // Uses the useQuery hook to fetch the post details. The queryKey is "postDatDetail" and the query function is fetchPostDetail.

  const navigate = useNavigate();
  // Uses the useNavigate hook to get a navigate function for programmatic navigation.

  useEffect(() => {
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
      <h2 className="text-2xl font-bold mb-6 mt-10 text-center">Edit Post</h2>
      <PostForm isEdit={true} mutateFn={mutate} defaultInputData={getPostData.data?.data} />
    </div>
  );
  // Renders the PostEdit component. If the mutation is pending, it shows a loading overlay. It also renders the PostForm component, passing the mutate function, isEdit prop, and defaultInputData prop.
}

export default PostEdit;
// Exports the PostEdit component as the default export.