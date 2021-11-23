import React, {ChangeEvent} from 'react'
import s from './Style.module.css'
import {FilterTaskType, TaskType} from './App'
import InputField from './InputField'
import EditableSpan from './EditableSpan'
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined'
import DeleteIcon from '@material-ui/icons/Delete'

type propsType = {
    todolistID: string
    title: string
    filter: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistID: string) => void
    addTask: (title: string, todolistID: string) => void
    changeTaskStatus: (idTask: string, isDone: boolean, todolistID: string) => void
    changeFilter: (value: FilterTaskType, todolistID: string) => void
    removeTodolist: (todolistID: string) => void
    setTitleInTasksObj: (title: string, idTask: string, todolistID: string) => void
    setTitleInTodolist: (title: string, todolistID: string) => void
}

export function Todolist(props: propsType) {

    const elementsTask = props.tasks.map(el => {

        const setTitleInSpan = (title: string) => {
            props.setTitleInTasksObj(title, el.id, props.todolistID)
        }

        return <li key={el.id} className={el.isDone ? s.is_done : ''}>
            <input
                onChange={(e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(el.id, e.currentTarget.checked, props.todolistID)}
                type="checkbox" checked={el.isDone}/>
            <EditableSpan title={el.title} setTitletoState={setTitleInSpan}/>
            <DeleteIcon onClick={() => props.removeTask(el.id, props.todolistID)}/>
            {/*<button onClick={() => props.removeTask(el.id, props.todolistID)}>x</button>*/}
        </li>
    })

    const setAll = () => props.changeFilter('all', props.todolistID)
    const setActive = () => props.changeFilter('active', props.todolistID)
    const setCompleted = () => props.changeFilter('completed', props.todolistID)
    const removeTodolist = () => {
        props.removeTodolist(props.todolistID)
    }

    const addTaskForInput = (title: string) => {
        props.addTask(title, props.todolistID)
    }

    const setTodolistTitle = (title: string) => {
        props.setTitleInTodolist(title, props.todolistID)
    }

    return (
        <div className={s.border}>
            <h3 className={props.title === 'Songs' ? s.h3blue : undefined}><EditableSpan title={props.title}
                                                                                         setTitletoState={setTodolistTitle}/>
                {/*<DeleteOutlinedIcon onClick={removeTodolist} />*/}
                <DeleteIcon onClick={removeTodolist}/>
                {/*<button onClick={removeTodolist}>x</button>*/}
            </h3>
            <InputField addItem={addTaskForInput}/>
            <ul className={s.list}>
                {elementsTask}
            </ul>
            <div className={s.filter}>
                <button className={props.filter === 'all' ? s.chosen_button : s.normal_button} onClick={setAll}>All
                </button>
                <button className={props.filter === 'active' ? s.chosen_button : s.normal_button}
                        onClick={setActive}>Active
                </button>
                <button className={props.filter === 'completed' ? s.chosen_button : s.normal_button}
                        onClick={setCompleted}>Completed
                </button>
            </div>
        </div>
    )
}