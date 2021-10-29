import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import s from './Style.module.css'
import {FilterTaskType} from './App'

type propsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    filterTask: (filter: FilterTaskType) => void
    setNewTask: (value: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export function Todolist(props: propsType) {

    const elementsTask = props.tasks.map(el => {
        return <li key={el.id}>
            <input type="checkbox" checked={el.isDone}/>
            <span>{el.title}</span>
            <button onClick={() => { props.removeTask(el.id) } }>x</button>
        </li>
    })

    const [value, setValue] = useState('')
    const setValueToTask = () => {
        if(value !== '') {
            props.setNewTask(value)
        }
        setValue('')
    }
    const changeCurrentValue = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)
    const onKeyPressSetValueToTask = (e: KeyboardEvent<HTMLInputElement>) => (e.key === "Enter") && setValueToTask()
    const filterAll = () => props.filterTask('all')
    const filterActive = () => props.filterTask('active')
    const filterCompleted = () => props.filterTask('completed')


    return (
        <div className={s.border}>
            <h3 className={props.title === 'Songs' ? s.h3blue : undefined}>{props.title}</h3>
            <div>
                <input onKeyPress={onKeyPressSetValueToTask} onChange={changeCurrentValue} value={value}/>
                <button onClick={setValueToTask}>+</button>
            </div>
            <ul>
                {elementsTask}
            </ul>
            <div>
                <button onClick={filterAll}>All</button>
                <button onClick={filterActive}>Active</button>
                <button onClick={filterCompleted}>Completed</button>
            </div>
        </div>
    )
}