import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'

const Stack = createStackNavigator()

const LoginStack = (props) => {
    return (
        <Stack.Navigator
            initialRouteName="Login"
        >
            <Stack.Screen 
                name="Login" 
                component={LoginScreen} 
                options={{ 
                    title: 'Login' 
                }}
            />
            <Stack.Screen 
                name="Register" 
                component={RegisterScreen} 
                options={{ 
                    title: 'Register' 
                  }}
            />
        </Stack.Navigator>
    )
}

export default LoginStack
