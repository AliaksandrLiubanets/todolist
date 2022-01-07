import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {'API-KEY': 'ec259ea8-b888-43af-83e9-f75c638bfe8f'}
})

export const todolistAPI = {
    getTodolists() {
        return instance.get('todo-lists')
    },

    createTodolist(title: string) {
        return instance.post('todo-lists', {title})
    },

    updateTodolist(todolistId: string, title: string) {
        return instance.put(`todo-lists/${todolistId}`, {title})
    },

    deleteTodolist(todolistId: string) {
        return instance.delete(`todo-lists/${todolistId}`)
    },

}