import {AddTodolistAT, RemoveTodoListAT, SetTodolistsAT} from './todolist-reducer'
import {TaskStatuses, TaskType, todolistAPI, TodoTaskPriorities, UpdateTaskModelType} from '../api/todolist-api'
import {Dispatch} from 'redux'
import {AppRootStateType} from './store'


const initialState: TaskStateType = {}

type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof setTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistAT
    | RemoveTodoListAT
    | SetTodolistsAT


export const tasksReducer = (state: TaskStateType = initialState, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todoListID]: state[action.todoListID].filter(task => task.id !== action.taskId)}

        case 'ADD-TASK':
            return {...state, [action.todoListID]: [action.task, ...state[action.todoListID]]}

        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}

        case 'REMOVE-TODOLIST':
            let tasksCopy = {...state}
            delete tasksCopy[action.todolistId]
            return tasksCopy

        case 'SET-TODOLIST': {
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }

        case 'SET-TASKS':
            return {...state, [action.todoListID]: action.tasks}

        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(tl => tl.id === action.idTask ? {...tl, ...action.model} : tl)
            }

        default:
            return state
    }
}

const removeTaskAC = (taskId: string, todoListID: string) => {
    return { type: 'REMOVE-TASK', taskId, todoListID } as const
}

const addTaskAC = (task: TaskType, todoListID: string) => {
    return { type: 'ADD-TASK', task, todoListID } as const
}

const setTaskAC = (tasks: Array<TaskType>, todoListID: string) => {
    return { type: 'SET-TASKS', tasks, todoListID } as const
}

const updateTaskAC = (todoListID: string, idTask: string, model: UpdateDomainTaskModelType) => {
    return { type: 'UPDATE-TASK', idTask, model, todoListID } as const
}

export const setTask = (todoListID: string) => (dispatch: Dispatch) => {
    return todolistAPI.getTasks(todoListID)
        .then(response => {
            const tasks: Array<TaskType> = response.data.items
            dispatch(setTaskAC(tasks, todoListID))
        })
        .catch(error => console.log(`setTusk error: ${error}`))
}

export const createTask = (todoListID: string, title: string) => (dispatch: Dispatch) => {
    return todolistAPI.createTask(todoListID, title)
        .then(response => {
            const task: TaskType = response.data.data.item
            dispatch(addTaskAC(task, todoListID))
        })
}

export const removeTask = (todoListID: string, taskId: string) => (dispatch: Dispatch) => {
    return todolistAPI.deleteTask(todoListID, taskId)
        .then(() => {
            dispatch(removeTaskAC(taskId, todoListID))
        })
}

export const updateTask = (todoListID: string, taskId: string, model: UpdateDomainTaskModelType) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const task = getState().tasks[todoListID].find(task => task.id === taskId)

    if (!task) {
        console.warn('There is not found task!')
        return
    }

    const taskModel: UpdateTaskModelType = {
        title: task.title,
        status: task.status,
        startDate: task.startDate,
        priority: task.priority,
        deadline: task.deadline,
        description: task.description,
        completed: false,
        ...model
    }
    return todolistAPI.updateTask(todoListID, taskId, taskModel)
        .then(() => {
            dispatch(updateTaskAC(todoListID, taskId, model))
        })
}


export type TaskStateType = {
    [key: string]: Array<TaskType>
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    completed?: boolean
    status?: TaskStatuses
    priority?: TodoTaskPriorities
    startDate?: string
    deadline?: string
}