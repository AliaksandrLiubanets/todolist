import React, {FC, useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {createTodolist, setTodolists, TodolistDomainType} from './todolist-reducer'
import {AppRootStateType} from '../../app/store'
import {Grid, Paper} from '@material-ui/core'
import {Todolist} from './Todolist/Todolist'
import AddItemForm from '../../components/AddItemForm/AddItemForm'
import {Navigate} from 'react-router-dom'


export const TodolistsList: FC = () => {

    const dispatch = useDispatch()

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isAuth)

    useEffect(() => {
        dispatch(setTodolists())
    }, [])

    const addTodoList = useCallback((title: string) => {
        dispatch(createTodolist(title))
    }, [dispatch])

    const todoLists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)



    const todolListComponents = todoLists.map(tl => {

        return <Grid key={tl.id} item>
            <Paper elevation={5} style={{padding: '20px'}}>
                <Todolist id={tl.id}
                          title={tl.title}
                          filter={tl.filter}
                />
            </Paper>
        </Grid>
    })

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodoList}/>
        </Grid>
        <Grid container
              spacing={3}
        >
            {todolListComponents}
        </Grid>
    </>
}