import {
            SET_USER_TOKEN, 
            REMOVE_USER_TOKEN, 
            SET_USER_PROFILE, 
            REMOVE_USER_PROFILE, 
            SET_USER_LOGIN, 
            REMOMVE_USER_LOGIN 
} from './userTypes' 

const initialState = {
    token: null,
    profile: null,
    userLogin: false
}

const userReducer = (state = initialState, action)=>{
    switch(action.type){
        case SET_USER_TOKEN:
            return {
                ...state,
                token: action.payload,
            }

        case REMOVE_USER_TOKEN:
            return {
                ...state,
                token: null,
            }

        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.payload,
            }
        case REMOVE_USER_PROFILE:
            return {
                ...state,
                profile: null,
            }
        case SET_USER_LOGIN:
            return {
                ...state,
                userLogin: true,
            }
        case REMOMVE_USER_LOGIN:
            return {
                ...state,
                userLogin: false,
            }
        default:
            return state
    }
}

export default userReducer