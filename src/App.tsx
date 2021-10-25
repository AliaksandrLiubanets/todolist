import React, {useState} from 'react'
import './App.css';
import {Todolist} from "./Todolist";
import { TaskType } from "./Todolist"
import {v1} from 'uuid'

export type FilterTaskType = 'all' | 'active' | 'completed'

function App() {
    console.log(v1())

    let tasks: Array<TaskType> = [
        { id: v1(), title: 'HTML&CSS', isDone: true },
        { id: v1(), title: 'JS', isDone: true },
        { id: v1(), title: 'ReactJS', isDone: false },
        { id: v1(), title: 'Redux', isDone: true },
    ]

    const [taskState, setTaskState] = useState<Array<TaskType>>(tasks)
    const [filter, setFilter] = useState<FilterTaskType>('all')

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            isDone: false,
            title: title
        }
        setTaskState([newTask, ...taskState])
    }

    const removeTask = (taskId: string) => {
        setTaskState(taskState.filter(el => el.id !== taskId))
    }

    const filterTaskFunc = (filter: FilterTaskType): Array<TaskType> => {
        return taskState.filter(el => filter === 'active' ? !el.isDone : filter === 'completed' ? el.isDone : el)
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
                      addTask={addTask}
            />
            {/*<Todolist title={'Songs'} tasks={tasks2} removeTask={removeTask}/>*/}
        </div>
    );
}

export default App;
