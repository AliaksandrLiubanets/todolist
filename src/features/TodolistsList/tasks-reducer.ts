import {AddTodolistAT, ChangeTodolistFilterAT, ClearStateAT, RemoveTodoListAT, SetTodolistsAT} from './todolist-reducer'
import {TaskStatuses, TaskType, todolistAPI, TodoTaskPriorities, UpdateTaskModelType} from '../../api/todolist-api'
import {Dispatch} from 'redux'
import {AppRootStateType} from '../../app/store'
import {SetAppErrorAT, setAppStatusAC, SetAppStatusAT} from '../../app/app-reducer'
import {handleServerAppError, handleServerNetworkError} from '../../utils/handle-error-utils'


const initialState: TaskStateType = {}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(task => task.id !== action.taskId)}

        case 'ADD-TASK':
            return {...state, [action.todolistId]: [action.task, ...state[action.todolistId]]}

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
            return {...state, [action.todolistId]: action.tasks}

        case 'UPDATE-TASK':
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(tl => tl.id === action.idTask ? {...tl, ...action.model} : tl)
            }
        case 'CLEAR-STATE':
            return {}

        default:
            return state
    }
}


//actions:

export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE-TASK', taskId, todolistId} as const)

export const addTaskAC = (task: TaskType, todolistId: string) =>
    ({type: 'ADD-TASK', task, todolistId} as const)

export const setTaskAC = (tasks: Array<TaskType>, todolistId: string) =>
    ({type: 'SET-TASKS', tasks, todolistId} as const)

export const updateTaskAC = (todolistId: string, idTask: string, model: UpdateDomainTaskModelType) =>
    ({type: 'UPDATE-TASK', idTask, model, todolistId} as const)


//thunks:

export const setTask = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.getTasks(todolistId)
        .then(response => {
            const tasks: Array<TaskType> = response.data.items
            dispatch(setTaskAC(tasks, todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}

export const createTask = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                const task: TaskType = res.data.data.item
                dispatch(addTaskAC(task, todolistId))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}

export const removeTask = (todolistId: string, taskId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.deleteTask(todolistId, taskId)
        .then(() => {
            dispatch(removeTaskAC(taskId, todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}

export const updateTask = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) => (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
    dispatch(setAppStatusAC('loading'))
    const task = getState().tasks[todolistId].find(task => task.id === taskId)

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
    todolistAPI.updateTask(todolistId, taskId, taskModel)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(updateTaskAC(todolistId, taskId, model))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}


//types:

export type SetTasksAT = ReturnType<typeof setTaskAC>

type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | SetTasksAT
    | ReturnType<typeof updateTaskAC>
    | AddTodolistAT
    | RemoveTodoListAT
    | SetTodolistsAT
    | SetAppErrorAT
    | SetAppStatusAT
    | ChangeTodolistFilterAT
    | ClearStateAT

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