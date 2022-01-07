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
        return instance.get<GetResponseType>(`todo-lists/${todolistId}/tasks`)
    },

    postTask(todolistId: string, title: string) {
        return instance.post<PostResponseType>(`todo-lists/${todolistId}/tasks`, {title})
    }
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

type GetResponseType = {
    items: Array<TaskType>
    totalCount: string
    error: string
}

type PostResponseType = {
    data: {
        item: TaskType
    }
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
}

