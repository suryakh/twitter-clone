import { LOGIN, LOGOUT, USER_PROFILE, UNFOLLOWERS, REQUESTSENT, FOLLOW, FOLLOWING_USERS, FOLLOWERS, TWEETS, PROFILE_LINE_TWEETS, UPDATE_POST, POST_RETWEET, LIKES } from "./Actions_types"
import { Followers } from "../Components/Followers"

const initialuUserState = {
    loginStatus: false,
    userName: "",
    uniqueName: "",
    token: "",
    profile: ""
}

const appDataState = {
    updateData: false,
    userProfile: {},
    unfollowers: [],
    followingUsers: [],
    followers: [],
    homeLineTweets: [],
    profileLineTweets: [],
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
                return {

                    ...state,
                    userProfile: action.payload,
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
        case FOLLOWING_USERS: {
            return {
                ...state,
                followingUsers: action.payload
            }
        }
        case FOLLOWERS: {
            return {
                ...state,
                followers: action.payload
            }
        }
        case TWEETS: {
            return {
                ...state,
                homeLineTweets: action.payload
            }
        }
        case PROFILE_LINE_TWEETS: {
            return {
                ...state,
                profileLineTweets: state.homeLineTweets.filter((ele) => ele.uniqueUserName === action.payload || ele.retweeteduser === action.payload)

            }
        }
        case UPDATE_POST: {
            let temp = state.homeLineTweets
            temp.unshift(action.payload)
            return {
                ...state,
                homeLineTweets: temp
            }
        }
        case POST_RETWEET: {
            let temp = state.homeLineTweets.map((ele) => {
                if (ele.id === action.payload.id) {
                    ele.reTweets = ele.reTweets + 1
                    return ele
                }
                else {
                    return ele
                }
            })
            console.log(temp)
            temp.unshift(action.payload.data)
            return {
                ...state,
                homeLineTweets: temp
            }
        }
        case LIKES: {
            let temp = state.homeLineTweets.map((ele) => {
                if (ele.id === action.payload.id) {
                    ele.likes = ele.likes + 1
                    ele.liked = true
                    return ele
                }
                else {
                    return ele
                }
            })
            return {
                ...state,
                homeLineTweets: temp
            }
        }
        default: {
            return state
        }

    }
}
export { userReducer, dataReducers }