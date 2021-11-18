import React, {useState} from 'react'

type EditableSpanType = {
    title: string
}

function EditableSpan(props: EditableSpanType) {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [text, setText] = useState<string>(props.title)
    const onEdit = () => {
        setEditMode(true)
    }
    const offEdit = () => {
        setEditMode(false)
    }
    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setText(e.currentTarget.value)

    return (<>
        {
            editMode
            ? <input onChange={onChangeHandler} onBlur={offEdit} autoFocus={true} value={text}/>
            : <span onDoubleClick={onEdit}>{text}</span>
        }
    </>)
}

export default EditableSpan