import {FilterTaskType, TodolistType} from '../App'
import {v1} from 'uuid'
import {todoListID_1, todoListID_2} from './tasks-reduser'

export type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    todolistId: string
}

export type AddTodolistAT = {
    type: "ADD-TODOLIST"
    todolistId: string
    title: string
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

export type ActionsType = RemoveTodoListAT | AddTodolistAT | ChangeTodolistTitleAT | ChangeTodolistFilterAT

const initialState: Array<TodolistType> = [
    {id: todoListID_1, title: 'What to learn', filter: 'all'},
    {id: todoListID_2, title: 'What to buy', filter: 'all'}
]

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionsType): Array<TodolistType> => {
    switch (action.type){
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.todolistId)

        case "ADD-TODOLIST":
            const newTodolist: TodolistType = {
                id: action.todolistId,
                title: action.title,
                filter: 'all'
            }
            return [...state, newTodolist]

        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)

        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)

        default:
            return state
    }
}

export const removeTodolistAC = (id: string): RemoveTodoListAT => ({type: "REMOVE-TODOLIST", todolistId: id})

export const addTodolistAC = (title: string): AddTodolistAT => ({type: "ADD-TODOLIST", title, todolistId: v1()})

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleAT => ({type: "CHANGE-TODOLIST-TITLE", id, title})

export const changeTodolistFilterAC = (id: string, filter: FilterTaskType): ChangeTodolistFilterAT => ({type: "CHANGE-TODOLIST-FILTER", id, filter})