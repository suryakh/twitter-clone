import axios from 'axios'
import { LOGIN, LOGOUT, USER_PROFILE, UNFOLLOWERS ,REQUESTSENT ,FOLLOW ,FOLLOWING_USERS} from './Actions_types'


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
const followUser = (id)=>{
    return {
        type:FOLLOW,
        payload:id
    }
}
const followingUsersData = (data)=>{
    return {
        type:FOLLOWING_USERS,
        payload:data
    }
}
const follow = (id,token)=>{
    return dispatch =>{
        axios({
            method:"POST",
            url:`http://localhost:5000/profile/follow/${id}`,
            headers: {
                'Authorization': token
            },
        })
        .then((res)=>dispatch(followUser(id)))
    }
}
const followingProfiles = (token,id)=>{
return dispatch => {
    axios({
        method:"GET",
        url:`http://localhost:5000/profile/following/${id}`,
        headers: {
            'Authorization': token
        },
    })
    .then((res)=>dispatch(followingUsersData(res.data.usersData)))
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

export { signupUser, loginUser, logout, userDetails, getUnFollowedUsers,follow,followingProfiles }