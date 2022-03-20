import React from 'react'
import './App.css'
import {AppBar, Button, Container, IconButton, Toolbar, Typography} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {ErrorSnackbar} from '../components/ErrorSnackBar/ErrorSnackBar'
import {Linear} from '../components/LinearProgress/Linear'


const App = () => {

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
                <Button color="inherit" variant={'outlined'}>Login</Button>
            </Toolbar>
            <Linear/>
        </AppBar>
        <Container fixed>
            <TodolistsList/>
        </Container>
    </div>
}

export default App


