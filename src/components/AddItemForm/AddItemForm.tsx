import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {Container, IconButton, TextField} from '@material-ui/core'
import {Add} from '@material-ui/icons'
import {useSelector} from 'react-redux'
import {AppRootStateType} from '../../app/store'
import {RequestStatusType} from '../../app/app-reducer'

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

const AddItemForm = React.memo((props: AddItemFormPropsType) => {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string>('')
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const setInputValue = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)
    const seInputValueOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error) {
            setError('')
        }
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

    return <Container style={{display: 'flex', alignItems: 'flex-start', height: '40px'}}>
        <TextField variant={'outlined'}
                   size={'small'}
                   label="Add title"
                   value={title}
                   onChange={setInputValue}
                   onKeyPress={seInputValueOnKeyPress}
                   error={!!error}
                   helperText={error}
                   margin={'none'}
        />
        <IconButton size={'small'}
                    onClick={addItem}
                    style={{margin: '5px 0 5px 10px'}}
                    disabled={status === 'loading'}
        >
            <Add/>
        </IconButton>
    </Container>
})

export default AddItemForm