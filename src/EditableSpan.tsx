import React, {useState} from 'react'

type EditableSpanType = {
    title: string
}

function EditableSpan(props: EditableSpanType) {
    const [editMode, setEditMode] = useState<boolean>(false)
    const onEdit = () => {
        setEditMode(true)
    }
    const offEdit = () => {
        setEditMode(false)
    }

    return (<>
        {
            editMode
            ? <input onBlur={offEdit}/>
            : <span onDoubleClick={onEdit}>{props.title}</span>
        }
    </>)
}

export default EditableSpan