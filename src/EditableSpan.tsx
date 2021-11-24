import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {TextField} from '@material-ui/core'

type EditableSpanPropsType = {
    title: string
    onChange: (title: string) => void
}

const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    const setInputValue = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)
    const onEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const offEditMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    return (
        editMode
            ? <TextField size={'small'} style={{width: '100px'}} autoFocus={true} onBlur={offEditMode} onChange={setInputValue}
                         value={title}/>
            // : <span onDoubleClick={onEditMode}>{props.title}</span>
            : <span style={{display: "block"}} onDoubleClick={onEditMode}>{props.title}</span>

    )
}

export default EditableSpan