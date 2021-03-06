import React, {useCallback} from 'react'
import s from '../../../Style.module.css'
import AddItemForm from '../../../components/AddItemForm/AddItemForm'
import EditableSpan from '../../../components/EditableSpan/EditableSpan'
import {Button, Container, IconButton, List, Typography} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from '../../../app/store'
import {createTask} from '../tasks-reducer'
import {changeTodolistFilterAC, deleteTodolist, updateTodolistTitle} from '../todolist-reducer'
import {Task} from './Task/Task'
import {TaskStatuses, TaskType} from '../../../api/todolist-api'
import {RequestStatusType} from '../../../app/app-reducer'

type propsType = {
    id: string
    title: string
    filter: string
}

export const Todolist = React.memo((props: propsType) => {

    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    const dispatch = useDispatch()

    let taskForRender = tasks
    if (props.filter === 'active') {
        taskForRender = tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === 'completed') {
        taskForRender = tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    const elementsTask = taskForRender.map(task => <Task key={task.id} task={task} todolistId={props.id}/> )

    const setAll = useCallback(() => dispatch(changeTodolistFilterAC(props.id, 'all')), [props.id, dispatch])
    const setActive = useCallback(() => dispatch(changeTodolistFilterAC(props.id, 'active')), [props.id, dispatch])
    const setCompleted = useCallback(() => dispatch(changeTodolistFilterAC(props.id, 'completed')), [props.id, dispatch])
    const addTaskToTodolist = useCallback((title: string) => dispatch(createTask(props.id, title)), [props.id, dispatch])
    const changeTodolistTitle = useCallback((title: string) => dispatch(updateTodolistTitle(props.id, title)),[props.id, dispatch])
    const removeTodolist = useCallback(() => dispatch(deleteTodolist(props.id)), [props.id, dispatch])

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
                                onClick={removeTodolist}
                                disabled={status === 'loading'}
                    >
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