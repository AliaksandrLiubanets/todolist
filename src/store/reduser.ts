export const sum = (a: number, b: number) => a + b
export const sub = (a: number, b: number) => a - b
export const mul = (a: number, b: number) => a * b
export const div = (a: number, b: number) => a / b

type ActionType = {
    type: "SUM" | "MUL" | "SUB" | "DIV" | "EXP"
    number: number
}

export const calculator = (state: number, action: ActionType) => {
    switch (action.type) {
        case "SUM":
            return state + action.number
        case "MUL":
            return state * action.number
        case "SUB":
            return state - action.number
        case "DIV":
            return state / action.number
        case "EXP":
            return state ** action.number // возведедние в степень
        default:
            return state
    }
}