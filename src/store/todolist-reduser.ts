import {todolistAPI, TodolistType} from '../api/todolist-api'
import {Dispatch} from 'redux'

export type FilterTaskType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistType & {
    filter: FilterTaskType
}

export type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    todolistId: string
}

export type AddTodolistAT = {
    type: 'ADD-TODOLIST'
    todolist: TodolistType
}

export type SetTodolistAT = {
    type: 'SET-TODOLIST'
    data: Array<TodolistDomainType>
}

type ChangeTodolistTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    todolistId: string
    title: string
}

type ChangeTodolistFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterTaskType
};

export type ActionsType = RemoveTodoListAT
    | AddTodolistAT
    | ChangeTodolistTitleAT
    | ChangeTodolistFilterAT
    | SetTodolistAT

const initialState: Array<TodolistDomainType> = [
    // {id: todoListID_1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    // {id: todoListID_2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}
]

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todolistId)

        case 'ADD-TODOLIST':
            const newTodolist: TodolistDomainType = {
                id: action.todolist.id,
                title: action.todolist.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }
            return [newTodolist, ...state]

        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl)

        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)

        case 'SET-TODOLIST':
            return [...action.data]

        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodoListAT => {
    return {type: 'REMOVE-TODOLIST', todolistId}
}

export const addTodolistAC = (todolist: TodolistType): AddTodolistAT => {
    return {type: 'ADD-TODOLIST', todolist}
}

export const setTodolistAC = (data: Array<TodolistDomainType>): SetTodolistAT => {
    return {type: 'SET-TODOLIST', data}
}

export const changeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleAT => {
    return {type: 'CHANGE-TODOLIST-TITLE', todolistId, title}
}

export const changeTodolistFilterAC = (id: string, filter: FilterTaskType): ChangeTodolistFilterAT => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter}
}


export const setTodolist = () => (dispatch: Dispatch) => {
    return todolistAPI.getTodolists()
        .then(resolve => {
            const todoData: Array<TodolistDomainType> = resolve.data.map(tl => ({...tl, filter: 'all'}))
            dispatch(setTodolistAC(todoData))
        })
}

export const updateTodolistTitle = (todolistId: string, title: string) => (dispatch: Dispatch) => {
    return todolistAPI.updateTodolist(todolistId, title)
        .then(() => {
            dispatch(changeTodolistTitleAC(todolistId, title))
        })
        .catch(error => console.log(`Error in updateTodolistTitle: ${error}`))
}

export const createTodolist = (title: string) => (dispatch: Dispatch) => {
    return todolistAPI.createTodolist(title)
        .then(resolve => {
            const todolist: TodolistType = resolve.data.data.item
            dispatch(addTodolistAC(todolist))
        })
        .catch(error => console.log(`Error in createTodolist: ${error}`))
}

export const deleteTodolist = (todolistId: string) => (dispatch: Dispatch) => {
    return todolistAPI.deleteTodolist(todolistId)
        .then(() => {
            dispatch(removeTodolistAC(todolistId))
        })
        .catch(error => console.log(`Error in deleteTodolist: ${error}`))
}


