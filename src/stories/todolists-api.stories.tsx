import React, {useEffect, useState} from 'react'
import {todolistAPI} from '../api/todolist-api'

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists().then(res => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const title = `111`
        todolistAPI.createTodolist(title).then(res => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = '2382c6a3-bd57-4392-a29a-63430036e5b6'
        todolistAPI.deleteTodolist(todolistId).then(res => {
            debugger
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = '774b5bb3-5608-4376-b429-35604c48bc60'
        const title = '6666666'
        todolistAPI.updateTodolist(todolistId, title).then(res => {
            setState(res.data)
        })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '774b5bb3-5608-4376-b429-35604c48bc60'
        todolistAPI.getTasks(todolistId)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const PostTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '774b5bb3-5608-4376-b429-35604c48bc60'
        const title = 'GitHub'
        todolistAPI.postTask(todolistId, title).then(res => {
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '774b5bb3-5608-4376-b429-35604c48bc60'
        const taskId = 'c5b326b6-02ad-4471-8753-879194f097e3'
        const task = {
            title: 'JS',
            description: 'Samurai-JS forever',
            isDone: false,
            status: 0,
            priority: 1,
            startDate: null,
            deadline: null,
            addedDate: ''
        }
        todolistAPI.updateTask(todolistId, taskId, task).then(res => {
            debugger
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '774b5bb3-5608-4376-b429-35604c48bc60'
        const taskId = '80f4cbc9-780c-441f-b932-61ea84f98ed6'
        todolistAPI.deleteTask(todolistId, taskId).then(res => {
            setState(res.data)
        })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
