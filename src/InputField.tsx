import s from './Style.module.css'
import React, {ChangeEvent, KeyboardEvent, useState} from 'react'

type InputFieldPropsType = {
    todolistID: string
    addTask: (title: string, todolistID: string) => void
}

function InputField(props: InputFieldPropsType) {

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
        if (title.trim() !== '') {
            props.addTask(title.trim(), props.todolistID)
            setTitle('')
        } else {
            setError('required')
        }
    }

    return (
        <div className={s.input_block}>
            <input className={error ? s.error : s.normal_input}
                   value={title}
                   onChange={setInputValue}
                   onKeyPress={seInputValueOnKeyPress}
            />
            <button onClick={addTask}>+</button>
            {error && <div className={s.error_message}>{error}</div>}
        </div>
    )
}

export default InputField