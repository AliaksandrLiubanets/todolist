import React, {ChangeEvent, useCallback} from 'react'
import {removeTask, updateTask} from './store/tasks-reducer'
import {Checkbox, IconButton, ListItem, ListItemIcon} from '@material-ui/core'
import s from './Style.module.css'
import EditableSpan from './EditableSpan'
import DeleteIcon from '@material-ui/icons/Delete'
import {useDispatch} from 'react-redux'
import {TaskStatuses, TaskType, UpdateTaskModelType} from './api/todolist-api'

type PropsType = {
    el: TaskType
    todolistId: string
}

export const Task = React.memo(({el, todolistId}: PropsType) => {

    const dispatch = useDispatch()

    const model: UpdateTaskModelType = {
        title: el.title,
        deadline: new Date(),
        description: '',
        completed: false,
        status: TaskStatuses.New,
        priority: TaskStatuses.New,
        startDate: new Date()
    }

    const onCheckboxCheckTask = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        debugger
        // const model: UpdateTaskModelType = {
        //     title: el.title,
        //     deadline: new Date(),
        //     description: '',
        //     completed: e.currentTarget.checked,
        //     status: TaskStatuses.New,
        //     priority: TaskStatuses.New,
        //     startDate: new Date()
        // }
        let mStatus: number = model.status
        if (e.currentTarget.checked) {
            mStatus = TaskStatuses.Completed
        } else {
            mStatus = TaskStatuses.New
        }
        // const status = e.currentTarget.checked ? model.status = TaskStatuses.Completed :
        const statusModel: UpdateTaskModelType = {...model, status: mStatus   }
        dispatch(updateTask(todolistId, el.id, statusModel))
    }, [el.id, todolistId, dispatch])

    const onChangeTitle = useCallback((title: string) => {
        // const model: UpdateTaskModelType = {
        //     title: title,
        //     deadline: new Date(),
        //     description: '',
        //     completed: false,
        //     status: TaskStatuses.New,
        //     priority: TaskStatuses.New,
        //     startDate: new Date()
        // }

        const titleModel: UpdateTaskModelType = {...model, title: title }
        dispatch(updateTask(todolistId, el.id, titleModel ))
    }, [el.id, todolistId, dispatch])

    const deleteTask = useCallback(() => dispatch(removeTask(todolistId, el.id)), [el.id, todolistId, dispatch])

    return <ListItem key={el.id}
                     divider
                     disableGutters
                     dense
                     style={{display: 'flex', justifyContent: 'space-between'}}
                     className={el.status === TaskStatuses.Completed ? s.is_done : ''}>
        <div style={{display: 'flex', alignItems: 'center', flex: 1}}>
            <ListItemIcon style={{display: 'block'}}>
                <Checkbox onChange={onCheckboxCheckTask}
                          color={'primary'}
                          checked={el.status === TaskStatuses.Completed}
                />
            </ListItemIcon>
            <EditableSpan title={el.title}
                          onChange={onChangeTitle}/>
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
            <IconButton size={'small'} style={{display: 'block'}} onClick={deleteTask}>
                <DeleteIcon />
            </IconButton>
        </div>
    </ListItem>
})