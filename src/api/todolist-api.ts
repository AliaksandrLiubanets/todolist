import axios from 'axios'

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'ec259ea8-b888-43af-83e9-f75c638bfe8f'
    }
}

export const todolistAPI = {
    getTodolists() {
        return axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
    },

    createTodolist(title: string) {
        return axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title}, settings)
    },

    updateTodolist(todolistId: string, title: string) {
        return axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
            {title}, settings)
    },

    deleteTodolist(todolistId: string) {
        return axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
    },

}