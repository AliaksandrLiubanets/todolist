import {todolistAPI, TodolistType} from '../../api/todolist-api'
import {Dispatch} from 'redux'


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


//thunks:

export const setTodolists = () => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.getTodolists()
        .then(resolve => {
            const todoData: Array<TodolistDomainType> = resolve.data.map(tl => ({...tl, filter: 'all'}))
            dispatch(setTodolistsAC(todoData))
        })
}

export const updateTodolistTitle = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.updateTodolist(todolistId, title)
        .then(() => {
            dispatch(changeTodolistTitleAC(todolistId, title))
        })
        .catch(error => console.log(`Error in updateTodolistTitle: ${error}`))
}

export const createTodolist = (title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.createTodolist(title)
        .then(resolve => {
            const todolistFromServer: TodolistType = resolve.data.data.item
            const todolist: TodolistDomainType = {...todolistFromServer, filter: 'all'}
            dispatch(addTodolistAC(todolist))
        })
        .catch(error => console.log(`Error in createTodolist: ${error}`))
}

export const deleteTodolist = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.deleteTodolist(todolistId)
        .then(() => {
            dispatch(removeTodolistAC(todolistId))
        })
        .catch(error => console.log(`Error in deleteTodolist: ${error}`))
}


//types:

export type FilterTaskType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistType & {
    filter: FilterTaskType
}

export type AddTodolistAT = ReturnType<typeof addTodolistAC>
export type RemoveTodoListAT = ReturnType<typeof removeTodolistAC>
export type SetTodolistsAT = ReturnType<typeof setTodolistsAC>

type ActionsType =
    | RemoveTodoListAT
    | AddTodolistAT
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistsAT