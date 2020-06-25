import axios from 'axios'
import { LOGIN, LOGOUT, USER_PROFILE, UNFOLLOWERS, REQUESTSENT, FOLLOW, FOLLOWING_USERS, FOLLOWERS ,TWEETS ,PROFILE_LINE_TWEETS} from './Actions_types'


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
const apirequestsent = () => {
    return {
        type: REQUESTSENT
    }
}
const followUser = (id) => {
    return {
        type: FOLLOW,
        payload: id
    }
}
const followers = (data) => {
    return {
        type: FOLLOWERS,
        payload: data
    }
}
const followingUsersData = (data) => {
    return {
        type: FOLLOWING_USERS,
        payload: data
    }
}
const tweetsData = (data) =>{
    return {
        type:TWEETS,
        payload:data
    }
}
const getLoginUserTweets = (id) =>{
    return {
        type:PROFILE_LINE_TWEETS,
        payload:id
    }
}
const follow = (id, token) => {
    return dispatch => {
        axios({
            method: "POST",
            url: `http://localhost:5000/profile/follow/${id}`,
            headers: {
                'Authorization': token
            },
        })
            .then((res) => dispatch(followUser(id)))
    }
}
const followingProfiles = (token, id) => {
    return dispatch => {
        axios({
            method: "GET",
            url: `http://localhost:5000/profile/following/${id}`,
            headers: {
                'Authorization': token
            },
        })
            .then((res) => dispatch(followingUsersData(res.data.usersData)))
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

const followersData = (token, id) => {
    return dispatch => {
        axios({
            method: "GET",
            url: `http://localhost:5000/profile/followers/${id}`,
            headers: {
                'Authorization': token
            },
        })
            .then((res) => dispatch(followers(res.data.usersData)))
    }
}

const postTheTweet = (token, data) => {
    return dispatch => {
        axios({
            method: "POST",
            url: "http://localhost:5000/tweet/post",
            headers: {
                'Authorization': token
            },
            data: data
        })
            .then((res) => console.log(res))
    }
}

const getAllTweets = (token) =>{
    return dispatch => {
        axios ({
            method:"GET",
            url:"http://localhost:5000/tweet/alltweets",
            headers:{
                'Authorization': token
            }
        })
        .then((res)=>dispatch(tweetsData(res.data.userTweets)))
    }
}
const retweet = (id,token)=>{
    return dispatch=>{
        axios({
            method:"POST",
            url:`http://localhost:5000/tweet/retweet/${id}`,
            headers:{
                'Authorization': token
            }
        })
        .then ((res)=>console.log(res))
    }
}

export { signupUser, loginUser, logout, userDetails, getUnFollowedUsers, follow, followingProfiles, followersData, postTheTweet ,getAllTweets,getLoginUserTweets,retweet }