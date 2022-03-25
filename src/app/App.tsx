import React, {useCallback, useEffect} from 'react'
import './App.css'
import {AppBar, Button, CircularProgress, Container, IconButton, Toolbar, Typography} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {ErrorSnackbar} from '../components/ErrorSnackBar/ErrorSnackBar'
import {Linear} from '../components/LinearProgress/Linear'
import {Route, Routes} from 'react-router-dom'
import {Login} from '../features/Login/Login'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './store'
import {isInitial} from './app-reducer'
import {logOut} from '../features/Login/auth-reducer'

const App = () => {

    const dispatch = useDispatch()
    const isInitialised = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isAuth)

    useEffect(() => {
        dispatch(isInitial())
    }, [])

    const logoutHandler = useCallback(() => {dispatch(logOut())}, [])

    if (!isInitialised) {
        return <CircularProgress style={{position: 'absolute', top: '40%', left: '50%'}}/>
    }


    return <div className="App">
        <ErrorSnackbar/>
        <AppBar position="static">
            <Toolbar style={{justifyContent: 'space-between'}}>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <Menu/>
                </IconButton>
                <Typography variant="h6">
                    Todolists
                </Typography>
                { isLoggedIn && <Button onClick={logoutHandler} color="inherit" variant={'outlined'}>Log out</Button> }
            </Toolbar>
            <Linear/>
        </AppBar>
        <Container fixed>
            <Routes>
                <Route path={'/'} element={<TodolistsList/>}/>
                <Route path={'/todolist'} element={<TodolistsList/>}/>
                <Route path={'/login'} element={<Login/>}/>
            </Routes>

        </Container>
    </div>
}

export default App


