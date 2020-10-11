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
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Start" component={StartScreen} />
            <Stack.Screen name="Join" component={JoinScreen} />
            <Stack.Screen name="GamePlay" component={GamePlayScreen} />
        </Stack.Navigator>
    )
}

export default GameStack
