import React from "react"
import s from './Style.module.css'

type propsType = {
    title: string
    tasks: Array<TaskType>
}

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export function Todolist(props: propsType) {
    return (
        <div className={s.border}>
            <h3 className={ props.title==='Songs' ? s.h3blue : undefined}>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(el => <li key={el.id}><input type="checkbox" checked={el.isDone}/><span>{el.title}</span></li>)}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}