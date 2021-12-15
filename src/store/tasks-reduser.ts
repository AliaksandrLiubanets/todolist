
import {TaskType} from '../Todolist'
import {v1} from 'uuid'
import {AddTodolistAT, RemoveTodoListAT} from './todolist-reduser'
import {TaskStateType} from '../AppWithRedux'

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

const initialState: TaskStateType = {}

export type ActionsType = RemoveTaskAT | AddTaskAT | changeTaskStatusAT | ChangeTaskTitleAT | AddTodolistAT | RemoveTodoListAT

    export const tasksReducer = (tasks: TaskStateType = initialState, action: ActionsType): TaskStateType => {
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

        case 'REMOVE-TODOLIST':
            let tasksCopy = {...tasks}
            delete tasksCopy[action.todolistId]
            return tasksCopy

        default: return tasks

    }
}

export const removeTaskAC = (taskId: string, todoListID: string): RemoveTaskAT => ({type: "REMOVE-TASK", taskId, todoListID})

export const addTaskAC = (title: string, todoListID: string): AddTaskAT => ({type: "ADD-TASK", title, todoListID})

export const changeTaskStatusAC = (id: string, isDone: boolean, todoListID: string): changeTaskStatusAT => ({type: 'CHANGE-TASK-STATUS', todoListID, isDone, id})

export const changeTaskTitleAC = (idTask: string, title: string, todoListID: string): ChangeTaskTitleAT => ({type: 'CHANGE-TASK-TITLE', idTask, title, todoListID})
