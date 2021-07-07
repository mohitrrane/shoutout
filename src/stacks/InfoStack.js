import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import InfoScreen from '../screens/InfoScreen'

const Stack = createStackNavigator()

const GameStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='Info'
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
                name="Info" 
                component={InfoScreen} 
                options={{ 
                    title: 'More Information' 
                }}
            />
        </Stack.Navigator>
    )
}

export default GameStack