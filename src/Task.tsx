import React, {ChangeEvent, useCallback} from 'react'
import {removeTask, UpdateDomainTaskModelType, updateTask} from './store/tasks-reducer'
import {Checkbox, IconButton, ListItem, ListItemIcon} from '@material-ui/core'
import s from './Style.module.css'
import EditableSpan from './EditableSpan'
import DeleteIcon from '@material-ui/icons/Delete'
import {useDispatch} from 'react-redux'
import {TaskStatuses, TaskType} from './api/todolist-api'

type PropsType = {
    task: TaskType
    todolistId: string
}

export const Task = React.memo(({task, todolistId}: PropsType) => {

    const dispatch = useDispatch()

    const onCheckboxCheckTask = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let mStatus: number
        if (e.currentTarget.checked) {
            mStatus = TaskStatuses.Completed
        } else {
            mStatus = TaskStatuses.New
        }
        const statusModel: UpdateDomainTaskModelType = {status: mStatus}
        dispatch(updateTask(todolistId, task.id, statusModel))
    }, [task.id, todolistId, dispatch])

    const onChangeTitle = useCallback((title: string) => {
        const titleModel: UpdateDomainTaskModelType = {title}
        dispatch(updateTask(todolistId, task.id, titleModel ))
    }, [task.id, todolistId, dispatch])

    const deleteTask = useCallback(() => dispatch(removeTask(todolistId, task.id)), [task.id, todolistId, dispatch])

    return <ListItem key={task.id}
                     divider
                     disableGutters
                     dense
                     style={{display: 'flex', justifyContent: 'space-between'}}
                     className={task.status === TaskStatuses.Completed ? s.is_done : ''}>
        <div style={{display: 'flex', alignItems: 'center', flex: 1}}>
            <ListItemIcon style={{display: 'block'}}>
                <Checkbox onChange={onCheckboxCheckTask}
                          color={'primary'}
                          checked={task.status === TaskStatuses.Completed}
                />
            </ListItemIcon>
            <EditableSpan title={task.title}
                          onChange={onChangeTitle}/>
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
            <IconButton size={'small'} style={{display: 'block'}} onClick={deleteTask}>
                <DeleteIcon />
            </IconButton>
        </div>
    </ListItem>
})