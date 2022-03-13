import {v1} from 'uuid'
import {AddTodolistAT, RemoveTodoListAT, SetTodolistsAT} from './todolist-reducer'
import {TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType} from '../api/todolist-api'
import {Dispatch} from 'redux'

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

type RemoveTaskAT = {
    type: 'REMOVE-TASK'
    taskId: string
    todoListID: string
}

type AddTaskAT = {
    type: 'ADD-TASK'
    task: TaskType
    todoListID: string
}

type SetTaskAT = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todoListID: string
}

type changeTaskStatusAT = {
    type: 'CHANGE-TASK-STATUS'
    id: string
    status: TaskStatuses
    todoListID: string
}

type ChangeTaskTitleAT = {
    type: 'CHANGE-TASK-TITLE'
    idTask: string
    todoListID: string
    title: string
};

export const todoListID_1 = v1()
export const todoListID_2 = v1()

const initialState: TaskStateType = {
    // [todoListID_1]: [
    //     {id: v1(), title: 'HTML&CSS', description: '',
    //         status: TaskStatuses.Completed, priority: TodoTaskPriorities.Low,
    //         startDate: '',  deadline: '', todoListId: todoListID_1,
    //         order: 0, addedDate: ''},
    //     {id: v1(), title: 'JS', description: '',
    //         status: TaskStatuses.Completed, priority: TodoTaskPriorities.Low,
    //         startDate: '',  deadline: '', todoListId: todoListID_1,
    //         order: 0, addedDate: ''},
    //     {id: v1(), title: 'ReactJS', description: '',
    //         status: TaskStatuses.New, priority: TodoTaskPriorities.Low,
    //         startDate: '',  deadline: '', todoListId: todoListID_1,
    //         order: 0, addedDate: ''},
    //     {id: v1(), title: 'Redux', description: '',
    //         status: TaskStatuses.Completed, priority: TodoTaskPriorities.Low,
    //         startDate: '',  deadline: '', todoListId: todoListID_1,
    //         order: 0, addedDate: ''}
    // ],
    // [todoListID_2]: [
    //     {id: v1(), title: 'Meat', description: '',
    //         status: TaskStatuses.Completed, priority: TodoTaskPriorities.Low,
    //         startDate: '',  deadline: '', todoListId: todoListID_2,
    //         order: 0, addedDate: ''},
    //     {id: v1(), title: 'Beer', description: '',
    //         status: TaskStatuses.Completed, priority: TodoTaskPriorities.Low,
    //         startDate: '',  deadline: '', todoListId: todoListID_2,
    //         order: 0, addedDate: ''},
    //     {id: v1(), title: 'Milk', description: '',
    //         status: TaskStatuses.New, priority: TodoTaskPriorities.Low,
    //         startDate: '',  deadline: '', todoListId: todoListID_2,
    //         order: 0, addedDate: ''},
    //     {id: v1(), title: 'Bread', description: '',
    //         status: TaskStatuses.Completed, priority: TodoTaskPriorities.Low,
    //         startDate: '',  deadline: '', todoListId: todoListID_2,
    //         order: 0, addedDate: ''}
    // ]
}

export type ActionsType = RemoveTaskAT
    | AddTaskAT
    | changeTaskStatusAT
    | ChangeTaskTitleAT
    | AddTodolistAT
    | RemoveTodoListAT
    | SetTaskAT
    | SetTodolistsAT

export const tasksReducer = (state: TaskStateType = initialState, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todoListID]: state[action.todoListID].filter(task => task.id !== action.taskId)}

        case 'ADD-TASK':
            return {...state, [action.todoListID]: [action.task, ...state[action.todoListID]]}

        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(task => task.id === action.id ? {
                    ...task,
                    status: action.status
                } : task)
            }

        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].map(task => task.id === action.idTask ? {
                    ...task,
                    title: action.title
                } : task)
            }

        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}

        case 'REMOVE-TODOLIST':
            let tasksCopy = {...state}
            delete tasksCopy[action.todolistId]
            return tasksCopy

        case 'SET-TODOLIST': {
            const copyState = {...state}
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState
        }

        case 'SET-TASKS':
            return {...state, [action.todoListID]: action.tasks}

        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todoListID: string): RemoveTaskAT => ({
    type: 'REMOVE-TASK',
    taskId,
    todoListID
})

export const addTaskAC = (task: TaskType, todoListID: string): AddTaskAT => ({type: 'ADD-TASK', task, todoListID})

export const setTaskAC = (tasks: Array<TaskType>, todoListID: string): SetTaskAT => ({
    type: 'SET-TASKS',
    tasks,
    todoListID
})

export const changeTaskStatusAC = (todoListID: string, id: string, status: TaskStatuses): changeTaskStatusAT => {
    return { type: 'CHANGE-TASK-STATUS', todoListID, status, id }
}

export const changeTaskTitleAC = (idTask: string, title: string, todoListID: string): ChangeTaskTitleAT => ({
    type: 'CHANGE-TASK-TITLE',
    idTask,
    title,
    todoListID
})

export const setTask = (todoListID: string) => (dispatch: Dispatch) => {
    return todolistAPI.getTasks(todoListID)
        .then(response => {
            const tasks: Array<TaskType> = response.data.items
            dispatch(setTaskAC(tasks, todoListID))
        })
        .catch(error => console.log(`setTusk error: ${error}`))
}

export const createTask = (todoListID: string, title: string) => (dispatch: Dispatch) => {
    return todolistAPI.createTask(todoListID, title)
        .then(response => {
            const task: TaskType = response.data.data.item
            dispatch(addTaskAC(task, todoListID))
        })
}

export const removeTask = (todoListID: string, taskId: string) => (dispatch: Dispatch) => {
    return todolistAPI.deleteTask(todoListID, taskId)
        .then(() => {
            dispatch(removeTaskAC(taskId, todoListID))
        })
}

export const updateTaskTitle = (todoListID: string, taskId: string, model: UpdateTaskModelType) => (dispatch: Dispatch) => {
    return todolistAPI.updateTask(todoListID, taskId, model)
        .then((res) => {
            dispatch(changeTaskTitleAC(res.data.data.item.id, res.data.data.item.title, todoListID))
        })
}

export const updateTaskStatus = (todoListID: string, taskId: string, model: UpdateTaskModelType) => (dispatch: Dispatch) => {
    return todolistAPI.updateTask(todoListID, taskId, model)
        .then((res) => {
            dispatch(changeTaskStatusAC(todoListID, res.data.data.item.id, res.data.data.item.status))
        })
}
