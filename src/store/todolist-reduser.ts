import {FilterTaskType, TodolistType} from '../App'
import {v1} from 'uuid'

type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    id: string
}

type AddTodolistAT = {
    type: "ADD-TODOLIST"
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

export const todolistsReducer = (todoLists: Array<TodolistType>, action: ActionsType): Array<TodolistType> => {
    switch (action.type){
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            const todoListID = v1()
            const newTodolist: TodolistType = {
                id: todoListID,
                title: action.title,
                filter: 'all'
            }
            return [...todoLists, newTodolist]
        case 'CHANGE-TODOLIST-TITLE':
            return todoLists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return todoLists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default:
            return todoLists
    }

}