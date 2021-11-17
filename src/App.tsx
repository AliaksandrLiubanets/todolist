import React, {useState} from 'react'
import './App.css'
import {Todolist} from './Todolist'
import {v1} from 'uuid'

export type FilterTaskType = 'all' | 'active' | 'completed'

type TodolistType = {
    id: string,
    title: string
    filter: FilterTaskType
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const todolistID_1 = v1()
    const todolistID_2 = v1()

    const removeTask = (taskId: string, todolistID: string) => {
        setTasks(tasks.filter(el => el.id !== taskId))
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            isDone: false,
            title: title
        }
        setTasks([newTask, ...tasks])
    }

    const setTaskStatus = (idTask: string, isDone: boolean) => {
        setTasks(tasks.map((t: TaskType) => t.id === idTask ? {...t, isDone} : t))
    }

    const changeFilter = (value: FilterTaskType, todolistID: string) => {
        let todolist = todolists.find(tl => tl.id === todolistID)
        if(todolist) {
           todolist.filter = value
        }
        setTodolist([...todolists])
        // setTodolist(todolists.map(tl => tl.id === todolistID ? {...tl, filter: value} : tl))  ?????????????
    }

    const [todolists, setTodolist] = useState<Array<TodolistType>>([
        {id: todolistID_1, title: 'What to learn', filter: 'active'},
        {id: todolistID_2, title: 'What to buy', filter: 'completed'}
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todolistID_1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
            { id: v1(), title: 'Redux', isDone: true },
        ],
        [todolistID_2]: [
            { id: v1(), title: 'Milk', isDone: true },
            { id: v1(), title: 'Book', isDone: true },
            { id: v1(), title: 'Bread', isDone: false },
        ]
    })

    const todolistsElements = todolists.map(tl => {
        let tasksForTodolist = tasks[tl.id]

        if (tl.filter === 'active') {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
        }
        if (tl.filter === 'completed') {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
        }
        return <Todolist key={tl.id}
                         todolistID={tl.id}
                         title={tl.title}
                         tasks={tasksForTodolist}
                         removeTask={removeTask}
                         filterTask={setFilter}
                         addTask={addTask}
                         setTaskStatus={setTaskStatus}
                         filter={tl.filter}
                         changeFilter={changeFilter}
        />
    })

    return (
        <div className="App">
            {todolistsElements}
        </div>
    )
}

export default App
