import React, {useState} from 'react'
import './App.css';
import {Todolist} from "./Todolist";
import { TaskType } from "./Todolist"

export type FilterTaskType = 'all' | 'active' | 'completed'

function App() {

    let tasks: Array<TaskType> = [
        { id: 1, title: 'HTML&CSS', isDone: true },
        { id: 2, title: 'JS', isDone: true },
        { id: 3, title: 'ReactJS', isDone: false },
        { id: 4, title: 'Redux', isDone: true },
    ]

    const [taskState, setTaskState] = useState<Array<TaskType>>(tasks)
    const [filter, setFilter] = useState<FilterTaskType>('all')

    const removeTask = (taskId: number) => {
        setTaskState(taskState.filter(el => el.id !== taskId))
    }

    const filterTaskFunc = (filter: FilterTaskType): Array<TaskType> => {
        return taskState.filter(el => {
            if (filter === 'active') {
                return !el.isDone
            }
            if (filter === 'completed') {
                return el.isDone
            } else {
                return el
            }
        })
    }

    const filteredTask = filterTaskFunc(filter)    // new filtered TaskType[]

   /* const tasks2 = [
        { id: 1, title: 'Hello world', isDone: true },
        { id: 2, title: 'I am Happy', isDone: false },
        { id: 3, title: 'Yo', isDone: false },
        { id: 4, title: 'Yo', isDone: false },
    ]*/

    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      tasks={filteredTask}
                      removeTask={removeTask}
                      filterTask={setFilter}
            />
            {/*<Todolist title={'Songs'} tasks={tasks2} removeTask={removeTask}/>*/}
        </div>
    );
}

export default App;
