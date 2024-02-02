import axios from 'axios'
import swal from 'sweetalert'
import { startGetNotes } from './notesAction'

export const startRegisterUser = (registerData, redirect, resetForm) => {
    return (dispatch) => {
        axios.post('http://localhost:9000/core/authentication/register/', registerData)
        .then((response) => {
            const result = response.data
            if(result.hasOwnProperty('errors')) {
                swal({
                    title: result.message,
                    button: 'Cancel'
                })
            } else {
                swal({
                    title:'Your account has been successfully created',
                    button: 'Cancel'
                })
                resetForm()
                redirect()
            } 
        })
        .catch((err) => {
            dispatch(registerError(err.message))
        })
    } 
}

export const registerError = (message) => {
    return {
        type: 'REGISTER_ERROR',
        payload: message
    }
}

export const startLoginUser = (loginData, redirect, resetForm) => {
    return (dispatch) => {
        axios.post('http://localhost:9000/core/authentication/login/', loginData)
        .then((response) => {
            const result = response.data
            if(result.hasOwnProperty('errors')) {
                swal({
                    title: result.errors,
                    button: 'Cancel'
                })
            } else {
                if("payload" in result && "result" in result["payload"]){
                    swal({
                        title:'Successfully logged in',
                        button: 'Cancel'
                    })
                    localStorage.setItem('token', result.payload.result.token)
                    dispatch(startGetUser(result.payload.result.token))   // immediately after login, get user account details
                    dispatch(startGetNotes(result.payload.result.token))  // immediately after login, get notes of that perticular user (token) 
                    resetForm()
                    redirect()
                }
                else{
                swal({
                    title: "User not found plese signUp",
                    button: 'Cancel'
                })
            }
            }
        })
        .catch((err) => {
            dispatch(loginError(err.message))
        })
    }
}

export const loginError = (message) => {
    return {
        type: 'LOGIN_ERROR',
        payload: message
    }
}

export const startGetUser = (token) => {
    return (dispatch) => {
        axios.get('http://localhost:9000/api/v1/users/', {
            headers: {
                "token": token
            }
        })
        .then((response) => {
            const result = response.data
            if("payload" in result && "result" in result["payload"]){
                dispatch(setUser(result.payload.result[0]))
            }
        })
        .catch((err) => {
            dispatch(accountError(err.message))
        }) 
    }
}

export const setUser = (user) => {
    return {
        type: 'SET_USER',
        payload: user
    }
}

export const accountError = (message) => {
    return {
        type: 'ACCOUNT_ERROR',
        payload: message
    }
}