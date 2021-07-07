import React from 'react'
import { StyleSheet } from 'react-native'
import { Input } from 'react-native-elements'

const AuthInput = ({placeholder, dispatch, action, isSecure=false}) => {
    return (
        <Input
            placeholder={placeholder}
            onChangeText={(text)=>{
                dispatch(action)
            }}
            secureTextEntry={isSecure}
        />
            
    )
}

styles = StyleSheet.create({
    authStyles: {

    }    
})

export { AuthInput }
