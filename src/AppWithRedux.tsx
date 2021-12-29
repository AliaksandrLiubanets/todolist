import React, {useCallback} from 'react'
import './App.css'
import {TaskType} from './Todolist'
import AddItemForm from './AddItemForm'
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {addTodolistAC, changeTodolistTitleAC, removeTodolistAC} from './store/todolist-reduser'
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

const AppWithRedux = () => {
    console.log('App is called')

    const todoLists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)

    const dispatch = useDispatch()

    const changeTodolistTitle = useCallback((title: string, todoListID: string) => {
        dispatch(changeTodolistTitleAC(todoListID, title))
    }, [dispatch])

    const removeTodoList = useCallback((todoListID: string) => {
        dispatch(removeTodolistAC(todoListID))
    }, [dispatch])

    const addTodoList = useCallback((title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }, [dispatch])

    const todolListComponents = todoLists.map(tl => {

        return <Grid key={tl.id} item>
            <Paper elevation={5} style={{padding: '20px'}}>
                <TodolistWithRedux id={tl.id}
                          title={tl.title}
                          filter={tl.filter}
                          removeTodoList={removeTodoList}
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
