import axios from 'axios'
import { LOGIN, LOGOUT } from './Actions_types'


const login = (data) => {
    return {
        type: LOGIN,
        payload: data
    }
}
const logout = () => {
    return {
        type: LOGOUT
    }
}

const signupUser = (data) => {
    return dispatch => {
        axios({
            method: "POST",
            url: "http://localhost:5000/auth/signup",
            data: data
        })
            .then((res) => alert("successfully registered"))
    }
}

const loginUser = (data) => {
    return dispatch => {
        axios({
            method: "POST",
            url: "http://localhost:5000/auth/login",
            data: data
        })
            .then((res) => { dispatch(login(res.data)) })
    }
}

export { signupUser, loginUser, logout }