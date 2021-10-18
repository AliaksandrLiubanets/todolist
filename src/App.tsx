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

    const removeTask = (taskId: number) => {
        setTaskState(taskState.filter(el => el.id !== taskId))
        console.log(taskState)
    }

    const [activeTask, setActiveTask] = useState(tasks)
    const [filter, setFilter] = useState<FilterTaskType>('all')

    let tasksForRender = taskState
    if (filter === 'active') {
        tasksForRender = taskState.filter(el => el.isDone === false)
    }
    if (filter === 'completed') {
        tasksForRender = taskState.filter(el => el.isDone === true)
    }
    if (filter === 'all') {
        tasksForRender = taskState.filter(el => el)
    }

    const filterTask = (filter: FilterTaskType) => {
        setFilter(filter)
    }
   /* const tasks2 = [
        { id: 1, title: 'Hello world', isDone: true },
        { id: 2, title: 'I am Happy', isDone: false },
        { id: 3, title: 'Yo', isDone: false },
        { id: 4, title: 'Yo', isDone: false },
    ]*/



    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      tasks={tasksForRender}
                      removeTask={removeTask}
                      filterTask={filterTask}
            />
            {/*<Todolist title={'Songs'} tasks={tasks2} removeTask={removeTask}/>*/}
        </div>
    );
}

export default App;
