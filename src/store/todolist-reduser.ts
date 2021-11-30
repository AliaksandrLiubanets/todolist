import {FilterTaskType, TodolistType} from '../App'

type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    id: string
}

type ChangeTodolistFilterAT = {
    type: "CHANGE-FILTER-TODOLIST"
    filter: FilterTaskType
    id: string
}

// const changeFilter = (filter: FilterTaskType, todoListID: string) => {
//     setTodolists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter} : tl))
// }

export type ActionsType = RemoveTodoListAT | ChangeTodolistFilterAT

export const todolistsReducer = (todoLists: Array<TodolistType>, action: ActionsType): Array<TodolistType> => {
    switch (action.type){
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.id)
        // case "CHANGE-FILTER-TODOLIST":
        //     return todoLists.map(tl => tl.id === action.id ? {...tl, action.filter} : tl)
        default:
            return todoLists
    }

}