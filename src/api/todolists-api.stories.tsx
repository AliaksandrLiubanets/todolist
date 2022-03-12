import React, {useEffect, useState} from 'react'
import {todolistAPI} from './todolist-api'

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
    const [todolistId, setTodolistId] = useState<any>('')

    const getTasks = () => {
        todolistAPI.getTasks(todolistId)
            .then(res => {
                setState(res.data)
            })
    }

    return <div>
        <div>{JSON.stringify(state)}</div>
        <div>
            <input type="text" placeholder={'todolistId'} onChange={(e) => setTodolistId(e.currentTarget.value)}
                   value={todolistId}/>
            <button onClick={getTasks}>Get tasks</button>
        </div>
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>('')
    const [title, setTitle] = useState<any>('')

    const createTask = () => {
        todolistAPI.createTask(todolistId, title)
            .then(res => {
                setState(res.data)
            })
    }

    return <div>
        <div>{JSON.stringify(state)}</div>
        <div>
            <input type="text" placeholder={'todolistId'} onChange={(e) => setTodolistId(e.currentTarget.value)}
                   value={todolistId}/>
            <input type="text" placeholder={'title'} onChange={(e) => setTitle(e.currentTarget.value)}
                   value={title}/>
            <button onClick={createTask}>Create task</button>
        </div>
    </div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>('')
    const [taskId, setTaskId] = useState<any>('')
    const [title, setTitle] = useState<any>('')
    const [description, setDescription] = useState<any>('')
    const [isDone, setIsDone] = useState<any>(false)
    const [status, setStatus] = useState<any>(0)
    const [priority, setPriority] = useState<any>(1)
    const [startDate, setStartDate] = useState<any>('')
    const [deadline, setDeadline] = useState<any>('')

    const task = {
                title: title,
                description: description,
                completed: isDone,
                status: status,
                priority: priority,
                startDate: startDate,
                deadline: deadline,
            }

    const updateTask = () => {
        todolistAPI.updateTask(todolistId, taskId, task).then(res => {
                    setState(res.data)
                })
    }

    return <div>
        <div>{JSON.stringify(state)}</div>
        <div>
            <input type="text" placeholder={'todolistId'} onChange={(e) => setTodolistId(e.currentTarget.value)}
                   value={todolistId}/>
            <input type="text" placeholder={'taskId'} onChange={(e) => setTaskId(e.currentTarget.value)}
                   value={taskId}/>
            <input type="text" placeholder={'title'} onChange={(e) => setTitle(e.currentTarget.value)}
                   value={title}/>
            <input type="text" placeholder={'description'} onChange={(e) => setDescription(e.currentTarget.value)}
                   value={description}/>
            <input type="text" placeholder={'isDone'} onChange={(e) => setIsDone(e.currentTarget.value)}
                   value={isDone}/>
            <input type="text" placeholder={'status'} onChange={(e) => setStatus(e.currentTarget.value)}
                   value={status}/>
            <input type="text" placeholder={'priority'} onChange={(e) => setPriority(e.currentTarget.value)}
                   value={priority}/>
            <input type="text" placeholder={'startDate'} onChange={(e) => setStartDate(e.currentTarget.value)}
                   value={startDate}/>
            <input type="text" placeholder={'deadline'} onChange={(e) => setDeadline(e.currentTarget.value)}
                   value={deadline}/>
            <button onClick={updateTask}>Update task</button>
        </div>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>('')
    const [taskId, setTaskId] = useState<any>('')

    const deleteTask = () => {
        todolistAPI.deleteTask(todolistId, taskId)
            .then(res => {
                setState(res.data)
            })
    }

    return <div>
        <div>{JSON.stringify(state)}</div>
        <div>
            <input type="text" placeholder={'todolistId'} onChange={(e) => setTodolistId(e.currentTarget.value)}
                   value={todolistId}/>
            <input type="text" placeholder={'taskId'} onChange={(e) => setTaskId(e.currentTarget.value)}
                   value={taskId}/>
            <button onClick={deleteTask}>Delete task</button>
        </div>
    </div>
}
