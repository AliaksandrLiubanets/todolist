import {v1} from 'uuid'
import {AddTodolistAT, RemoveTodoListAT} from './todolist-reduser'
import {TaskStateType} from '../AppWithReducers'
import {TaskStatuses, TaskType, TodoTaskPriorities} from '../api/todolist-api'

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
    status: TaskStatuses
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
        {id: v1(), title: 'HTML&CSS', description: '',
            status: TaskStatuses.Completed, priority: TodoTaskPriorities.Low,
            startDate: '',  deadline: '', todoListId: todoListID_1,
            order: 0, addedDate: ''},
        {id: v1(), title: 'JS', description: '',
            status: TaskStatuses.Completed, priority: TodoTaskPriorities.Low,
            startDate: '',  deadline: '', todoListId: todoListID_1,
            order: 0, addedDate: ''},
        {id: v1(), title: 'ReactJS', description: '',
            status: TaskStatuses.New, priority: TodoTaskPriorities.Low,
            startDate: '',  deadline: '', todoListId: todoListID_1,
            order: 0, addedDate: ''},
        {id: v1(), title: 'Redux', description: '',
            status: TaskStatuses.Completed, priority: TodoTaskPriorities.Low,
            startDate: '',  deadline: '', todoListId: todoListID_1,
            order: 0, addedDate: ''}
    ],
    [todoListID_2]: [
        {id: v1(), title: 'Meat', description: '',
            status: TaskStatuses.Completed, priority: TodoTaskPriorities.Low,
            startDate: '',  deadline: '', todoListId: todoListID_2,
            order: 0, addedDate: ''},
        {id: v1(), title: 'Beer', description: '',
            status: TaskStatuses.Completed, priority: TodoTaskPriorities.Low,
            startDate: '',  deadline: '', todoListId: todoListID_2,
            order: 0, addedDate: ''},
        {id: v1(), title: 'Milk', description: '',
            status: TaskStatuses.New, priority: TodoTaskPriorities.Low,
            startDate: '',  deadline: '', todoListId: todoListID_2,
            order: 0, addedDate: ''},
        {id: v1(), title: 'Bread', description: '',
            status: TaskStatuses.Completed, priority: TodoTaskPriorities.Low,
            startDate: '',  deadline: '', todoListId: todoListID_2,
            order: 0, addedDate: ''}
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
                status: TaskStatuses.New,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: TodoTaskPriorities.Low,
                startDate: '',
                todoListId: ''
            }
            return {...state, [action.todoListID]: [newTask, ...state[action.todoListID]] }

        case 'CHANGE-TASK-STATUS':
            debugger
            return {...state, [action.todoListID]: state[action.todoListID].map(task => task.id === action.id ? {...task, status: action.status} : task)}

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

export const changeTaskStatusAC = (id: string, status: TaskStatuses, todoListID: string): changeTaskStatusAT => ({type: 'CHANGE-TASK-STATUS', todoListID, status, id})

export const changeTaskTitleAC = (idTask: string, title: string, todoListID: string): ChangeTaskTitleAT => ({type: 'CHANGE-TASK-TITLE', idTask, title, todoListID})
