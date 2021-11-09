import React, {useState} from 'react'
import './App.css';
import {Todolist} from "./Todolist";
import { TaskType } from "./Todolist"
import {v1} from 'uuid'

export type FilterTaskType = 'all' | 'active' | 'completed'

type TodolistType = {
    id: string
    title: string
    filter: FilterTaskType
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoLists, setTodolists] = useState<Array<TodolistType>>([
        {id: todoListID_1, title: "What to learn", filter: 'all'},
        {id: todoListID_2, title: "What to buy", filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListID_1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
            { id: v1(), title: 'Redux', isDone: true },
        ],
        [todoListID_2]: [
            { id: v1(), title: 'Meat', isDone: true },
            { id: v1(), title: 'Beer', isDone: true },
            { id: v1(), title: 'Milk', isDone: false },
            { id: v1(), title: 'Bread', isDone: true },
        ]
    })


    // const [taskState, setTaskState] = useState<Array<TaskType>>(tasks)
    // const [filter, setFilter] = useState<FilterTaskType>('all')

    const removeTask = (taskId: string, todoListID: string) => {
        // const copyState = {...tasks}
        // copyState[todoListID] = tasks[todoListID].filter(task => task.id !== taskId)
        // setTasks(copyState)
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(task => task.id !== taskId)})
    }

    const addTask = (title: string, todoListID: string) => {
        const newTask: TaskType = {
            id: v1(),
            isDone: false,
            title: title
        }
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
    }

    const setTaskStatus = (idTask: string, isDone: boolean, todoListID: string) => {
        setTasks({...tasks,
            [todoListID]: tasks[todoListID].map((t) => t.id === idTask ? {...t, isDone} : t)
        })
    }

    const changeFilter = (filter: FilterTaskType, todoListID: string) => {
        setTodolists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter}: tl))
    }

    const removeTodoList = (todoListID: string) => {
        setTodolists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID] //или можно ч-з фильтрацию сделать.
    }

    const todolListComponents = todoLists.map(tl => {
        let taskForRender = tasks[tl.id]
        if(tl.filter === 'active') {
            taskForRender = tasks[tl.id].filter(t => !t.isDone)
        }
        if(tl.filter === 'completed') {
            taskForRender = tasks[tl.id].filter(t => t.isDone)
        }

        return <Todolist title={tl.title}
                         key={tl.id}
                         id={tl.id}
                         filter={tl.filter}
                         tasks={taskForRender}
                         removeTask={removeTask}
                         addTask={addTask}
                         setTaskStatus={setTaskStatus}
                         removeTodoList={removeTodoList}
        />
    })

    // const filterTaskFunc = (filter: FilterTaskType): Array<TaskType> => {
    //     return taskState.filter((el) => filter === 'active' ? !el.isDone : filter === 'completed' ? el.isDone : el)
    // }
    //
    // const filteredTask = filterTaskFunc(filter)    // new filtered TaskType[]

    return (
        <div className="App">
            {todolListComponents}
            />
            {/*<Todolist title={'Songs'} tasks={tasks2} removeTask={removeTask}/>*/}
        </div>
    );
}

export default App;
