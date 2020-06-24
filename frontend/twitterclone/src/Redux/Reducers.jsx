import { LOGIN, LOGOUT, USER_PROFILE, UNFOLLOWERS, REQUESTSENT, FOLLOW ,FOLLOWING_USERS ,FOLLOWERS ,TWEETS ,PROFILE_LINE_TWEETS } from "./Actions_types"
import { Followers } from "../Components/Followers"

const initialuUserState = {
    loginStatus: false,
    userName: "",
    uniqueName: "",
    token: "",
    profile: ""
}

const appDataState = {
    userProfile: {},
    unfollowers: [],
    followingUsers:[],
    followers:[],
    homeLineTweets:[],
    profileLineTweets:[],
    profileEdit: false

}
let token = localStorage.getItem("token")
let name = localStorage.getItem("name")
let image = localStorage.getItem('profile')
let uniqueName = localStorage.getItem('uniqueName')

if (token) {
    initialuUserState.token = token
    initialuUserState.loginStatus = true
    initialuUserState.userName = name
    initialuUserState.profile = image
    initialuUserState.uniqueName = uniqueName

}

const userReducer = (state = initialuUserState, action) => {
    switch (action.type) {
        case LOGIN: {
            localStorage.setItem("token", action.payload.token)
            localStorage.setItem("name", action.payload.username)
            localStorage.setItem("profile", action.payload.image)
            localStorage.setItem("uniqueName", action.payload.uniqueName)
            return {
                ...state,
                loginStatus: true,
                userName: action.payload.username,
                token: action.payload.token,
                profile: action.payload.image,
                uniqueName: action.payload.uniqueName
            }
        }
        case LOGOUT: {
            localStorage.clear()
            return {
                ...state,
                loginStatus: false,
                userName: "",
                token: "",
                profile: ""
            }
        }
        default: {
            return state
        }
    }
}

const dataReducers = (state = appDataState, action) => {
    switch (action.type) {
        case USER_PROFILE: {
            let month = new Date(action.payload["joinTime"]).getMonth()
            let year = new Date(action.payload["joinTime"]).getFullYear()
            let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            action.payload["joinTime"] = months[month] + "," + year
            if (uniqueName === action.payload["uniqueUserName"]) {
                console.log("hllo")
                return {

                    ...state,
                    userProfile: action.payload,
                    profileEdit: true
                }
            }
            else {
                return {
                    ...state,
                    userProfile: action.payload
                }
            }
        }
        case UNFOLLOWERS: {
            return {
                ...state,
                unfollowers: action.payload
            }
        }
        case REQUESTSENT: {
            return {
                ...state,
                profileEdit: false
            }
        }
        case FOLLOW: {
            let temp = state.unfollowers.filter((ele) => ele.id !== action.payload)
            return {
                ...state,
                unfollowers: temp
            }
        }
        case FOLLOWING_USERS:{
            return {
                ...state,
                followingUsers:action.payload
            }
        }
        case FOLLOWERS:{
            return {
                ...state,
                followers:action.payload
            }
        }
        case TWEETS:{
            return {
                ...state,
                homeLineTweets:action.payload  
            }
        }
        case PROFILE_LINE_TWEETS:{
            return {
                ...state,
                profileLineTweets:state.homeLineTweets.filter((ele)=>ele.uniqueUserName === action.payload)

            }
        }

        default: {
            return state
        }

    }
}
export { userReducer, dataReducers }