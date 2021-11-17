import React, {ChangeEvent, KeyboardEvent, useState} from 'react'

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
            ? <input autoFocus={true} onBlur={offEditMode} onChange={setInputValue} value={title}/>
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}

export default EditableSpan