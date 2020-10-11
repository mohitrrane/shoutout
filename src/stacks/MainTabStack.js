import React from 'react'
import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import GameStack from './GameStack'
import ProfileScreen from '../screens/ProfileScreen'

const Tab = createBottomTabNavigator()

const MainTabStack = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="GameStack" component={GameStack} />
            <Tab.Screen name="Notifications" component={NotificationsScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    )
}

export default MainTabStack
