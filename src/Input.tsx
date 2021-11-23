import s from './Style.module.css'
import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {Button, TextField} from '@material-ui/core'

type InputPropsType = {
    addItem: (title: string) => void
}

function Input(props: InputPropsType) {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string>('')
    const setInputValue = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)
    const seInputValueOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (e.key === "Enter") {
            addTask()
        }
    }
    const addTask = () => {
        debugger
        if (title.trim() !== '') {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setError('required')
        }
    }

    return (
        <div className={s.input_block}>

            <TextField variant="standard" className={error ? s.error : s.normal_input}
                   value={title}
                   onChange={setInputValue}
                   onKeyPress={seInputValueOnKeyPress}
            />
            <Button onClick={addTask}>+</Button>
            {error && <div className={s.error_message}>{error}</div>}
        </div>
    )
}

export default Input