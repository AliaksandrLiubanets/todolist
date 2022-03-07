import React, {ChangeEvent, useCallback} from 'react'
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './store/tasks-reduser'
import {Checkbox, IconButton, ListItem, ListItemIcon} from '@material-ui/core'
import s from './Style.module.css'
import EditableSpan from './EditableSpan'
import DeleteIcon from '@material-ui/icons/Delete'
import {useDispatch} from 'react-redux'
import {TaskStatuses, TaskType} from './api/todolist-api'

type PropsType = {
    el: TaskType
    todolistId: string
}

export const Task = React.memo(({el, todolistId}: PropsType) => {

    const dispatch = useDispatch()

    const onCheckboxCheckTask = useCallback((e: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAC(el.id, e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New, todolistId)), [el.id, todolistId, dispatch])
    const onChangeTitle = useCallback((title: string) => dispatch(changeTaskTitleAC(el.id, title, todolistId)), [el.id, todolistId, dispatch])
    const removeTask = useCallback(() => dispatch(removeTaskAC(el.id, todolistId)), [el.id, todolistId, dispatch])

    return <ListItem key={el.id}
                     divider
                     disableGutters
                     dense
                     style={{display: 'flex', justifyContent: 'space-between'}}
                     className={el.status === 2 ? s.is_done : ''}>
        <div style={{display: 'flex', alignItems: 'center', flex: 1}}>
            <ListItemIcon style={{display: 'block'}}>
                <Checkbox onChange={onCheckboxCheckTask}
                          color={'primary'}
                          checked={el.status === 2 && true}
                />
            </ListItemIcon>
            <EditableSpan title={el.title}
                          onChange={onChangeTitle}/>
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
            <IconButton size={'small'} style={{display: 'block'}} onClick={removeTask}>
                <DeleteIcon />
            </IconButton>
        </div>
    </ListItem>
})