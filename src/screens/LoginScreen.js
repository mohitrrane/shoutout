import React, {useState, useEffect, useReducer} from 'react'
import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import { Card, Icon, Button, Input } from 'react-native-elements'
import { getUserToken, saveUserToken, saveUserProfile } from '../helpers/userFunctions'
import { useSelector, useDispatch } from 'react-redux'
import { setUserToken, removeUserToken, setUserProfile, removeUserProfile, setUserLogin } from '../../redux/user/userActions'
import { urlFor } from '../../sharedInfo'
import {fetchData} from '../helpers/dataFetchFunctions'

const LoginScreen = ({navigation}) => {
    const token = useSelector(state => state.token)
    const reduxDispatch = useDispatch()
    
    const reducer = (state, action)=>{
        switch(action.type){
            case 'username':
                return {...state, username: action.payload}
            case 'password':
                return {...state, password: action.payload}
            case 'reset':
                return {username: null, password: null}
            default:
                return state
        }
    }

    const [loginState, dispatch] = useReducer(reducer, {username: null, password: null})

    const loginUser = ()=>{
        if (loginState.username && loginState.password){
            const jsonData = {
                username: loginState.username,
                password: loginState.password
            }
            fetchData(urlFor.login, jsonData, null, 'POST')
            .then(resToken=>{
                // console.log(resToken)
                const accessToken = resToken.data.access_token

                fetchData(urlFor.profile+'/'+loginState.username, null, accessToken, 'POST')
                .then(resProfile=>{
                    // console.log(resProfile)
                    const userProfile = resProfile.data
                    console.log(userProfile)
                    console.log(accessToken)
                    if (userProfile && accessToken){
                        saveUserToken(accessToken)
                        saveUserProfile(userProfile)

                        reduxDispatch(setUserToken(accessToken))
                        reduxDispatch(setUserProfile(userProfile))
                        reduxDispatch(setUserLogin())

                        alert('Your Token and Profile is saved.')
                    } else {
                        alert('Something is missing')
                    }
                })
                .catch(err=>{
                    console.log(err)
                    alert('Some errror in profile')
                })   
            })
            .catch(err=>{
                console.error(err)
                alert('Some errror in Token')
            }) 

            
        } else {
            alert('Invalid Credentials.')
        }
        
    }

    return (
        <ScrollView>
            <Card>
                <Card.Title>Login</Card.Title>
                <Card.Divider/>
                
                <Input 
                    label='Username'
                    onChangeText={(text)=>{
                        dispatch({type: 'username', payload: text})
                    }}
                />
                <Input 
                    label="Password"
                    onChangeText={(text)=>{
                        dispatch({type: 'password', payload: text})
                    }} 
                    secureTextEntry={true}
                />

                <Button
                    icon={<Icon name='looks-6' color='#ffffff' />}
                    title='Login'
                    onPress={()=>loginUser()}
                />
            </Card>
            <Button
                title="Register"
                type="outline"
                onPress={()=>{
                    navigation.navigate('Register')
                }}

            />

        </ScrollView>
    )
}

export default LoginScreen
