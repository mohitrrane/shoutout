import React, {useState, useEffect} from 'react';
import { View, ActivityIndicator } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginStack from './src/stacks/LoginStack';
import MainTabStack from './src/stacks/MainTabStack';
import { getUserToken, getUserProfile } from './src/helpers/userFunctions'
import { useSelector, useDispatch } from 'react-redux' 
import { setUserLogin } from './redux/user/userActions'

const Stack = createStackNavigator()

export default function RootComponent() {
  const [isLoading, setIsLoading] = useState(true)
  const userLogin = useSelector(state => state.userLogin)
  const reduxDispatch = useDispatch()   

  useEffect(() => {
    getUserToken()
    .then(token=>{
      if(token){
        reduxDispatch(setUserLogin())
        setIsLoading(false)
      } else {
          setIsLoading(false)
      }
    })
    .catch(error => {
        console.log(error)
        setIsloading(false)
    })
    
  }, [])

  if (isLoading){
    return(
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator 
              size="large" color="#0000ff" />
        </View>
    )
  }


  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
            (userLogin)?
            <Stack.Screen 
                name="MainTab" 
                component={MainTabStack} 
                options={{ 
                    headerShown: false  
                }}
            />
            :
            <Stack.Screen 
                name="LoginStack" 
                component={LoginStack}
                options={{ 
                    headerShown: false 
                }}
            />
        } 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

