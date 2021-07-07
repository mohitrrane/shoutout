import AsyncStorage from '@react-native-community/async-storage';

async function saveUserToken(userToken){
    try{
        await AsyncStorage.setItem('token', userToken)
        return true
    } catch (err) {
        console.log(err)
        return false
    }
}

async function saveUserProfile(userProfile){
    try{
        const jsonValue = JSON.stringify(userProfile)
        await AsyncStorage.setItem('profile', jsonValue)
        return true
    } catch (err) {
        console.log(err)
        return false
    }
}

async function getUserToken(){
    try{
        const userToken = await AsyncStorage.getItem('token')
        return userToken
    } catch (err) {
        console.log(err)
        return null
    }
}

async function getUserProfile(){
    try{
        const userProfile = await AsyncStorage.getItem('profile')
        return userProfile != null? JSON.parse(userProfile): null
    } catch (err) {
        console.log(err)
        return null
    }
}

async function removeUserToken(){
    try{
        await AsyncStorage.removeItem('token')
        return true
    } catch (err) {
        console.log(err)
        return false
    }
}

async function removeUserProfile(){
    try{
        await AsyncStorage.removeItem('profile')
        return true
    } catch (err) {
        console.log(err)
        return false
    }
}

async function removeUserDetails(){
    try{
        await AsyncStorage.clear()
        return true
    } catch (err) {
        console.log(err)
        return false
    }
}

export {
    saveUserToken,
    saveUserProfile,
    getUserToken,
    getUserProfile,
    removeUserToken,
    removeUserProfile,
    removeUserDetails
}