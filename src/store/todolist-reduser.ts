import {v1} from 'uuid'
import {todoListID_1, todoListID_2} from './tasks-reduser'
import {TodolistType} from '../api/todolist-api'

export type FilterTaskType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistType & {
    filter: FilterTaskType
}

export type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    todolistId: string
}

export type AddTodolistAT = {
    type: "ADD-TODOLIST"
    todolistId: string
    title: string
}

export type SetTodolistAT = {
    type: "SET-TODOLIST"
    data: Array<TodolistType>
}

type ChangeTodolistTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
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
    {id: todoListID_1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todoListID_2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}
]

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type){
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.todolistId)

        case "ADD-TODOLIST":
            const newTodolist: TodolistDomainType = {
                id: action.todolistId,
                title: action.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }
            return [...state, newTodolist]

        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)

        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        // case 'SET-TODOLIST':
        //     return action.data

        default:
            return state
    }
}

export const removeTodolistAC = (id: string): RemoveTodoListAT => ({type: "REMOVE-TODOLIST", todolistId: id})

export const addTodolistAC = (title: string): AddTodolistAT => ({type: "ADD-TODOLIST", title, todolistId: v1()})

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleAT => ({type: "CHANGE-TODOLIST-TITLE", id, title})

export const changeTodolistFilterAC = (id: string, filter: FilterTaskType): ChangeTodolistFilterAT => ({type: "CHANGE-TODOLIST-FILTER", id, filter})
