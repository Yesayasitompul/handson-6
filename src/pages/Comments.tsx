import { useMutation, useQuery } from '@tanstack/react-query'
import axios from '../utils/AxiosInstansce'
import { useNavigate } from 'react-router-dom'

interface Comment {
    id : number,
    body : string,
    postId : number,
    likes : number
    user : {
      id : number,
      username : string,
      fullName : string
    }
}

interface Comments{
    comments : Comment[] 
}

interface DeletedComment extends Comment {
    isDeleted: Boolean;
    deletedOn: string;
}

const fetchCommentsDat = async () => {
    return axios.get<Comments>('/comments')
}

const deleteComments = async (id: string | undefined) => {
    return await axios.delete<DeletedComment>(`comments/${id}`);
};

const CommentsSkeleton = () => {
  return(
    <div className='flex flex-col space-y-5 mt-2 bg-gray-800 p-3 rounded-2xl'>
      <div className='flex items-center space-x-2'>
        <div>
          <div className="bg-gray-600 animate-pulse h-11 w-11 rounded-full"></div>
        </div>
        <div className='flex flex-col w-full space-y-3'>
          <div className='flex w-full justify-between items-center'>
            <div className="bg-gray-600 animate-pulse h-5 w-30 rounded-xl"></div>
            <div className="bg-gray-600 animate-pulse h-5 w-5 rounded-full mr-1"></div>
          </div>
          <div className="bg-gray-600 animate-pulse h-3 w-20 rounded-xl"></div>
        </div>
      </div>
      
      <div>
        <div className="bg-gray-600 animate-pulse h-5 w-96 rounded-xl"></div>
      </div>
      <div className='flex flex-col space-y-1'>
        <div className="bg-gray-600 animate-pulse h-1 w-full rounded-xl"></div>
        <div className="bg-gray-600 animate-pulse h-4 w-4 rounded-sm self-end"></div>
      </div>
    </div>
  );
}

const Comments = () => {
    const getCommentDat = useQuery({
        queryKey : ["comments"],
        queryFn : fetchCommentsDat
    });

    const deleteCommentDat = useMutation(
        {mutationFn : (id : string) => deleteComments(id)}
    )

    const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 bg-gray-900">
      <button className="fixed bottom-4 right-4 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 z-10" onClick={() => navigate("./add")}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
        </svg>
      </button>
      <div className="bg-gray-900">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-white">Comments</h2>
          <div className="flex flex-col gap-9 px-4 mt-9 max-w-4xl mx-auto w-full h-[600px] pt-10 overflow-y-auto bg-black rounded-2xl border border-gray-800">
            {getCommentDat.isFetching ? 
                Array.from({length: 3}).map((_, index) => <CommentsSkeleton key={index}/>)
                :getCommentDat.data?.data.comments.map((comment) => {

                return (
                    <div key={comment.id} className='flex flex-col space-y-5 bg-gray-800 p-4 rounded-2xl shadow-lg transition-all hover:shadow-xl hover:bg-gray-700'>
                      <div className='flex items-center space-x-3'>
                        <svg className="w-11 h-11 p-1 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-all" data-slot="icon" aria-hidden="true" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                        <div className='flex flex-col w-full'>
                          <div className='flex w-full justify-between items-center'>
                            <p className='font-semibold text-white text-lg'>{comment.user.fullName}</p>
                            <div className="relative group z-0">
                                <button className="bg-gray-700 hover:bg-gray-600 rounded-full p-1 transition-all">
                                    <svg className="w-6 h-6 text-gray-300 hover:text-white" data-slot="icon" aria-hidden="true" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" strokeLinecap="round" strokeLinejoin="round"></path>
                                      <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                </button>
                                <div className="absolute bottom-0 right-8 bg-gray-700 rounded-lg shadow-lg w-32 hidden group-focus-within:block">
                                    <button onClick={() => {
                                        navigate(`${comment.id}/edit`);
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-600 focus:outline-none focus:bg-gray-600 rounded-t-lg">
                                        Edit
                                    </button>
                                    <button
                                    className="w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-600 focus:outline-none focus:bg-gray-600 rounded-b-lg"
                                    onClick={() => {
                                        if (confirm("Are you sure want to delete this comment ? ")) {
                                          deleteCommentDat.mutate(comment.id.toString());
                                        }
                                        return;
                                    }}
                                    >
                                    Delete
                                    </button>
                                </div>
                            </div>
                          </div>
                          <p className='text-xs italic text-blue-300'>@{comment.user.username}-{comment.user.id}</p>
                        </div>
                      </div>
                      
                      <div className="px-2 py-3 bg-gray-900 rounded-xl">
                        <p className="text-gray-100">{comment.body}</p>
                      </div>
                      <div className='flex flex-col'>
                        <hr className="border-gray-700" />
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center space-x-2">
                            <button className="flex items-center space-x-1 text-gray-400 hover:text-blue-400 transition-colors">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path>
                              </svg>
                              <span>{comment.likes || 0}</span>
                            </button>
                          </div>
                          <p className='text-right text-sm text-gray-400'>ID: {comment.id}</p>
                        </div>
                      </div>
                    </div>
                );
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Comments