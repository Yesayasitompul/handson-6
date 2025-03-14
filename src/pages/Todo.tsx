import { useMutation, useQuery } from '@tanstack/react-query'
import axios from '../utils/AxiosInstansce'
import { useNavigate } from 'react-router-dom'

interface Todo {
    id : number,
    todo : string,
    completed : boolean,
    userId : number
}

interface TodoList{
    todos : Todo[] 
}

interface DeletedTodo extends Todo {
    isDeleted: Boolean;
    deletedOn: string;
}

const fetchTodoList = async () => {
    return axios.get<TodoList>('/todo')
}

const deleteTodo = async (id: string | undefined) => {
    return await axios.delete<DeletedTodo>(`todo/${id}`);
};

const TodoSkeleton = () => {
    return (
        <div className='flex flex-col space-y-4 mt-2'>
            <div className='flex items-center justify-between'>
                <div className='flex space-x-2 items-center'>
                    <div className="bg-gray-600 animate-pulse h-5 w-5 rounded-md"></div>
                    <div className="bg-gray-600 animate-pulse h-5 w-96 rounded-xl"></div>
                </div>
                <div className="bg-gray-600 animate-pulse h-5 w-5 rounded-full mr-1"></div>
            </div>
            <div>
                <div className="bg-gray-600 animate-pulse h-0.5 w-full rounded-xl"></div>
                <div className='flex justify-end'>
                    <div className="bg-gray-600 animate-pulse h-3 w-4"></div>
                </div>
            </div>
        </div>
    );
}

const Todo = () => {
    const getTodoList = useQuery({
        queryKey : ["Todo"],
        queryFn : fetchTodoList
    });

    const deleteTodoMutation = useMutation(
        {mutationFn : (id : string) => deleteTodo(id)}
    )

    const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 bg-gray-900 min-h-screen">
      <button className="fixed bottom-6 right-6 bg-indigo-600 text-white rounded-full p-4 shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 z-10 transition-all duration-300 transform hover:scale-110" onClick={() => navigate("./add")}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
        </svg>
      </button>
      <div className="bg-gray-800 max-w-[700px] mx-auto mt-3 rounded-lg shadow-xl overflow-hidden">
        <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-white mb-4 flex items-center">
          <svg className="w-8 h-8 mr-3 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
          Todo List
        </h2>
        <hr className="border-gray-700 mb-6" />
          <div className="flex flex-col gap-6 px-4 max-w-4xl mx-auto w-full h-[600px] pt-4 overflow-y-auto bg-gray-800 rounded-md">
            {getTodoList.isFetching ? 
                Array.from({length : 6}).map((_, index) => <TodoSkeleton key={index} />) 
                : 
                getTodoList.data?.data.todos.length === 0 ?
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2M9 12h6m-6 4h6"></path>
                  </svg>
                  <p className="text-xl">Tidak ada tugas yang tersedia</p>
                  <p className="mt-2">Klik tombol + untuk menambahkan tugas baru</p>
                </div>
                : 
                getTodoList.data?.data.todos.map((Todo) => {
                return (
                    <div key={Todo.id} className='flex flex-col space-y-2 bg-gray-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200'>
                        <div className='flex items-center justify-between'>
                            <div className='flex space-x-3 items-center'>
                                <input 
                                  type="checkbox" 
                                  disabled 
                                  checked={Todo.completed} 
                                  className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-500 rounded"
                                />
                                <p className={
                                    !Todo.completed ? 'text-lg font-semibold text-white':
                                    'text-lg font-semibold line-through text-gray-400' 
                                }>{Todo.todo}</p>
                            </div>

                            
                            <div className="relative group z-0">
                                <button className="p-1 rounded-full hover:bg-gray-600 transition-all">
                                    <svg className="w-7 text-gray-300 hover:text-indigo-300 transition-all" data-slot="icon" aria-hidden="true" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                </button>
                                <div className="absolute bottom-0 right-8 bg-gray-800 rounded-lg shadow-lg w-32 hidden group-focus-within:block border border-gray-700">
                                    <button onClick={() => {
                                        navigate(`${Todo.id}/edit`);
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-indigo-600 hover:text-white focus:outline-none focus:bg-indigo-600 rounded-t-lg transition-colors">
                                        Edit
                                    </button>
                                    <button
                                    className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-red-600 hover:text-white focus:outline-none focus:bg-red-600 rounded-b-lg transition-colors"
                                    onClick={() => {
                                        if (confirm("Are you sure want to delete this comment ? ")) {
                                        deleteTodoMutation.mutate(Todo.id.toString());
                                        }
                                        return;
                                    }}
                                    >
                                    Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <hr className="border-gray-600" />
                            <div className='flex justify-end'>
                                <p className='text-xs text-gray-400 mt-1'>User ID: {Todo.userId}</p>
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

export default Todo