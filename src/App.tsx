import React, {useState} from 'react'
import './App.css'
import {Todolist} from './Todolist'
import {v1} from 'uuid'
import Input from './Input'
import {AppBar, Button, IconButton, Toolbar, Typography} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

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
        setTasksObj({...tasksObj, [todolistID]: tasksObj[todolistID].filter(el => el.id !== taskId)})
    }

    const addTask = (title: string, todolistID: string) => {
        const newTask: TaskType = {
            id: v1(),
            isDone: false,
            title: title
        }
        setTasksObj({...tasksObj, [todolistID]: [newTask, ...tasksObj[todolistID]]})
    }

    const changeStatus = (idTask: string, isDone: boolean, todolistID: string) => {
        setTasksObj({
            ...tasksObj,
            [todolistID]: tasksObj[todolistID].map((t: TaskType) => t.id === idTask ? {...t, isDone} : t)
        })
    }

    const changeFilter = (value: FilterTaskType, todolistID: string) => {
        // let todolist = todolists.find(tl => tl.id === todolistID)
        // if(todolist) {
        //    todolist.filter = value
        // }
        // setTodolist([...todolists])
        setTodolist(todolists.map(tl => tl.id === todolistID ? {...tl, filter: value} : tl))
    }

    const removeTodolist = (todolistID: string) => {
        setTodolist(todolists.filter(tl => tl.id !== todolistID))
        delete tasksObj[todolistID]
        setTasksObj({...tasksObj})
    }

    const [todolists, setTodolist] = useState<Array<TodolistType>>([
        {id: todolistID_1, title: 'What to learn', filter: 'all'},
        {id: todolistID_2, title: 'What to buy', filter: 'all'}
    ])

    const [tasksObj, setTasksObj] = useState<TaskStateType>({
        [todolistID_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Redux', isDone: true}
        ],
        [todolistID_2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Book', isDone: true},
            {id: v1(), title: 'Bread', isDone: false}
        ]
    })

    const setTitleInTasksObj = (title: string, idTask: string, todolistID: string) => {
        setTasksObj({...tasksObj, [todolistID]: tasksObj[todolistID].map(t => t.id === idTask ? {...t, title} : t)})
    }
    const setTitleInTodolist = (title: string, todolistID: string) => {
        setTodolist(todolists.map(tl => tl.id === todolistID ? {...tl, title} : tl))
    }

    const addTodolist = (title: string) => {
        const todolistID = v1()
        const todolist: TodolistType = {
            id: todolistID,
            title,
            filter: 'all'
        }
        setTodolist([...todolists, todolist])
        setTasksObj({...tasksObj, [todolistID]: []})
    }

    const todolistsElements = todolists.map(tl => {
        debugger
        let tasksForTodolist = tasksObj[tl.id]

        if (tl.filter === 'active') {
            tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
        }
        if (tl.filter === 'completed') {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
        }
        return <Todolist key={tl.id}
                         todolistID={tl.id}
                         title={tl.title}
                         filter={tl.filter}
                         tasks={tasksForTodolist}
                         removeTask={removeTask}
                         addTask={addTask}
                         changeTaskStatus={changeStatus}
                         changeFilter={changeFilter}
                         removeTodolist={removeTodolist}
                         setTitleInTasksObj={setTitleInTasksObj}
                         setTitleInTodolist={setTitleInTodolist}
        />
    })


    return (
        <div className="App">
            <div className="app__bar">
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6">
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </div>
            <div className="content">
                <Input addItem={addTodolist}/>
                {todolistsElements}
            </div>
        </div>
    )
}

export default App
