import {FilterTaskType, TaskStateType} from '../App'
import {TaskType} from '../Todolist'
import {v1} from 'uuid'

type RemoveTaskAT = {
    type: "REMOVE-TASK"
    taskId: string
    todoListID: string
}

type AddTaskAT = {
    type: "ADD-TASK"
    title: string
    todoListID: string
}

type ChangeTaskTitleAT = {
    type: 'CHANGE-TASK-TITLE'
    id: string
    title: string
}

type ChangeTastFilterAT = {
    type: 'CHANGE-TASK-FILTER'
    id: string
    filter: FilterTaskType
};

export type ActionsType = RemoveTaskAT | AddTaskAT | ChangeTaskTitleAT | ChangeTastFilterAT

export const tasksReducer = (tasks: TaskStateType, action: ActionsType): TaskStateType => {
    switch (action.type){
        case "REMOVE-TASK":
            return {...tasks, [action.todoListID]: tasks[action.todoListID].filter(task => task.id !== action.taskId)}
        case 'ADD-TASK':
            let newTask: TaskType
            newTask = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            return {...tasks, [action.todoListID]: [newTask, ...tasks[action.todoListID]] }

        default:
            return tasks
    }
}

export const removeTaskAC = (taskId: string, todoListID: string): RemoveTaskAT => ({type: "REMOVE-TASK", taskId, todoListID})

export const addTaskAC = (title: string, todoListID: string): AddTaskAT => ({type: "ADD-TASK", title, todoListID})
//
// export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleAT => ({type: "CHANGE-TODOLIST-TITLE", id, title})
//
// export const changeTodolistFilterAC = (id: string, filter: FilterTaskType): ChangeTodolistFilterAT => ({type: "CHANGE-TODOLIST-FILTER", id, filter})
