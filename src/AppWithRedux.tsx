import React, {useCallback, useEffect} from 'react'
import './App.css'
import AddItemForm from './AddItemForm'
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {createTodolist, removeTodolistAC, setTodolist, TodolistDomainType} from './store/todolist-reduser'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './store/store'
import {TodolistWithRedux} from './TodolistWithRedux'
import {TaskType} from './api/todolist-api'

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

const AppWithRedux = () => {
    console.log('App is called')

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setTodolist())
    }, [])

    const todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)

    const removeTodoList = useCallback((todoListID: string) => {
        dispatch(removeTodolistAC(todoListID))
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        // const action = addTodolistAC(title)
        dispatch(createTodolist(title))
    }, [dispatch])

    const todolListComponents = todoLists.map(tl => {

        return <Grid key={tl.id} item>
            <Paper elevation={5} style={{padding: '20px'}}>
                <TodolistWithRedux id={tl.id}
                          title={tl.title}
                          filter={tl.filter}
                          removeTodoList={removeTodoList}
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
