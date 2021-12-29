import React, {useCallback} from 'react'
import s from './Style.module.css'
import AddItemForm from './AddItemForm'
import EditableSpan from './EditableSpan'
import {Button, Container, IconButton, List, Typography} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './store/store'
import {addTaskAC} from './store/tasks-reduser'
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from './store/todolist-reduser'
import {Task} from './Task'

type propsType = {
    id: string
    title: string
    filter: string
    removeTodoList: (todoListID: string) => void
    changeTodolistTitle: (title: string, todoListID: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodolistWithRedux = React.memo((props: propsType) => {
    console.log('Todolist is called')

    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])
    const dispatch = useDispatch()

    let taskForRender = tasks
    if (props.filter === 'active') {
        taskForRender = tasks.filter(t => !t.isDone)
    }
    if (props.filter === 'completed') {
        taskForRender = tasks.filter(t => t.isDone)
    }

    const elementsTask = taskForRender.map(el => <Task key={el.id} el={el} todolistId={props.id}/> )

    const setAll = () => dispatch(changeTodolistFilterAC(props.id, 'all'))
    const setActive = () => dispatch(changeTodolistFilterAC(props.id, 'active'))
    const setCompleted = () => dispatch(changeTodolistFilterAC(props.id, 'completed'))
    const addTaskToTodolist = (title: string) => dispatch(addTaskAC(title, props.id))
    const changeTodolistTitle = useCallback((title: string) => dispatch(changeTodolistTitleAC(props.id, title)),[dispatch, props.id])
    const removeTodolist = () => dispatch(removeTodolistAC(props.id))

    return (
        <div className={s.border}>
            <Container style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px 10px 25px 20px'
            }}>
                <Typography variant={'h6'} style={{fontWeight: 'bold', height: '30px', flex: '1'}} color={'primary'}>
                    <EditableSpan title={props.title}
                                  onChange={changeTodolistTitle}/>
                </Typography>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <IconButton size={'small'}
                                onClick={removeTodolist}>
                        <DeleteIcon/>
                    </IconButton>
                </div>
            </Container>
            <AddItemForm addItem={addTaskToTodolist}/>
            <List style={{padding: '20px 10px'}}>
                {elementsTask}
            </List>
            <Container style={{display: 'flex'}}>
                <Button variant={'contained'}
                        style={{margin: '0 5px 0 0'}}
                        color={props.filter === 'all' ? 'secondary' : 'primary'}
                        onClick={setAll}>
                    All
                </Button>
                <Button variant={'contained'}
                        style={{margin: '0 5px 0 0'}}
                        color={props.filter === 'active' ? 'secondary' : 'primary'}
                        onClick={setActive}>Active
                </Button>
                <Button variant={'contained'}
                        color={props.filter === 'completed' ? 'secondary' : 'primary'}
                        onClick={setCompleted}>Completed
                </Button>
            </Container>
        </div>
    )
})