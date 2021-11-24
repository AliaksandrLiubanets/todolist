import React, {ChangeEvent} from 'react'
import s from './Style.module.css'
import {FilterTaskType} from './App'
import AddItemForm from './AddItemForm'
import EditableSpan from './EditableSpan'
import {Button, Checkbox, Container, IconButton, List, ListItem, ListItemIcon, Typography} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

type propsType = {
    id: string
    title: string
    filter: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    setTaskStatus: (idTask: string, isDone: boolean, todoListID: string) => void
    changeFilter: (filter: FilterTaskType, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    onChange: (idTask: string, title: string, todoListID: string) => void
    changeTodolistTitle: (title: string, todoListID: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export function Todolist(props: propsType) {

    const elementsTask = props.tasks.map(el => {
        const onCheckboxCheckTask = (e: ChangeEvent<HTMLInputElement>) => props.setTaskStatus(el.id, e.currentTarget.checked, props.id)
        const onChangeTitle = (title: string) => {
            props.onChange(el.id, title, props.id)
        }
        const removeTask = () => props.removeTask(el.id, props.id)

        return <ListItem key={el.id}
                         divider
                         disableGutters
                         dense
                         style={{display: 'flex', justifyContent: 'space-between', width: "300px"}}
                         className={el.isDone ? s.is_done : ''}>
            <ListItemIcon style={{display: 'block'}}>
                <Checkbox onChange={onCheckboxCheckTask}
                          color={'primary'}
                          checked={el.isDone}
                />

            </ListItemIcon>
            <EditableSpan title={el.title} onChange={onChangeTitle}/>
            <IconButton size={'small'} style={{display: 'block'}}>
                <DeleteIcon onClick={removeTask}/>
            </IconButton>
        </ListItem>
    })

    const setAll = () => props.changeFilter('all', props.id)
    const setActive = () => props.changeFilter('active', props.id)
    const setCompleted = () => props.changeFilter('completed', props.id)


    const addTaskToTodolist = (title: string) => props.addTask(title, props.id)
    const changeTodolistTitle = (title: string) => props.changeTodolistTitle(title, props.id)
    const removeTodolist = () => props.removeTodoList(props.id)
//style={{display: 'flex', justifyContent: "space-around", justifyItems: "center", padding: "15px 20px"}}
    return (
        <div className={s.border}>
            <Container style={{display: 'flex'}}>
                <Typography variant={'h6'} style={{fontWeight: 'bold'}} color={'primary'}>
                    <EditableSpan title={props.title}
                                  onChange={changeTodolistTitle}/>
                </Typography>
                <IconButton size={'small'}
                            onClick={removeTodolist}>
                    <DeleteIcon/>
                </IconButton>

            </Container>
            <AddItemForm addItem={addTaskToTodolist}/>
            <List>
                {elementsTask}
            </List>
            <Container style={{display: "flex"}}>
                <Button variant={"contained"} color={props.filter === 'all' ? 'secondary': 'primary'} onClick={setAll}>All
                </Button>
                <Button variant={"contained"} color={props.filter === 'active' ? 'secondary': 'primary'}
                        onClick={setActive}>Active
                </Button>
                <Button variant={"contained"} color={props.filter === 'completed' ? 'secondary': 'primary'}
                        onClick={setCompleted}>Completed
                </Button>
            </Container>
        </div>
    )
}