import axios from 'axios'


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {'API-KEY': '7920275f-5e2b-4fa0-b4d6-1b5862086572'}
})


// api:

export const todolistAPI = {
    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },

    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title})
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
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
    },

    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    },

    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    }
}

export const authAPI = {
    me() {
        return instance.get<ResponseType<AuthData>>('auth/me')
    },
    login(loginData: LoginDataType) {
        return instance.post<ResponseType<{userId: number}>>('auth/login', loginData)
    },
    logOut() {
        return instance.delete<ResponseType>('auth/login')
    },
}


// types:

export type TodolistType = {
    addedDate: string
    id: string
    order: number
    title: string
}

export type ResponseType<D = {}> = {
    data: D
    fieldsErrors?: Array<string>
    messages: Array<string>
    resultCode: number
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

export enum TodoTaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TodoTaskPriorities
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
//
// type DeleteResponseTaskType = {
//     data: {}
//     messages: Array<string>
//     resultCode: number
// }

export type UpdateTaskModelType = {
    title: string
    description: string
    completed: boolean
    status: TaskStatuses
    priority: TodoTaskPriorities
    startDate: string
    deadline: string
}

export type AuthData = {
    id: number
    email: string
    login: string
}

export type LoginDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}