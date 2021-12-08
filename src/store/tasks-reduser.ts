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

type changeTaskStatusAT = {
    type: 'CHANGE-TASK-STATUS'
    id: string
    isDone: boolean
    todoListID: string
}

type ChangeTastFilterAT = {
    type: 'CHANGE-TASK-FILTER'
    id: string
    filter: FilterTaskType
};

export type ActionsType = RemoveTaskAT | AddTaskAT | changeTaskStatusAT | ChangeTastFilterAT

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

        case 'CHANGE-TASK-STATUS':
            return {...tasks, [action.todoListID]: tasks[action.todoListID].map(task => task.id === action.id ? {...task, isDone: action.isDone} : task)}

        default:
            return tasks
    }
}

export const removeTaskAC = (taskId: string, todoListID: string): RemoveTaskAT => ({type: "REMOVE-TASK", taskId, todoListID})

export const addTaskAC = (title: string, todoListID: string): AddTaskAT => ({type: "ADD-TASK", title, todoListID})

export const changeTaskStatusAC = (id: string, isDone: boolean, todoListID: string): changeTaskStatusAT => ({type: 'CHANGE-TASK-STATUS', todoListID, isDone, id})

// export const changeTodolistFilterAC = (id: string, filter: FilterTaskType): ChangeTodolistFilterAT => ({type: "CHANGE-TODOLIST-FILTER", id, filter})
