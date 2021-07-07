import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProfileScreen from '../screens/ProfileScreen'

const Stack = createStackNavigator()

const GameStack = (props) => {
    return (
        <Stack.Navigator
            initialRouteName='Profile'
            screenOptions={{
                headerStyle: {
                  backgroundColor: '#83AF9B',
                },
                headerTitleAlign: 'Center',
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
            }}
        >
            <Stack.Screen 
                name="Profile" 
                component={ProfileScreen} 
                options={{ 
                    title: 'Profile' 
                }}
                afterLoggedOut={()=>{props.afterLoggedOut()}}
            />
        </Stack.Navigator>
    )
}

export default GameStack