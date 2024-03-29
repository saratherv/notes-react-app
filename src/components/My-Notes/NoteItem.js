import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Heading from '../../resuables/Heading' 
import Button from '../../resuables/Button'
import { startDeleteNote } from '../../actions/notesAction'
import EditNote from './EditNote'
import { startGetSingleNote } from '../../actions/notesAction'

const NoteItem = (props) => {
    const { id, title, description } = props
    const [toggle, setToggle] = useState(false)

    const dispatch = useDispatch()

    const handleRemove = () => {
        dispatch(startDeleteNote(id))
    }

    const handleDisplay = () => {
        dispatch(startGetSingleNote(id))
    }

    const handleToggle = () => {
        setToggle(!toggle)
    }

    return (
        <div>
            { toggle ? (
                <div>
                    <EditNote
                        id={id}
                        title={title}
                        description={description}
                        handleToggle={handleToggle}
                    />
                    <Button
                        className="btn btn-secondary"
                        value="Cancel"
                        handleClick={handleToggle}
                    />
                </div>
            ) : (
                <div>
                    <Heading
                        className="mb-3"
                        type="h4" 
                        title={title}
                        handleDisplay={handleDisplay}
                    />

                    <Button
                        className="btn btn-warning me-4 mb-4"
                        value="Edit"
                        handleClick={handleToggle}
                    />
                    <Button
                        className="btn btn-danger me-4 mb-4"
                        value="Remove"
                        handleClick={handleRemove}
                    />
                </div>    
            )}
        </div>
    )
}   

export default NoteItem