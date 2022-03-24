import {TaskType, todolistAPI} from '../../api/todolist-api'
import {Dispatch} from 'redux'
import {SetAppErrorAT, setAppStatusAC, SetAppStatusAT} from '../../app/app-reducer'
import {handleServerNetworkError} from '../../utils/handle-error-utils'


const initialState: TaskStateType = {}

export const authReducer = (state: TaskStateType = initialState, action: ActionsType): TaskStateType => {
    switch (action.type) {
        default:
            return state
    }
}


//actions:

export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE-TASK', taskId, todolistId} as const)


//thunks:

export const setTask = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    todolistAPI.getTasks(todolistId)
        .then(response => {
            const tasks: Array<TaskType> = response.data.items
            dispatch(setTaskAC(tasks, todolistId))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}


//types:

type ActionsType =
    | SetAppErrorAT
    | SetAppStatusAT
