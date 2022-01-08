import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {'API-KEY': 'ec259ea8-b888-43af-83e9-f75c638bfe8f'}
})

export const todolistAPI = {
    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },

    createTodolist(title: string) {
        return instance.post<ResponseType<{title: TodolistType}>>('todo-lists', {title})
    },

    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    },

    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },

    getTasks(todolistId: string) {
        return instance.get<GetResponseTaskType>(`todo-lists/${todolistId}/tasks`)
    },

    createTask(todolistId: string, title: string) {
        return instance.post<PostPutResponseTaskType>(`todo-lists/${todolistId}/tasks`, {title})
    },

    updateTask(todolistId: string, taskId: string, task: PutRequestTaskType) {
        return instance.put<PostPutResponseTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`, task)
    },

    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<DeleteResponseTaskType>(`todo-lists/${todolistId}/tasks/${taskId}` )
    },

}

type TodolistType = {
    addedDate: string
    id: string
    order: number
    title: string
}

type ResponseType<D = {}> = {
    data: D
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
}

type TaskType = {
    description: string
    title: string
    isDone: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type GetResponseTaskType = {
    items: Array<TaskType>
    totalCount: string
    error: string
}

type PostPutResponseTaskType = {
    data: {
        item: TaskType
    }
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
}

type DeleteResponseTaskType = {
    data: {}
    messages: Array<string>
    resultCode: number
}

type PutRequestTaskType = {
    title: string
    description: string
    isDone: boolean
    status: number
    priority: number
    startDate?: string
    deadline?: string
    addedDate?: string
}

