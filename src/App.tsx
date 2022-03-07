import React, {useReducer} from 'react'
import './App.css'
import {Todolist} from './Todolist'
import {v1} from 'uuid'
import AddItemForm from './AddItemForm'
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from './store/todolist-reduser'
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './store/tasks-reduser'
import {TaskStatuses, TaskType, TodoTaskPriorities} from './api/todolist-api'

export type FilterTaskType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterTaskType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoLists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todoListID_1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
        {id: todoListID_2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}
    ])

    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListID_1]: [
            {id: v1(), title: 'HTML&CSS', description: '',
                status: TaskStatuses.Completed, priority: TodoTaskPriorities.Low,
                startDate: '',  deadline: '', todoListId: todoListID_1,
                order: 0, addedDate: ''},
            {id: v1(), title: 'JS', description: '',
                status: TaskStatuses.Completed, priority: TodoTaskPriorities.Low,
                startDate: '',  deadline: '', todoListId: todoListID_1,
                order: 0, addedDate: ''},
            {id: v1(), title: 'ReactJS', description: '',
                status: TaskStatuses.New, priority: TodoTaskPriorities.Low,
                startDate: '',  deadline: '', todoListId: todoListID_1,
                order: 0, addedDate: ''},
            {id: v1(), title: 'Redux', description: '',
                status: TaskStatuses.Completed, priority: TodoTaskPriorities.Low,
                startDate: '',  deadline: '', todoListId: todoListID_1,
                order: 0, addedDate: ''}
        ],
        [todoListID_2]: [
            {id: v1(), title: 'Meat', description: '',
                status: TaskStatuses.Completed, priority: TodoTaskPriorities.Low,
                startDate: '',  deadline: '', todoListId: todoListID_2,
                order: 0, addedDate: ''},
            {id: v1(), title: 'Beer', description: '',
                status: TaskStatuses.Completed, priority: TodoTaskPriorities.Low,
                startDate: '',  deadline: '', todoListId: todoListID_2,
                order: 0, addedDate: ''},
            {id: v1(), title: 'Milk', description: '',
                status: TaskStatuses.New, priority: TodoTaskPriorities.Low,
                startDate: '',  deadline: '', todoListId: todoListID_2,
                order: 0, addedDate: ''},
            {id: v1(), title: 'Bread', description: '',
                status: TaskStatuses.Completed, priority: TodoTaskPriorities.Low,
                startDate: '',  deadline: '', todoListId: todoListID_2,
                order: 0, addedDate: ''}
        ]
    })

    const removeTask = (taskId: string, todoListID: string) => {
        dispatchToTasks(removeTaskAC(taskId, todoListID))
    }

    const addTask = (title: string, todoListID: string) => {
        dispatchToTasks(addTaskAC(title, todoListID))
    }

    const setTaskStatus = (idTask: string, status: TaskStatuses, todoListID: string) => {
        dispatchToTasks(changeTaskStatusAC(idTask, status, todoListID))
    }

    const onChangeTitle = (idTask: string, title: string, todoListID: string) => {
        dispatchToTasks(changeTaskTitleAC(idTask, title, todoListID))
    }



    const changeFilter = (filter: FilterTaskType, todoListID: string) => {
        dispatchToTodolists(changeTodolistFilterAC(todoListID, filter))
    }

    const changeTodolistTitle = (title: string, todoListID: string) => {
        dispatchToTodolists(changeTodolistTitleAC(todoListID, title))
    }

    const removeTodoList = (todoListID: string) => {
        dispatchToTodolists(removeTodolistAC(todoListID))
        dispatchToTasks(removeTodolistAC(todoListID))
    }

    const addTodoList = (title: string) => {
        dispatchToTodolists(addTodolistAC(title))
        dispatchToTasks(addTodolistAC(title))
    }


    const todolListComponents = todoLists.map(tl => {
        let taskForRender = tasks[tl.id]
        if (tl.filter === 'active') {
            taskForRender = tasks[tl.id].filter(t => t.status === TaskStatuses.New)
        }
        if (tl.filter === 'completed') {
            taskForRender = tasks[tl.id].filter(t => t.status === TaskStatuses.Completed)
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

export default App
