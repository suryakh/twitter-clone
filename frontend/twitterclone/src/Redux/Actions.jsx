import axios from 'axios'
import { LOGIN, LOGOUT, USER_PROFILE, UNFOLLOWERS ,REQUESTSENT } from './Actions_types'


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
const userProfile = (data) => {
    return {
        type: USER_PROFILE,
        payload: data
    }
}
const unfollowers = (data) => {
    return {
        type: UNFOLLOWERS,
        payload: data
    }
}
const apirequestsent = () =>{
    return {
        type:REQUESTSENT
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
const userDetails = (data, token) => {
    return dispatch => {
        dispatch(apirequestsent())
        axios({
            method: "GET",
            url: `http://localhost:5000/profile/user/${data}`,
            headers: {
                'Authorization': token
            },
        })
            // .then((res)=>console.log(res))
            .then((res) => dispatch(userProfile(res.data.profile)))
    }
}
const getUnFollowedUsers = (token) => {
    return dispatch => {
        dispatch(apirequestsent())
        axios({
            method: "GET",
            url: "http://localhost:5000/profile/unfollowers",
            headers: {
                'Authorization': token
            }
        })
            .then((res) => dispatch(unfollowers(res.data.usersData)))
    }
}

export { signupUser, loginUser, logout, userDetails, getUnFollowedUsers }