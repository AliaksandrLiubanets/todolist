import React, {ChangeEvent, useCallback} from 'react'
import {removeTask, updateTask} from '../../tasks-reducer'
import {Checkbox, IconButton, ListItem, ListItemIcon} from '@material-ui/core'
import s from '../../../../Style.module.css'
import EditableSpan from '../../../../components/EditableSpan/EditableSpan'
import DeleteIcon from '@material-ui/icons/Delete'
import {useDispatch, useSelector} from 'react-redux'
import {TaskStatuses, TaskType} from '../../../../api/todolist-api'
import {AppRootStateType} from '../../../../app/store'
import {RequestStatusType} from '../../../../app/app-reducer'

type PropsType = {
    task: TaskType
    todolistId: string
}

export const Task = React.memo(({task, todolistId}: PropsType) => {

    const dispatch = useDispatch()
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

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
                          disabled={status === 'loading'}
                />
            </ListItemIcon>
            <EditableSpan title={task.title}
                          onChange={onChangeTitle}/>
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
            <IconButton size={'small'} style={{display: 'block'}} onClick={deleteTask} disabled={status === 'loading'}>
                <DeleteIcon/>
            </IconButton>
        </div>
    </ListItem>
})