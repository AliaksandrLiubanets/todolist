import React from 'react'
import s from './Style.module.css'
import {FilterTaskType} from './App'

type propsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
    filterTask: (filter: FilterTaskType) => void
}

export type TaskType = {
    id: number
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

    return (
        <div className={s.border}>
            <h3 className={props.title === 'Songs' ? s.h3blue : undefined}>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {elementsTask}
            </ul>
            <div>
                <button onClick={() => props.filterTask('all')}>All</button>
                <button onClick={() => props.filterTask('active')}>Active</button>
                <button onClick={() => props.filterTask('completed')}>Completed</button>
            </div>
        </div>
    )
}