import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import s from './Style.module.css'
import {Container, IconButton, TextField} from '@material-ui/core'
import {Add} from '@material-ui/icons'

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

const AddItemForm = (props: AddItemFormPropsType) => {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string>('')
    const setInputValue = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)
    const seInputValueOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (e.key === 'Enter') {
            addItem()
        }
    }
    const addItem = () => {
        if (title.trim()) {
            props.addItem(title.trim())
        } else {
            setError('Title is required')
        }
        setTitle('')
    }

    return <Container style={{display: 'flex', justifyItems: "center", justifyContent: "space-between"}} className={s.input_block}>
        <TextField variant={'outlined'}
                   size={'small'}
                   label="Add title"
                   style={{width: "150px"}}
                   value={title}
                   onChange={setInputValue}
                   onKeyPress={seInputValueOnKeyPress}
                   error={!!error}
                   helperText={error}
        />
        <IconButton size={"small"}
                    onClick={addItem}>
            <Add />
        </IconButton>
        {/*{error && <div className={s.error_message}>{error}</div>}*/}
    </Container>
}

export default AddItemForm