import React, {ChangeEvent, KeyboardEvent, useState} from 'react'

type EditableSpanPropsType = {
    title: string
}

const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const onEditMode = () => setEditMode(true)
    const offEditMode = () => setEditMode(false)
    return (
        editMode
            ? <input autoFocus={true} onBlur={offEditMode}/>
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}

export default EditableSpan