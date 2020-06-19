import { LOGIN, LOGOUT } from "./Actions_types"

const initialuUserState = {
    loginStatus: false,
    userName: "",
    token: ""
}
let token = localStorage.getItem("token")
let name = localStorage.getItem("name")
if (token) {
    initialuUserState.token = token
    initialuUserState.loginStatus = true
    initialuUserState.userName = name
}

const userReducer = (state = initialuUserState, action) => {
    switch (action.type) {
        case LOGIN: {
            localStorage.setItem("token", action.payload.token)
            localStorage.setItem("name", action.payload.name)
            return {
                ...state,
                loginStatus: true,
                userName: action.payload.name,
                token: action.payload.token
            }
        }
        case LOGOUT: {
            localStorage.clear()
            return {
                ...state,
                loginStatus: false,
                userName: "",
                token: ""
            }
        }
        default: {
            return state
        }
    }
}

export default userReducer