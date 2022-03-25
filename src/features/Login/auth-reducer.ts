import {authAPI, AuthData, LoginDataType} from '../../api/todolist-api'
import {Dispatch} from 'redux'
import {SetAppErrorAT, setAppStatusAC, SetAppStatusAT} from '../../app/app-reducer'
import {handleServerAppError, handleServerNetworkError} from '../../utils/handle-error-utils'

type TaskStateType = {
    userData: AuthData | null
    isAuth: boolean
}

const initialState: TaskStateType = {
    userData: null,
    isAuth: false,

}

export const authReducer = (state: TaskStateType = initialState, action: ActionsType): TaskStateType => {
    switch (action.type) {
        case 'auth/SET-IS-AUTH':
            return {...state, isAuth: action.isAuth}
        case 'auth/SET-AUTH-DATA':
            return {...state, userData: action.userData}
        default:
            return state
    }
}


//actions:

export const setIsAuthAC = (isAuth: boolean ) =>
    ({type: 'auth/SET-IS-AUTH', isAuth} as const)

export const setAuthDataAC = (userData: AuthData) =>
    ({type: 'auth/SET-AUTH-DATA',  userData} as const)


//thunks:

export const auth = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.me()
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
}

export const login = (loginData: LoginDataType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(loginData)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsAuthAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}

export const logOut = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logOut()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsAuthAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(err => {
            handleServerNetworkError(err, dispatch)
        })
}


//types:

type ActionsType =
    | ReturnType<typeof setIsAuthAC>
    | ReturnType<typeof setAuthDataAC>
    | SetAppErrorAT
    | SetAppStatusAT
