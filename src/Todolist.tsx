import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import s from './Style.module.css'
import {FilterTaskType} from './App'

type propsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    filterTask: (filter: FilterTaskType) => void
    addTask: (title: string) => void
    setTaskStatus: (idTask: string, isDone: boolean) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export function Todolist(props: propsType) {

    const elementsTask = props.tasks.map(el => {
        return <li key={el.id}>
            <input onChange={(e: ChangeEvent<HTMLInputElement>) => props.setTaskStatus(el.id, e.currentTarget.checked)} type="checkbox" checked={el.isDone}/>
            <span>{el.title}</span>
            <button onClick={() => props.removeTask(el.id)}>x</button>
        </li>
    })

    const setAll = () => props.filterTask('all')
    const setActive = () => props.filterTask('active')
    const setCompleted = () => props.filterTask('completed')
    const setInputValue = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)
    const seInputValueOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }

    const [title, setTitle] = useState<string>('')
    const addTask = () => {
        if (title) {
            props.addTask(title)
        }
        setTitle('')
    }

    return (
        <div className={s.border}>
            <h3 className={props.title === 'Songs' ? s.h3blue : undefined}>{props.title}</h3>
            <div className={s.input_block}>
                <input
                    value={title}
                    onChange={setInputValue}
                    onKeyPress={seInputValueOnKeyPress}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul className={s.list}>
                {elementsTask}
            </ul>
            <div className={s.filter}>
                <button onClick={setAll}>All</button>
                <button onClick={setActive}>Active</button>
                <button onClick={setCompleted}>Completed</button>
            </div>
        </div>
    )
}