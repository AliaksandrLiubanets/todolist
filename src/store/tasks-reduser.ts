
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

export const todoListID_1 = v1()
export const todoListID_2 = v1()

const initialState: TaskStateType = {
    [todoListID_1]: [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: true}
    ],
    [todoListID_2]: [
        {id: v1(), title: 'Meat', isDone: true},
        {id: v1(), title: 'Beer', isDone: true},
        {id: v1(), title: 'Milk', isDone: false},
        {id: v1(), title: 'Bread', isDone: true}
    ]
}

export type ActionsType = RemoveTaskAT | AddTaskAT | changeTaskStatusAT | ChangeTaskTitleAT | AddTodolistAT | RemoveTodoListAT

    export const tasksReducer = (state: TaskStateType = initialState, action: ActionsType): TaskStateType => {
    switch (action.type){
        case "REMOVE-TASK":
            return {...state, [action.todoListID]: state[action.todoListID].filter(task => task.id !== action.taskId)}

        case 'ADD-TASK':
            let newTask: TaskType
            newTask = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            return {...state, [action.todoListID]: [newTask, ...state[action.todoListID]] }

        case 'CHANGE-TASK-STATUS':
            return {...state, [action.todoListID]: state[action.todoListID].map(task => task.id === action.id ? {...task, isDone: action.isDone} : task)}

        case 'CHANGE-TASK-TITLE':
            return {...state, [action.todoListID]: state[action.todoListID].map(task => task.id === action.idTask ? {...task, title: action.title} : task)}

        case "ADD-TODOLIST":
            return {...state, [action.todolistId]: []}

        case 'REMOVE-TODOLIST':
            let tasksCopy = {...state}
            delete tasksCopy[action.todolistId]
            return tasksCopy

        default:
            return state

    }
}

export const removeTaskAC = (taskId: string, todoListID: string): RemoveTaskAT => ({type: "REMOVE-TASK", taskId, todoListID})

export const addTaskAC = (title: string, todoListID: string): AddTaskAT => ({type: "ADD-TASK", title, todoListID})

export const changeTaskStatusAC = (id: string, isDone: boolean, todoListID: string): changeTaskStatusAT => ({type: 'CHANGE-TASK-STATUS', todoListID, isDone, id})

export const changeTaskTitleAC = (idTask: string, title: string, todoListID: string): ChangeTaskTitleAT => ({type: 'CHANGE-TASK-TITLE', idTask, title, todoListID})
