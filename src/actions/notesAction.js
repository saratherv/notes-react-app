import axios from 'axios'
import swal from 'sweetalert'

export const startGetNotes = (token) => {
    return (dispatch) => {   
        dispatch(notesLoading())
        axios.get('http://127.0.0.1:9000/api/v1/notes/', {
            headers: {
                "token": token
            }
        })
        .then((response) => {
            const result = response.data
            if("payload" in result && "result" in result["payload"]){
                dispatch(setNotes(result.payload.result))
            }
            
        })
        .catch((err) => {
            dispatch(allNotesError(err.message))
        }) 
    }
}

export const setNotes = (notes) => {
    return {
        type: 'SET_NOTES',
        payload: notes
    } 
}

export const notesLoading = () => {
    return {
        type: 'NOTES_LOADING'
    }
}

export const allNotesError = (message) => {
    return {
        type: 'ALL_NOTES_ERROR',
        payload: message
    }
}

export const startCreateNote = (note, resetForm) => {
    return (dispatch) => {
        const confirmAdd = window.confirm('Are you sure')
        if(confirmAdd) {
            axios.post('http://localhost:9000/api/v1/notes/', note, {
            headers: {
                "token": localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                if("payload" in result && "result" in result["payload"]){
                    dispatch(addNote(result.payload.result))
                    resetForm()
                }
            })
            .catch((err) => {
                dispatch(addNoteError(err.message))
            })
        }
        
    }
}

export const addNote = (note) => {
    return {
        type: 'ADD_NOTE',
        payload: note
    }
}

export const addNoteError = (message) => {
    return {
        type: 'ADD_NOTE_ERROR',
        payload: message
    }
}

export const startDeleteNote = (id) => {
    return (dispatch) => {
        const confirmRemove = window.confirm('Are you sure')
        if(confirmRemove) {
            axios.delete(`http://localhost:9000/api/v1/notes/${id}/`, {
            headers: {
                "token": localStorage.getItem('token')
            }
        })
            .then((response) => {
                const result = response.data
                if("payload" in result && "result" in result["payload"]){
                    dispatch(removeNote(id))
                }
                
            })
            .catch((err) => {
                dispatch(removeNoteError(err.message))
            })
        }
    }
}

export const removeNote = (id) => {
    return {
        type: 'REMOVE_NOTE',
        payload: id
    }
}

export const removeNoteError = (message) => {
    return {
        type: 'REMOVE_NOTE_ERROR',
        payload: message
    }
}

export const startUpdateNote = (note, props, resetForm) => {
    return (dispatch) => {
        axios.put(`http://localhost:9000/api/v1/notes/${props.id}/`, note, {
            headers: {
                "token": localStorage.getItem('token')
            }
        })
        .then((response) => {
            const result = response.data
            if("payload" in result && "result" in result["payload"]){
                dispatch(editNote(result.payload.result))
                resetForm()
                props.handleToggle()
            }
            
        })
        .catch((err) => {
            dispatch(editNoteError(err.message))
        })
    }
}

export const editNote = (note) => {
    return {
        type: 'EDIT_NOTE',
        payload: note
    }
}

export const editNoteError = (message) => {
    return {
        type: 'EDIT_NOTE_ERROR',
        payload: message
    }
}

export const startGetSingleNote = (id) => {
    return (dispatch) => {
        axios.get(`http://localhost:9000/api/v1/notes/${id}`, {
            headers: {
                "token" : localStorage.getItem('token')
            }
        })
        .then((response) => {
            const result = response.data
            if("payload" in result && "result" in result["payload"]){
                swal({
                    title: result.payload.result.title,
                    text: result.payload.result.description,
                    button: "Cancel"
                })
            }
            
        })
        .catch((err) => {
            dispatch(singleNoteError(err.message))
        })
    }
} 

export const singleNoteError = (message) => {
    return {
        type: 'SINGLE_NOTE_ERROR',
        payload: message
    }
}