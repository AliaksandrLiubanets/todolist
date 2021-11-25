import React, {useState} from 'react'
import './App.css'
import {Todolist} from './Todolist'
import {v1} from 'uuid'
import AddItemForm from './AddItemForm'
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core'
import {Menu} from '@material-ui/icons'

export type FilterTaskType = 'all' | 'active' | 'completed'

type TodolistType = {
    id: string
    title: string
    filter: FilterTaskType
    isEdit: boolean
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
    isEdit: boolean
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoLists, setTodolists] = useState<Array<TodolistType>>([
        {id: todoListID_1, title: 'What to learn', filter: 'all', isEdit: false},
        {id: todoListID_2, title: 'What to buy', filter: 'all', isEdit: false}
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListID_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true, isEdit: false},
            {id: v1(), title: 'JS', isDone: true, isEdit: false},
            {id: v1(), title: 'ReactJS', isDone: false, isEdit: false},
            {id: v1(), title: 'Redux', isDone: true, isEdit: false}
        ],
        [todoListID_2]: [
            {id: v1(), title: 'Meat', isDone: true, isEdit: false},
            {id: v1(), title: 'Beer', isDone: true, isEdit: false},
            {id: v1(), title: 'Milk', isDone: false, isEdit: false},
            {id: v1(), title: 'Bread', isDone: true, isEdit: false}
        ]
    })
//todo function map change edit true when id is equel
    const removeTask = (taskId: string, todoListID: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(task => task.id !== taskId)})
    }

    const addTask = (title: string, todoListID: string) => {
        const newTask: TaskType = {
            id: v1(),
            isDone: false,
            title: title,
            isEdit: false
        }
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
    }

    const setTaskStatus = (idTask: string, isDone: boolean, todoListID: string) => {
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map((t) => t.id === idTask ? {...t, isDone} : t)
        })
    }

    const changeFilter = (filter: FilterTaskType, todoListID: string) => {
        setTodolists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter} : tl))
    }

    const changeTodolistTitle = (title: string, todoListID: string) => {
        setTodolists(todoLists.map(tl => tl.id === todoListID ? {...tl, title} : tl))
    }

    const removeTodoList = (todoListID: string) => {
        setTodolists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }

    const addTodoList = (title: string) => {
        const todoListID = v1()
        const newTodolist: TodolistType = {
            id: todoListID,
            title,
            filter: 'all',
            isEdit: false
        }
        setTodolists([...todoLists, newTodolist])
        setTasks({...tasks, [todoListID]: []})
    }

    const onChangeTitle = (idTask: string, title: string, todoListID: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(task => task.id === idTask ? {...task, title} : task)})
    }

    const changeTaskEdit = (idTask: string, isEdit: boolean, todoListID: string) => {
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => idTask === t.id ? {...t, isEdit: isEdit} : t)})
    }

    const changeTodolistEdit = (isEdit: boolean, todoListID: string) => {
        setTodolists(todoLists.map(tl => tl.id === todoListID ? {...tl, isEdit: isEdit} : tl))
    }

    const todolListComponents = todoLists.map(tl => {
        let taskForRender = tasks[tl.id]
        if (tl.filter === 'active') {
            taskForRender = tasks[tl.id].filter(t => !t.isDone)
        }
        if (tl.filter === 'completed') {
            taskForRender = tasks[tl.id].filter(t => t.isDone)
        }

        return <Grid key={tl.id} item>
            <Paper elevation={5} style={{padding: "20px"}}>
                <Todolist id={tl.id}
                          title={tl.title}
                          filter={tl.filter}
                          tasks={taskForRender}
                          removeTask={removeTask}
                          addTask={addTask}
                          setTaskStatus={setTaskStatus}
                          changeFilter={changeFilter}
                          removeTodoList={removeTodoList}
                          onChange={onChangeTitle}
                          changeTodolistTitle={changeTodolistTitle}
                          isEdit={tl.isEdit}
                          changeTaskEdit={changeTaskEdit}
                          changeTodolistEdit={changeTodolistEdit}


                />
            </Paper>
        </Grid>
    })

    return (<div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button color="inherit" variant={'outlined'}>Login</Button>
                </Toolbar>
            </AppBar>


            <Container fixed>
                <Grid container style={ {padding: "20px"} }>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container
                      spacing={3}
                >
                    {todolListComponents}
                </Grid>
            </Container>
        </div>

    )
}

export default App
