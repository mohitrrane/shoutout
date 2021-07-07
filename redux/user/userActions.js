import { SET_USER_TOKEN, REMOVE_USER_TOKEN, SET_USER_PROFILE, REMOVE_USER_PROFILE, SET_USER_LOGIN, REMOMVE_USER_LOGIN } from './userTypes' 

function setUserToken(token){
    return {
        type: SET_USER_TOKEN,
        payload: token
    }
}

const removeUserToken = ()=>{
    return {
        type: REMOVE_USER_TOKEN
    }
}

const setUserProfile = (profile)=>{
    return {
        type: SET_USER_PROFILE,
        payload: profile
    }
}

const removeUserProfile = ()=>{
    return {
        type: REMOVE_USER_PROFILE
    }
}

const setUserLogin = ()=>{
    return {
        type: SET_USER_LOGIN
    }
}

const removeUserLogin = ()=>{
    return {
        type: REMOMVE_USER_LOGIN
    }
}

export {
    setUserToken,
    setUserProfile,
    removeUserToken,
    removeUserProfile,
    setUserLogin,
    removeUserLogin
}