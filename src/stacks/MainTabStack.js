import React, {useEffect} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import GameStack from './GameStack'
import ProfileStack from '../stacks/ProfileStack'
import InfoStack from './InfoStack'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { setUserToken, setUserProfile } from '../../redux/user/userActions'
import { useDispatch } from 'react-redux'
import { getUserProfile, getUserToken } from '../helpers/userFunctions';

const Tab = createBottomTabNavigator()

const MainTabStack = (props) => {
    const reduxDispatch = useDispatch()

    useEffect(() => {
        getUserToken()
        .then(token=>{
            reduxDispatch(setUserToken(token))
        })
        getUserProfile()
        .then(profile=>{
            reduxDispatch(setUserProfile(profile))
        })        
    }, [])

    return (
        <Tab.Navigator
            screenOptions={({route})=>({
                tabBarIcon: ({focused, color, size})=>{
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'ios-home' : 'ios-home';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'ios-person' : 'ios-person';
                    } else if (route.name === 'Info') {
                        iconName = focused ? 'ios-list' : 'ios-list';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                }
            })}
        >
            <Tab.Screen 
                name="Home" 
                component={GameStack} 
                options={{ 
                    title: 'Home' 
                }}
            />
            
            <Tab.Screen 
                name="Profile" 
                component={ProfileStack} 
                options={{ 
                    title: 'Profile' 
                }}
                afterLoggedOut={()=>{props.afterLoggedOut()}}
            />
            <Tab.Screen 
                name="Info" 
                component={InfoStack} 
                options={{ 
                    title: 'Info' 
                }}
                screenOptions={{
                    title: 'Info'
                }}
            />
        </Tab.Navigator>
    )
}

export default MainTabStack
