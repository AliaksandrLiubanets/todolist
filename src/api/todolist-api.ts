import axios from 'axios'
import {DeleteTodolist, GetTodolists} from '../stories/todolists-api.stories'

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

    updateTodolist(todolistId: string, title: string) {
        return axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
            {title}, settings)
    },

    deleteTodolist(todolistId: string) {
        const promise = axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, settings)
        return promise

    }

}