import React, {useReducer} from 'react'
import './App.css'
import {TaskType, Todolist} from './Todolist'
import {v1} from 'uuid'
import AddItemForm from './AddItemForm'
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from './store/todolist-reduser'
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, } from './store/tasks-reduser'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './store/store'

export type FilterTaskType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterTaskType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {

    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const todoLists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)

    const dispatch = useDispatch()



    const removeTask = (taskId: string, todoListID: string) => {
        dispatch(removeTaskAC(taskId, todoListID))
    }

    const addTask = (title: string, todoListID: string) => {
        dispatch(addTaskAC(title, todoListID))
    }

    const setTaskStatus = (idTask: string, isDone: boolean, todoListID: string) => {
        dispatch(changeTaskStatusAC(idTask, isDone, todoListID))
    }

    const onChangeTitle = (idTask: string, title: string, todoListID: string) => {
        dispatch(changeTaskTitleAC(idTask, title, todoListID))
    }



    const changeFilter = (filter: FilterTaskType, todoListID: string) => {
        dispatch(changeTodolistFilterAC(todoListID, filter))
    }

    const changeTodolistTitle = (title: string, todoListID: string) => {
        dispatch(changeTodolistTitleAC(todoListID, title))
    }

    const removeTodoList = (todoListID: string) => {
        dispatch(removeTodolistAC(todoListID))

    }

    const addTodoList = (title: string) => {
        // Create action, because of common todolistID that generated in addTodolistAC
        const action = addTodolistAC(title)
        dispatch(action)

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
            <Paper elevation={5} style={{padding: '20px'}}>
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
                <Grid container style={{padding: '20px'}}>
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

export default AppWithRedux
