import {todolistAPI, TodolistType} from '../../api/todolist-api'
import {Dispatch} from 'redux'
import {SetAppErrorAT, setAppStatusAC, SetAppStatusAT} from '../../app/app-reducer'
import {handleServerNetworkError} from '../../utils/handle-error-utils'
import {setTask, SetTasksAT} from './tasks-reducer'
import {ThunkAction} from 'redux-thunk'
import {AppRootStateType} from '../../app/store'


const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todolistId)

        case 'ADD-TODOLIST':
            return [action.todolist, ...state]

        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl)

        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl)

        case 'SET-TODOLIST':
            return [...action.todolists]

        case 'CLEAR-STATE':
            return []

        default:
            return state
    }
}


//actions:

export const removeTodolistAC = (todolistId: string) =>
    ({type: 'REMOVE-TODOLIST', todolistId} as const)

export const addTodolistAC = (todolist: TodolistDomainType) =>
    ({type: 'ADD-TODOLIST', todolist} as const)

export const setTodolistsAC = (data: Array<TodolistDomainType>) =>
    ({type: 'SET-TODOLIST', todolists: data} as const)

export const changeTodolistTitleAC = (todolistId: string, title: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', todolistId, title} as const)

export const changeTodolistFilterAC = (todolistId: string, filter: FilterTaskType) =>
    ({type: 'CHANGE-TODOLIST-FILTER', todolistId, filter} as const)

export const clearStateAC = () => ({type: 'CLEAR-STATE'} as const)


//thunks:

export const setTodolists = (): ThunkAction<void, AppRootStateType, unknown, ActionsType> => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.getTodolists()
        .then(resolve => {
            const todoData: Array<TodolistDomainType> = resolve.data.map(tl => ({...tl, filter: 'all'}))
            dispatch(setTodolistsAC(todoData))
            dispatch(setAppStatusAC('succeeded'))
            return resolve.data
        })
        .then(todolists => {
            todolists.forEach(tl => {
                dispatch(setTask(tl.id))
            })
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}

export const updateTodolistTitle = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.updateTodolist(todolistId, title)
        .then(() => {
            dispatch(changeTodolistTitleAC(todolistId, title))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}

export const createTodolist = (title: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.createTodolist(title)
        .then(resolve => {
            const todolistFromServer: TodolistType = resolve.data.data.item
            const todolist: TodolistDomainType = {...todolistFromServer, filter: 'all'}
            dispatch(addTodolistAC(todolist))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}

export const deleteTodolist = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.deleteTodolist(todolistId)
        .then(() => {
            dispatch(removeTodolistAC(todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}


//types:

export type FilterTaskType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistType & {
    filter: FilterTaskType
}

export type AddTodolistAT = ReturnType<typeof addTodolistAC>
export type RemoveTodoListAT = ReturnType<typeof removeTodolistAC>
export type SetTodolistsAT = ReturnType<typeof setTodolistsAC>
export type ChangeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>
export type ClearStateAT = ReturnType<typeof clearStateAC>

type ActionsType =
    | RemoveTodoListAT
    | AddTodolistAT
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistsAT
    | SetAppErrorAT
    | SetAppStatusAT
    | SetTasksAT
    | ClearStateAT