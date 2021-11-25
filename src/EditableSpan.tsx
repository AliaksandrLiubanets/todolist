import React, {ChangeEvent, useState} from 'react'
import {TextField} from '@material-ui/core'

type EditableSpanPropsType = {
    title: string
    onChange: (title: string) => void
    isEdit: boolean
    changeEdit: (isEdit: boolean) => void
}

const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(props.isEdit)
    const [title, setTitle] = useState<string>('')

    const setInputValue = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value)
    const onEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const offEditMode = () => {
        setEditMode(false)
        props.changeEdit(false)
        props.onChange(title)
    }
    return (
        editMode
            ? <TextField size={'small'} style={{width: '150px', padding: "0 0 0 10px "}} autoFocus={true} onBlur={offEditMode} onChange={setInputValue}
                         value={title}/>
            : <span style={{display: "block", margin: "0 10px"}} onDoubleClick={onEditMode}>{props.title}</span>
    )
}

export default EditableSpan