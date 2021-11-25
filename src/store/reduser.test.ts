import {ActionType, calculator, sum} from './reduser'

test("sum", () => {
    const a = 10
    const b = 12

    let result = sum(a, b)

    expect(result).toBe(23)
})

test("sum of calculator", () => {
    const a = 10
    const b = 10

    let action: ActionType = {type: "SUM", number: b}
    let result = calculator(a, action)

    expect(result).toBe(20)
})

test("Mult of calculator", () => {
    const a = 10
    const b = 10

    const action: ActionType = {type: "MUL", number: b}
    let result = calculator(a, action)

    expect(result).toBe(100)
})

test("Subtraction of calculator", () => {
    const a = 10
    const b = 10

    const action: ActionType = {type: "SUB", number: b}
    let result = calculator(a, action)

    expect(result).toBe(0)
})

test("Division of calculator", () => {
    const a = 10
    const b = 10

    const action: ActionType = {type: "DIV", number: b}
    let result = calculator(a, action)

    expect(result).toBe(1)
})

test("Exponent of calculator", () => {
    const a = 10
    const b = 3

    const action: ActionType = {type: "EXP", number: b}
    let result = calculator(a, action)

    expect(result).toBe(1000)
})