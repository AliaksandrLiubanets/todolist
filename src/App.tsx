import React, {useState} from 'react'
import './App.css';
import {Todolist} from "./Todolist";
import { TaskType } from "./Todolist"
import {v1} from 'uuid'

export type FilterTaskType = 'all' | 'active' | 'completed'

function App() {

    let tasks: Array<TaskType> = [
        { id: v1(), title: 'HTML&CSS', isDone: true },
        { id: v1(), title: 'JS', isDone: true },
        { id: v1(), title: 'ReactJS', isDone: false },
        { id: v1(), title: 'Redux', isDone: true },
    ]

    const [taskState, setTaskState] = useState<Array<TaskType>>(tasks)

    const removeTask = (taskId: string) => {
        setTaskState(taskState.filter(el => el.id !== taskId))
    }

    const [filter, setFilter] = useState<FilterTaskType>('all')

    let tasksForRender = taskState

    if (filter === 'active') {
        tasksForRender = taskState.filter(el => !el.isDone)
    } else if (filter === 'completed') {
        tasksForRender = taskState.filter(el => el.isDone)
    } else {
        tasksForRender = taskState
    }

    const setNewTask = (value: string) => {
        setTaskState([{id: v1(), title: value, isDone: false}, ...tasksForRender])
    }

    const filterTask = (filter: FilterTaskType) => {
        setFilter(filter)
    }

    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      tasks={tasksForRender}
                      removeTask={removeTask}
                      filterTask={filterTask}
                      setNewTask={setNewTask}
            />
            {/*<Todolist title={'Songs'} tasks={tasks2} removeTask={removeTask}/>*/}
        </div>
    );
}

export default App;
