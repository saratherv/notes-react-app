import React from 'react'
import { useDispatch } from 'react-redux'
import Heading from '../../resuables/Heading'
import NoteForm from './NoteForm'
import { startUpdateNote } from '../../actions/notesAction'

const EditNote = (props) => {
    const {id, title, description } = props 

    const dispatch = useDispatch()

    const formSubmit = (note, resetForm) => {
        dispatch(startUpdateNote(note, props, resetForm)) 
    }

    return (
        <div>
            <Heading
                type="h2"
                title="Edit Note"
            />
            <NoteForm
                id={id}
                title={title}
                description={description}
                formSubmit={formSubmit}
            />
        </div>
    )
}

export default EditNote