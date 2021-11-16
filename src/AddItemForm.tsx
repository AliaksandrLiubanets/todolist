import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import s from './Style.module.css'

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

const AddItemForm = (props: AddItemFormPropsType) => {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string>('')
    const setInputValue = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)
    const seInputValueOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (e.key === "Enter") {
            addItem()
        }
    }
    const addItem = () => {
        if (title.trim()) {
            props.addItem(title.trim())
        } else {
            setError('required')
        }
        setTitle('')
    }

    return <div className={s.input_block}>
        <input className={error ? s.error : s.normal_input}
               value={title}
               onChange={setInputValue}
               onKeyPress={seInputValueOnKeyPress}
        />
        <button onClick={addItem}>+</button>
        {error && <div className={s.error_message}>{error}</div>}
    </div>
}

export default AddItemForm