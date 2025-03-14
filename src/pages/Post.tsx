import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "../utils/AxiosInstansce"
import {useNavigate} from "react-router-dom";

interface postData {
  id: number,
  title: string,
  body: string,
  tags: string[],
  reactions: reactionType,
  views: number,
  userId: number
}

interface reactionType {
  likes: number,
  dislikes: number
}

interface postList {
  posts: postData[]
}

const fetchPostData = async () => {
  return await axios.get<postList>("/post");
}

interface DeletedPost extends postData {
  isDeleted: Boolean;
  deletedOn: string;
}

const deletePost = async (id: string | undefined) => {
  return await axios.delete<DeletedPost>(`post/${id}`);
};

const PostCard : React.FC<postData> = (post : postData) =>{
  const deletePostMutation = useMutation({
    mutationFn: (id : string) => deletePost(id)
  });
  const navigate = useNavigate();
  
  return(
    <div className="flex-col flex space-y-6 p-5 bg-gray-800 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 text-white p-2 rounded-full">
              <svg className="w-6 h-6" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </div>
            <p className="font-semibold text-gray-100">User {post.userId}</p>
          </div>
          <div className="relative group">
            <button className="p-1 rounded-lg hover:bg-gray-700 transition-all">
              <svg className="w-6 h-6 text-gray-300" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </button>
            <div className="absolute bottom-12 right-0 bg-gray-700 rounded-lg shadow-lg w-32 hidden group-focus-within:block">
              <button
                onClick={() => {
                  navigate(`${post.id}/edit`);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 focus:outline-none focus:bg-gray-600 rounded-t-lg"
              >
                Edit
              </button>
              <button
                className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 focus:outline-none focus:bg-gray-600 rounded-b-lg"
                onClick={() => {
                  if (confirm("Are you sure want to delete this post ? ")) {
                    deletePostMutation.mutate(post.id.toString());
                  }
                  return;
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
        
        <h2 className="text-xl font-bold text-white">{post.title}</h2>
        <div className="border-t border-gray-600 my-2"></div>
        <p className="text-gray-300 leading-relaxed">{post.body}</p>
      </div>
      
      <div className="flex space-x-2">
        <span className="text-sm text-blue-400 font-bold">Tags:</span>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag, index) => (
            <span key={index} className="text-sm bg-gray-700 px-2 py-0.5 rounded-full text-gray-300 hover:bg-gray-600 transition-colors">
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between items-center pt-2 border-t border-gray-700">
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-1 text-gray-300 hover:text-blue-400 transition-colors">
            <svg className="w-5 h-5" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <span>{post.views}</span>
          </button>
        </div>
        <div className="flex space-x-4">
          <button className="flex items-center space-x-1 text-gray-300 hover:text-green-500 transition-colors">
            <svg className="w-5 h-5" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <span>{post.reactions.likes}</span>
          </button>
          <button className="flex items-center space-x-1 text-gray-300 hover:text-red-500 transition-colors">
            <svg className="w-5 h-5" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.498 15.25H4.372c-1.026 0-1.945-.694-2.054-1.715a12.137 12.137 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.287 4.247 5.886 4 6.504 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M7.498 15.25c.618 0 .991.724.725 1.282A7.471 7.471 0 0 0 7.5 19.75 2.25 2.25 0 0 0 9.75 22a.75.75 0 0 0 .75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 0 0 2.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384m-10.253 1.5H9.7m8.075-9.75c.01.05.027.1.05.148.593 1.2.925 2.55.925 3.977 0 1.487-.36 2.89-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 0 0 .303-.54" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <span>{post.reactions.dislikes}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

const PostSkeleton = () => {
  return (
    <div className="flex-col flex space-y-6 p-5 bg-gray-800 text-white rounded-lg shadow-md animate-pulse">
      <div className="flex flex-col space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-gray-600 h-10 w-10 rounded-full"></div>
            <div className="bg-gray-600 h-5 w-32 rounded-md"></div>
          </div>
          <div className="bg-gray-600 h-6 w-6 rounded-md"></div>
        </div>
        
        <div className="bg-gray-600 h-7 w-3/4 rounded-md"></div>
        <div className="border-t border-gray-600 my-2"></div>
        <div className="bg-gray-600 h-24 w-full rounded-md"></div>
      </div>
      
      <div className="flex space-x-2">
        <div className="bg-gray-600 h-5 w-12 rounded-md"></div>
        <div className="flex gap-2">
          <div className="bg-gray-600 h-5 w-16 rounded-full"></div>
          <div className="bg-gray-600 h-5 w-20 rounded-full"></div>
        </div>
      </div>
      
      <div className="flex justify-between items-center pt-2 border-t border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="bg-gray-600 h-5 w-16 rounded-md"></div>
        </div>
        <div className="flex space-x-4">
          <div className="bg-gray-600 h-5 w-16 rounded-md"></div>
          <div className="bg-gray-600 h-5 w-16 rounded-md"></div>
        </div>
      </div>
    </div>
  );
}

const Post = () => {
  const getPostData = useQuery({ queryKey: ["postDat"], queryFn: fetchPostData });
  const navigate = useNavigate();

  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">Posts</h1>
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            onClick={() => navigate("./add")}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
            <span>New Post</span>
          </button>
        </div>
        
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[800px] overflow-y-auto pr-2">
            {getPostData.isFetching ? (
              Array.from({length: 4}).map((_, i) => <PostSkeleton key={i}/>)
            ) : (
              getPostData.data?.data.posts.map((post) => (
                <PostCard key={post.id} {...post} />
              ))
            )}
          </div>
          
          {getPostData.data?.data.posts.length === 0 && !getPostData.isFetching && (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <svg className="w-16 h-16 mb-4" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
              <p className="text-lg">No posts found</p>
              <button 
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                onClick={() => navigate("./add")}
              >
                Create your first post
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile floating action button */}
      <button 
        className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 md:hidden"
        onClick={() => navigate("./add")}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
        </svg>
      </button>
    </div>
  );
}

export default Post;