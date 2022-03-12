import {v1} from 'uuid'
import {AddTodolistAT, RemoveTodoListAT} from './todolist-reducer'
import {TaskStatuses, TaskType, todolistAPI, TodoTaskPriorities} from '../api/todolist-api'
import {Dispatch} from 'redux'
import {log} from 'util'

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

type RemoveTaskAT = {
    type: 'REMOVE-TASK'
    taskId: string
    todoListID: string
}

type AddTaskAT = {
    type: 'ADD-TASK'
    task: TaskType
    todoListID: string
}

type SetTaskAT = {
    type: 'SET-TASK'
    task: Array<TaskType>
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
    // [todoListID_1]: [
    //     {id: v1(), title: 'HTML&CSS', description: '',
    //         status: TaskStatuses.Completed, priority: TodoTaskPriorities.Low,
    //         startDate: '',  deadline: '', todoListId: todoListID_1,
    //         order: 0, addedDate: ''},
    //     {id: v1(), title: 'JS', description: '',
    //         status: TaskStatuses.Completed, priority: TodoTaskPriorities.Low,
    //         startDate: '',  deadline: '', todoListId: todoListID_1,
    //         order: 0, addedDate: ''},
    //     {id: v1(), title: 'ReactJS', description: '',
    //         status: TaskStatuses.New, priority: TodoTaskPriorities.Low,
    //         startDate: '',  deadline: '', todoListId: todoListID_1,
    //         order: 0, addedDate: ''},
    //     {id: v1(), title: 'Redux', description: '',
    //         status: TaskStatuses.Completed, priority: TodoTaskPriorities.Low,
    //         startDate: '',  deadline: '', todoListId: todoListID_1,
    //         order: 0, addedDate: ''}
    // ],
    // [todoListID_2]: [
    //     {id: v1(), title: 'Meat', description: '',
    //         status: TaskStatuses.Completed, priority: TodoTaskPriorities.Low,
    //         startDate: '',  deadline: '', todoListId: todoListID_2,
    //         order: 0, addedDate: ''},
    //     {id: v1(), title: 'Beer', description: '',
    //         status: TaskStatuses.Completed, priority: TodoTaskPriorities.Low,
    //         startDate: '',  deadline: '', todoListId: todoListID_2,
    //         order: 0, addedDate: ''},
    //     {id: v1(), title: 'Milk', description: '',
    //         status: TaskStatuses.New, priority: TodoTaskPriorities.Low,
    //         startDate: '',  deadline: '', todoListId: todoListID_2,
    //         order: 0, addedDate: ''},
    //     {id: v1(), title: 'Bread', description: '',
    //         status: TaskStatuses.Completed, priority: TodoTaskPriorities.Low,
    //         startDate: '',  deadline: '', todoListId: todoListID_2,
    //         order: 0, addedDate: ''}
    // ]
}

export type ActionsType = RemoveTaskAT
    | AddTaskAT
    | changeTaskStatusAT
    | ChangeTaskTitleAT
    | AddTodolistAT
    | RemoveTodoListAT
    | SetTaskAT

export const tasksReducer = (state: TaskStateType = initialState, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todoListID]: state[action.todoListID].filter(task => task.id !== action.taskId)}

        case 'ADD-TASK':
            // let newTask: TaskType
            // newTask = {
            //     id: v1(),
            //     title: action.task.title,
            //     status: TaskStatuses.New,
            //     addedDate: '',
            //     deadline: '',
            //     description: '',
            //     order: 0,
            //     priority: TodoTaskPriorities.Low,
            //     startDate: '',
            //     todoListId: action.todoListID
            // }
            return {[action.todoListID]: [action.task, ...state[action.todoListID]]}

        case 'SET-TASK':
            return {[action.todoListID]: [...action.task]}

        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(task => task.id === action.id ? {
                    ...task,
                    status: action.status
                } : task)
            }

        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(task => task.id === action.idTask ? {
                    ...task,
                    title: action.title
                } : task)
            }

        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}

        case 'REMOVE-TODOLIST':
            let tasksCopy = {...state}
            delete tasksCopy[action.todolistId]
            return tasksCopy

        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todoListID: string): RemoveTaskAT => ({
    type: 'REMOVE-TASK',
    taskId,
    todoListID
})

export const addTaskAC = (task: TaskType, todoListID: string): AddTaskAT => ({type: 'ADD-TASK', task, todoListID})

export const setTaskAC = (task: Array<TaskType>, todoListID: string): SetTaskAT => ({type: 'SET-TASK', task, todoListID})

export const changeTaskStatusAC = (id: string, status: TaskStatuses, todoListID: string): changeTaskStatusAT => ({
    type: 'CHANGE-TASK-STATUS',
    todoListID,
    status,
    id
})

export const changeTaskTitleAC = (idTask: string, title: string, todoListID: string): ChangeTaskTitleAT => ({
    type: 'CHANGE-TASK-TITLE',
    idTask,
    title,
    todoListID
})

export const setTask = (todoListID: string) => (dispatch: Dispatch) => {
    return todolistAPI.getTasks(todoListID)
        .then(response => {
            console.log(`getTasks. response: ${response.data.items}`)
            const tasks: Array<TaskType> = response.data.items
            dispatch(setTaskAC(tasks, todoListID))
        })
        .catch(error => console.log(`setTusk error: ${error}`))
}

export const createTask = (todolistID: string, title: string) => (dispatch: Dispatch) => {
    return todolistAPI.createTask(todolistID, title)
        .then(response => {
            // console.log(response)
            const task: TaskType = response.data.data.item
            dispatch(addTaskAC(task, todolistID))
        })
}
