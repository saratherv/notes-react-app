import React, {useState} from 'react'
import Input from '../../resuables/Input'
import Textarea from '../../resuables/Textarea' 

const NoteForm = (props) => {
    const { formSubmit, title: noteTitle, description: noteDescription } = props
    const [ note, setNote ] = useState({
        title: noteTitle ? noteTitle : '',
        description: noteDescription ? noteDescription : '',
        formErrors: {}
    })
    const errors = {}

    const runValidations = () => {
        // title
        if(note.title.trim().length === 0) {
            errors.title = "Title can't be blank"
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        runValidations()

        if(Object.keys(errors).length === 0) {
            setNote({...note, formErrors: {}})
            const {title, description} = note

            const formData = {
                title,
                description
            }
            const resetForm = () => {
                setNote({
                    title: '',
                    description: '',
                    formErrors: {} 
                })
            }
            
            formSubmit(formData, resetForm)        
        } else {
            setNote({...note, formErrors : {...errors}})
        }
    }

    const handleChange = (e) => {
        if(e.target.name === 'title') {
            setNote({...note, title: e.target.value})
        } else if(e.target.name === 'description') {
            setNote({...note, description: e.target.value})
        }
    }

    return (
        <div >
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col-sm-6">
                        <Input
                        type="text"
                        className="form-control"
                        value={note.title}
                        handleChange={handleChange}
                        name="title"
                        placeholder="Title"
                    />
                    { note.formErrors.title && <div className="form-text">{note.formErrors.title}</div> }
                    </div>
                </div>
                
                <div className="row mb-3">
                    <div className="col-sm-6">
                        <Textarea
                        className="form-control"
                        value={note.description}
                        handleChange={handleChange}
                        name="description"
                        placeholder="Description"
                    />
                    </div>
                </div>
                
                <Input
                    type="submit"
                    className="btn btn-success my-3"
                    value="Save"
                />
            </form>
        </div>
    )
}

export default NoteForm