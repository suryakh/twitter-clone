import {LOGIN} from  "./Actions_types"

const initialuUserState = {
    loginStatus:false,
    userName:"",
    token:""
}

const userReducer=(state= initialuUserState,action)=>{
    switch (action.type){
        case LOGIN:{
            return{
                ...state,
                loginStatus:true
            }
        }
        default :{
            return state
        }
    }
}

export default userReducer