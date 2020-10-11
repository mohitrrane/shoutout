import React from 'react'
import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import GameStack from './GameStack'
import ProfileScreen from '../screens/ProfileScreen'
import NotificationsScreen from '../screens/NotificationsScreen'
import SettingsScreen from '../screens/SettingsScreen'

const Tab = createBottomTabNavigator()

const MainTabStack = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen 
                name="GameStack" 
                component={GameStack} 
                options={{ 
                    title: 'Home' 
                }}
            />
            <Tab.Screen 
                name="Notifications" 
                component={NotificationsScreen} 
                options={{ 
                    title: 'Notifications' 
                }}
            />
            <Tab.Screen 
                name="Profile" 
                component={ProfileScreen} 
                options={{ 
                    title: 'Profile' 
                }}
            />
            <Tab.Screen 
                name="Settings" 
                component={SettingsScreen} 
                options={{ 
                    title: 'Settings' 
                }}
            />
        </Tab.Navigator>
    )
}

export default MainTabStack
