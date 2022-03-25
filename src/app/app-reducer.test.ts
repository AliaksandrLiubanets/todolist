import {appReducer, InitialStateType, setAppErrorAC, setAppStatusAC} from './app-reducer'

let startState: InitialStateType

beforeEach(() => {
    startState = {
        status: 'idle',
        error: null,
        isInitialized: false
    }
})

test('status should be changed', () => {

    const action = setAppStatusAC( 'succeeded');
    const endState = appReducer(startState, action)

    expect(endState.status).toBe('succeeded');
})

test('error should be set', () => {

    const action = setAppErrorAC( 'Some error');
    const endState = appReducer(startState, action)

    expect(endState.error).toBe('Some error');
})







