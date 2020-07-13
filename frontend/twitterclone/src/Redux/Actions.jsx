import axios from 'axios'
import { LOGIN, LOGOUT, USER_PROFILE, UNFOLLOWERS, REQUESTSENT, FOLLOW, FOLLOWING_USERS, FOLLOWERS ,TWEETS ,PROFILE_LINE_TWEETS,UPDATE_POST ,POST_RETWEET,LIKES} from './Actions_types'


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
const updatePost=(data)=>{
    return {
        type:UPDATE_POST,
        payload:data
    }
}
const postRetweet = (data,id)=>{
    return {
        type:POST_RETWEET,
        payload:{
            data:data,
            id:id
        }
    }
}
const likes = (id) =>{
    return {
        type:LIKES,
        payload:{
            id:id
        }
    }
}
const follow = (id, token) => {
    return dispatch => {
        axios({
            method: "POST",
            url: `https://twittercloneflask.herokuapp.com/profile/follow/${id}`,
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
            url: `https://twittercloneflask.herokuapp.com/profile/following/${id}`,
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
            url: "https://twittercloneflask.herokuapp.com/auth/signup",
            data: data
        })
            .then((res) => alert("successfully registered"))
    }
}

const loginUser = (data) => {
    return dispatch => {
        axios({
            method: "POST",
            url: "https://twittercloneflask.herokuapp.com/auth/login",
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
            url: `https://twittercloneflask.herokuapp.com/profile/user/${data}`,
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
            url: "https://twittercloneflask.herokuapp.com/profile/unfollowers",
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
            url: `https://twittercloneflask.herokuapp.com/profile/followers/${id}`,
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
            url: "https://twittercloneflask.herokuapp.com/tweet/post",
            headers: {
                'Authorization': token
            },
            data: data
        })
            .then((res) => dispatch(updatePost(res.data.latestTweet)))
    }
}

const getAllTweets = (token) =>{
    console.log(token)
    return dispatch => {
        axios ({
            method:"GET",
            url:"https://twittercloneflask.herokuapp.com/tweet/alltweets",
            headers:{
                'Authorization': token
            }
        })
        .then((res)=>dispatch(tweetsData(res.data.userTweets)))
    }
}
const retweet = (id,comment,token)=>{
    return dispatch=>{
        axios({
            method:"POST",
            url:`https://twittercloneflask.herokuapp.com/tweet/retweet/${id}`,
            headers:{
                'Authorization': token
            },
            data:{
                "comment":comment
            }
        })
        .then ((res)=>dispatch(postRetweet(res.data.latestRetweet,id)))
    }
}
const likeTweet = (id,token) =>{
    return dispatch =>{
        axios({
            method:"POST",
            url:`https://twittercloneflask.herokuapp.com/tweet/likes/${id}`,
            headers:{
                'Authorization': token
            }
        })
        .then((res)=>dispatch(likes(id)))
    }
}

const updateProfile = (data,token) =>{
    return dispatch =>{
        axios({
            method:"POST",
            url:`https://twittercloneflask.herokuapp.com/profile/updateProfile`,
            headers:{
                'Authorization': token
            },
            data:data
        })
        .then((res)=>console.log(res))
    }
}

const deleteTweet =(id,token) =>{
    return dispatch =>{
        axios({
            method:"DELETE",
            url:"",
            headers:{
                'Authorization': token
            }
        })
        .then((res)=>console.log(res))
    }
}

export { signupUser, loginUser, logout, userDetails, getUnFollowedUsers, follow, followingProfiles, followersData, postTheTweet ,getAllTweets,getLoginUserTweets,retweet,likeTweet ,updateProfile,deleteTweet}