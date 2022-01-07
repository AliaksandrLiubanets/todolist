import React, {useEffect, useState} from 'react'
import {todolistAPI} from '../api/todolist-api'

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists().then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const title = `111`
        todolistAPI.createTodolist(title).then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = '27e08359-fe58-44ad-ae75-e117e987ffc1'
        todolistAPI.deleteTodolist(todolistId).then(res => setState(res.data))
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

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
