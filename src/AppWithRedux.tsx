import React from 'react'
import './App.css'
import {TaskType, Todolist} from './Todolist'
import AddItemForm from './AddItemForm'
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from './store/todolist-reduser'
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './store/tasks-reduser'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './store/store'
import {TodolistWithRedux} from './TodolistWithRedux'

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

    const todoLists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)

    const dispatch = useDispatch()

    // const removeTask = (taskId: string, todoListID: string) => {
    //     dispatch(removeTaskAC(taskId, todoListID))
    // }

    // const addTask = (title: string, todoListID: string) => {
    //     dispatch(addTaskAC(title, todoListID))
    // }

    // const setTaskStatus = (idTask: string, isDone: boolean, todoListID: string) => {
    //     dispatch(changeTaskStatusAC(idTask, isDone, todoListID))
    // }

    // const onChangeTitle = (idTask: string, title: string, todoListID: string) => {
    //     dispatch(changeTaskTitleAC(idTask, title, todoListID))
    // }



    // const changeFilter = (filter: FilterTaskType, todoListID: string) => {
    //     dispatch(changeTodolistFilterAC(todoListID, filter))
    // }

    const changeTodolistTitle = (title: string, todoListID: string) => {
        dispatch(changeTodolistTitleAC(todoListID, title))
    }

    const removeTodoList = (todoListID: string) => {
        dispatch(removeTodolistAC(todoListID))

    }

    const addTodoList = (title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }


    const todolListComponents = todoLists.map(tl => {

        return <Grid key={tl.id} item>
            <Paper elevation={5} style={{padding: '20px'}}>
                <TodolistWithRedux id={tl.id}
                          title={tl.title}
                          filter={tl.filter}
                          // tasks={taskForRender}
                          // removeTask={removeTask}
                          // addTask={addTask}
                          // setTaskStatus={setTaskStatus}
                          // changeFilter={changeFilter}
                          removeTodoList={removeTodoList}
                          // onChange={onChangeTitle}
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
