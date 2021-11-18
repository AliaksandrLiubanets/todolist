import React from 'react'

type EditableSpanType = {
    title: string
}

function EditableSpan(props: EditableSpanType) {
    return <span>{props.title}</span>
}

export default EditableSpan