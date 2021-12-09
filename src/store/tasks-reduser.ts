import {TaskStateType} from '../App'
import {TaskType} from '../Todolist'
import {v1} from 'uuid'
import {AddTodolistAT} from './todolist-reduser'

type RemoveTaskAT = {
    type: "REMOVE-TASK"
    taskId: string
    todoListID: string
}

type AddTaskAT = {
    type: "ADD-TASK"
    title: string
    todoListID: string
}

type changeTaskStatusAT = {
    type: 'CHANGE-TASK-STATUS'
    id: string
    isDone: boolean
    todoListID: string
}

type ChangeTaskTitleAT = {
    type: 'CHANGE-TASK-TITLE'
    idTask: string
    todoListID: string
    title: string
};

// type AddTodolistAT = {
//     type: 'ADD-TODOLIST'
//     title: string
// };

export type ActionsType = RemoveTaskAT | AddTaskAT | changeTaskStatusAT | ChangeTaskTitleAT | AddTodolistAT

    export const tasksReducer = (tasks: TaskStateType, action: ActionsType): TaskStateType => {
    switch (action.type){
        case "REMOVE-TASK":
            return {...tasks, [action.todoListID]: tasks[action.todoListID].filter(task => task.id !== action.taskId)}

        case 'ADD-TASK':
            let newTask: TaskType
            newTask = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            return {...tasks, [action.todoListID]: [newTask, ...tasks[action.todoListID]] }

        case 'CHANGE-TASK-STATUS':
            return {...tasks, [action.todoListID]: tasks[action.todoListID].map(task => task.id === action.id ? {...task, isDone: action.isDone} : task)}

        case 'CHANGE-TASK-TITLE':
            return {...tasks, [action.todoListID]: tasks[action.todoListID].map(task => task.id === action.idTask ? {...task, title: action.title} : task)}

        case "ADD-TODOLIST":
            // const todolistID = v1()
            // const newTodolist: TodolistType = {
            //     id: todolistID,
            //     filter: 'all',
            //     title: action.title
            // }
            return {...tasks, [action.todolistId]: []}
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todoListID: string): RemoveTaskAT => ({type: "REMOVE-TASK", taskId, todoListID})

export const addTaskAC = (title: string, todoListID: string): AddTaskAT => ({type: "ADD-TASK", title, todoListID})

export const changeTaskStatusAC = (id: string, isDone: boolean, todoListID: string): changeTaskStatusAT => ({type: 'CHANGE-TASK-STATUS', todoListID, isDone, id})

export const changeTaskTitleAC = (idTask: string, title: string, todoListID: string): ChangeTaskTitleAT => ({type: 'CHANGE-TASK-TITLE', idTask, title, todoListID})
//
// export const AddTodolistAC = (title: string): AddTodolistAT => ({type: 'ADD-TODOLIST', title})
