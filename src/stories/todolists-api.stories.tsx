import React, {useEffect, useState} from 'react'
import axios from 'axios'

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
        axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
            .then((res) => {
                setState(res.data)
            })

    }, [])

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
        const todolistId = 'c87686e9-be95-47ca-a7cc-226536c452da'
        const promise = axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
            settings
        )
        promise.then((res) => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '2382c6a3-bd57-4392-a29a-63430036e5b6'
        const title = '2222222'
        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
            {title}, settings )
            .then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

