import React, {ChangeEvent, useCallback} from 'react'
import {removeTask, updateTask} from '../../../../store/tasks-reducer'
import {Checkbox, IconButton, ListItem, ListItemIcon} from '@material-ui/core'
import s from '../../../../Style.module.css'
import EditableSpan from '../../../../components/EditableSpan/EditableSpan'
import DeleteIcon from '@material-ui/icons/Delete'
import {useDispatch} from 'react-redux'
import {TaskStatuses, TaskType} from '../../../../api/todolist-api'

type PropsType = {
    task: TaskType
    todolistId: string
}

export const Task = React.memo(({task, todolistId}: PropsType) => {

    const dispatch = useDispatch()

    const onCheckboxCheckTask = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTask(todolistId, task.id,
            {status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New}))
    }, [task.id, todolistId, dispatch])

    const onChangeTitle = useCallback((title: string) => {
        dispatch(updateTask(todolistId, task.id, {title}))
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
                <DeleteIcon/>
            </IconButton>
        </div>
    </ListItem>
})