import React, {ChangeEvent, useState} from 'react'
import {IconButton, TextField} from '@material-ui/core'
import {Edit} from '@material-ui/icons'

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

    const SpanWithEdit = () => {
        return <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flex: 1}}>
            <span style={{display: 'block', margin: '0 0px'}}
                  onDoubleClick={onEditMode}>{props.title}
            </span>
            <IconButton size={'small'} onClick={onEditMode}>
                <Edit style={{margin: '0 5px 0 0'}}/>
            </IconButton>
        </div>
    }

    return editMode
            ? <TextField size={'small'}
                         style={{width: '160px', padding: '5px 0 0 10px'}}
                         autoFocus={true}
                         onBlur={offEditMode}
                         onChange={setInputValue}
                         value={title}/>
            : <SpanWithEdit/>
}

export default EditableSpan