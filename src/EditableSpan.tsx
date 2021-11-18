import React, {ChangeEvent, useState} from 'react'

type EditableSpanType = {
    title: string
    setTitletoState: (title: string) => void
}

function EditableSpan(props: EditableSpanType) {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [text, setText] = useState<string>('')
    const onEdit = () => {
        setEditMode(true)
        setText(props.title)
    }
    const offEdit = () => {
        setEditMode(false)
        props.setTitletoState(text)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setText(e.currentTarget.value)

    return editMode
        ? <input onChange={onChangeHandler} onBlur={offEdit} value={text} autoFocus />
        : <span onDoubleClick={onEdit}>{props.title}</span>

}

export default EditableSpan