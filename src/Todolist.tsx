import React, {ChangeEvent} from 'react'
import s from './Style.module.css'
import {FilterTaskType} from './App'
import AddItemForm from './AddItemForm'
import EditableSpan from './EditableSpan'
import {Button, Checkbox, Container, IconButton, List, ListItem, ListItemIcon, Typography} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import {TaskStatuses, TaskType} from './api/todolist-api'

type propsType = {
    id: string
    title: string
    filter: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    setTaskStatus: (idTask: string, status: TaskStatuses, todoListID: string) => void
    changeFilter: (filter: FilterTaskType, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    onChange: (idTask: string, title: string, todoListID: string) => void
    changeTodolistTitle: (title: string, todoListID: string) => void
}

export function Todolist(props: propsType) {

    const elementsTask = props.tasks.map(el => {

        const onCheckboxCheckTask = (e: ChangeEvent<HTMLInputElement>) => props.setTaskStatus(el.id, e.currentTarget.checked ? el.status = TaskStatuses.Completed : el.status = TaskStatuses.New, props.id)
        const onChangeTitle = (title: string) => props.onChange(el.id, title, props.id)
        const removeTask = () => props.removeTask(el.id, props.id)

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
                              checked={el.status === 2}
                    />
                </ListItemIcon>
                <EditableSpan title={el.title}
                    // style={{}}
                              onChange={onChangeTitle}/>
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <IconButton size={'small'} style={{display: 'block'}}>
                    <DeleteIcon onClick={removeTask}/>
                </IconButton>
            </div>
        </ListItem>
    })

    const setAll = () => props.changeFilter('all', props.id)
    const setActive = () => props.changeFilter('active', props.id)
    const setCompleted = () => props.changeFilter('completed', props.id)
    const addTaskToTodolist = (title: string) => props.addTask(title, props.id)
    const changeTodolistTitle = (title: string) => props.changeTodolistTitle(title, props.id)
    const removeTodolist = () => props.removeTodoList(props.id)

    return (
        <div className={s.border}>
            <Container style={{display: 'flex', justifyContent: 'space-between', alignItems: "center", padding: '20px 10px 25px 20px'}}>
                <Typography variant={'h6'} style={{fontWeight: 'bold', height: "30px", flex: "1"}} color={'primary'}>
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
            <List style={{padding: "20px 10px" }}>
                {elementsTask}
            </List>
            <Container style={{display: 'flex'}}>
                <Button variant={'contained'}
                        style={{margin: "0 5px 0 0"}}
                        color={props.filter === 'all' ? 'secondary' : 'primary'}
                        onClick={setAll} >
                    All
                </Button>
                <Button variant={'contained'}
                        style={{margin: "0 5px 0 0"}}
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
}