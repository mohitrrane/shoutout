import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
import StartScreen from '../screens/StartScreen'
import JoinScreen from '../screens/JoinScreen'
import GamePlayScreen from '../screens/GamePlayScreen'

const Stack = createStackNavigator()

const GameStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='Home'
        >
            <Stack.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{ 
                    title: 'Home' 
                }}
            />
            <Stack.Screen 
                name="Start" 
                component={StartScreen} 
                options={{ 
                    title: 'Start Game' 
                }}
            />
            <Stack.Screen 
                name="Join" 
                component={JoinScreen} 
                options={{ 
                    title: 'Join Game' 
                  }}
            />
            <Stack.Screen 
                name="GamePlay" 
                component={GamePlayScreen} 
                options={{ 
                    title: 'GamePlay' 
                }}
            />
        </Stack.Navigator>
    )
}

export default GameStack
