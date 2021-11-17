import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import s from './Style.module.css'
import {FilterTaskType, TaskType} from './App'

type propsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    filterTask: (filter: FilterTaskType) => void
    addTask: (title: string) => void
    setTaskStatus: (idTask: string, isDone: boolean) => void
    filter: string
    changeFilter: (value: string, todolistID: string) => void
}



export function Todolist(props: propsType) {

    const elementsTask = props.tasks.map(el => {
        return <li key={el.id} className={el.isDone ? s.is_done : ''}>
            <input onChange={(e: ChangeEvent<HTMLInputElement>) => props.setTaskStatus(el.id, e.currentTarget.checked)} type="checkbox" checked={el.isDone}/>
            <span>{el.title}</span>
            <button onClick={() => props.removeTask(el.id)}>x</button>
        </li>
    })

    const setAll = () => props.changeFilter('all', props.todolistID)
    const setActive = () => props.changeFilter('active', props.todolistID)
    const setCompleted = () => props.changeFilter('completed', props.todolistID)
    const setInputValue = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)
    const seInputValueOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (e.key === "Enter") {
            addTask()
        }
    }

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string>('')

    const addTask = () => {
        if (title.trim()) {
            props.addTask(title.trim())
        } else {
            setError('required')
        }
        setTitle('')
    }

    return (
        <div className={s.border}>
            <h3 className={props.title === 'Songs' ? s.h3blue : undefined}>{props.title}</h3>
            <div className={s.input_block}>
                <input className={error ? s.error : s.normal_input}
                    value={title}
                    onChange={setInputValue}
                    onKeyPress={seInputValueOnKeyPress}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={s.error_message}>{error}</div>}
            </div>
            <ul className={s.list}>
                {elementsTask}
            </ul>
            <div className={s.filter}>
                <button className={props.filter === 'all' ? s.chosen_button : s.normal_button} onClick={setAll}>All</button>
                <button className={props.filter === 'active' ? s.chosen_button : s.normal_button} onClick={setActive}>Active</button>
                <button className={props.filter === 'completed' ? s.chosen_button : s.normal_button} onClick={setCompleted}>Completed</button>
            </div>
        </div>
    )
}