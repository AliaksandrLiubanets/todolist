import {calculator, sum} from './reduser'

test("sum", () => {
    const a = 10
    const b = 12

    let result = sum(a, b)

    expect(result).toBe(23)
})

test("sum of calculator", () => {
    const a = 10
    const b = 10

    let action = {type: "SUM", number: b}
    let result = calculator(a, action)

    expect(result).toBe(20)
})

test("Mult of calculator", () => {
    const a = 10
    const b = 10

    const action = {type: "MUL", number: b}
    let result = calculator(a, action)

    expect(result).toBe(20)
})