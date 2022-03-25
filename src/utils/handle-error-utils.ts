import {ResponseType} from '../api/todolist-api'
import {Dispatch} from 'redux'
import {setAppErrorAC, SetAppErrorAT, setAppStatusAC, SetAppStatusAT} from '../app/app-reducer'

export const handleServerAppError = <D>(res: ResponseType<D>, dispatch: Dispatch<DispatchUtilsType>) => {
    if (res.messages.length) {
        dispatch(setAppErrorAC(res.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (err: {message: string}, dispatch: Dispatch<DispatchUtilsType>) => {
    dispatch(setAppErrorAC(err.message))
    dispatch(setAppStatusAC('failed'))
}

type DispatchUtilsType =
    | SetAppErrorAT
    | SetAppStatusAT
