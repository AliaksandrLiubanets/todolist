import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {todolistAPI} from '../api/todolist-api'

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'ec259ea8-b888-43af-83e9-f75c638bfe8f'
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists().then(res => setState(res.data))
    }, [])

    // useEffect(() => {
    //     axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
    //         .then((res) => {
    //             setState(res.data)
    //         })
    //
    // }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'new Todolist'
        const promise = axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists',
            {title},
            settings
        )
        promise.then((res) => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'bed7fbce-6119-4d5d-8d04-4f5adcafba28'
        const promise = axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
            settings
        )
        promise.then((res) => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState(null)

    useEffect(() => {
        const todolistId = '27e08359-fe58-44ad-ae75-e117e987ffc1'
        const title = '5555555'
        todolistAPI.updateTodolist(todolistId, title).then(res => {
            setState(res.data)
        })

        // axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title}, settings   )
        //     .then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
