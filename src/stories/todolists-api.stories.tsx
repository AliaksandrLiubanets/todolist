import React, {useEffect, useState} from 'react'
import axios from 'axios'

export default {
    title: 'API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', {withCredentials: true})
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
        const promise = axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title},
            {
                withCredentials: true,
                headers: {
                    'API-KEY': 'ec259ea8-b888-43af-83e9-f75c638bfe8f'
                }
            }
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
            {
                withCredentials: true,
                headers: {'API-KEY': 'ec259ea8-b888-43af-83e9-f75c638bfe8f'}
            }
        )
        promise.then((res) => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'a2272ee3-b615-4ce6-b1d7-8cd0848253e7'
        const title = '1111111'
        axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title}, {
            withCredentials: true,
            headers: {'API-KEY': 'ec259ea8-b888-43af-83e9-f75c638bfe8f'}
        } )
            .then(res => setState(res.data))

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

