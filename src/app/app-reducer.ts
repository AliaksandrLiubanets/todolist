import {Dispatch} from 'redux'
import {SetAuthAT, setAuthDataAC, SetAuthDataAT, setIsAuthAC} from '../features/Login/auth-reducer'
import {authAPI} from '../api/todolist-api'
import {handleServerAppError, handleServerNetworkError} from '../utils/handle-error-utils'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}


// actions:
export const setAppStatusAC = (status: RequestStatusType) =>
    ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: null | string) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppIsInitializedAC = (isInitialized: boolean) =>
    ({type: 'APP/SET-IS-INITIALIZED', isInitialized} as const)

// thunks:
export const isInitial = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    return authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsAuthAC(true))
                dispatch(setAuthDataAC(res.data.data))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
        .finally(() => dispatch(setAppIsInitializedAC(true)))

}


// tipes:
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = typeof initialState

export type SetAppStatusAT = ReturnType<typeof setAppStatusAC>
export type SetAppErrorAT = ReturnType<typeof setAppErrorAC>
export type SetAppIsInitializedAT = ReturnType<typeof setAppIsInitializedAC>

type ActionsType =
    | SetAuthAT
    | SetAuthDataAT
    | SetAppErrorAT
    | SetAppStatusAT
    | SetAppIsInitializedAT
