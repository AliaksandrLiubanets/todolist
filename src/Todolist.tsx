import React, {ChangeEvent} from 'react'
import s from './Style.module.css'
import {FilterTaskType} from './App'
import AddItemForm from './AddItemForm'
import EditableSpan from './EditableSpan'

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
    // setTaskTitle: (idTask: string, title: string, todoListID: string) => void
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

        return <li key={el.id} className={el.isDone ? s.is_done : ''}>
            <input onChange={onCheckboxCheckTask} type="checkbox" checked={el.isDone}/>
            <EditableSpan title={el.title} onChange={onChangeTitle}/>
            <button onClick={() => props.removeTask(el.id, props.id)}>x</button>
        </li>
    })

    const setAll = () => props.changeFilter('all', props.id)
    const setActive = () => props.changeFilter('active', props.id)
    const setCompleted = () => props.changeFilter('completed', props.id)


    const addTaskToTodolist = (title: string) => {
        props.addTask(title, props.id)
    }

    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(title, props.id)
    }

    return (
        <div className={s.border}>
            <div className={s.title}>
                <h3 className={props.title === 'Songs' ? s.h3blue : undefined}><EditableSpan title={props.title} onChange={changeTodolistTitle} /></h3>
                <div className={s.title__button}>
                    <button onClick={() => {
                        props.removeTodoList(props.id)
                    }}>X
                    </button>
                </div>
            </div>
            <AddItemForm addItem={addTaskToTodolist}/>
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