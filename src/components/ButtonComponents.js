import React from 'react'
import { StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'

const SubmitButton = ({title, onPress, type}) => {
    return (
        <Button
            title={title}
            onPress={onPress}
            type={type}
        />
            
    )
}

const NavButton = ({title, onPress, type}) => {
    return (
        <Button
            title={title}
            onPress={onPress}
            type={type}
        />
            
    )
}

styles = StyleSheet.create({
    submitButtonStyles: {

    },
    navButtonStyles: {
        
    } 
})

export { SubmitButton, NavButton }
