import {FilterTaskType, TodolistType} from '../App'
import {v1} from 'uuid'

type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    id: string
}

type ChangeTodolistFilterAT = {
    type: "CHANGE-FILTER-TODOLIST"
    filter: FilterTaskType
    id: string
}

type AddTodolistAT = {
    type: "ADD-TODOLIST"
    title: string
}

export type ActionsType = RemoveTodoListAT | ChangeTodolistFilterAT | AddTodolistAT

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

        default:
            return todoLists
    }

}