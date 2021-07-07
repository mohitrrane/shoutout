import React, {useState, useEffect, useReducer} from 'react'
import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import { Card, Icon, Button, Input } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage'
import { urlFor } from '../../sharedInfo'
import { getUserToken, saveUserToken, saveUserProfile } from '../helpers/userFunctions'
import { useSelector, useDispatch } from 'react-redux'
import { setUserToken, removeUserToken, setUserProfile, removeUserProfile, setUserLogin } from '../../redux/user/userActions'
import {fetchData} from '../helpers/dataFetchFunctions'

const RegisterScreen = ({navigation}) => {
    const reduxDispatch = useDispatch()
    
    const reducer = (state, action)=>{
        switch(action.type){
            case 'name':
                return {...state, name: action.payload}
            case 'username':
                return {...state, username: action.payload}
            case 'email':
                return {...state, email: action.payload}
            case 'password':
                return {...state, password: action.payload}
            case 'reset':
                return {
                    name: null,
                    username: null, 
                    email: null,
                    password: null,
                }
            default:
                return state
        }
    }

    const [registerState, dispatch] = useReducer(reducer,{
        name: null,
        username: null,
        email: null, 
        password: null,
    })

    const registerUser = (registerState)=>{
        if (
            registerState.name &&
            registerState.username &&
            registerState.password
            ){  
                const jsonData = {
                    name: registerState.name,
                    username: registerState.username,
                    password: registerState.password,
                    email: registerState.email
                }
                fetchData(urlFor.register, jsonData, null, 'POST')
                .then(resToken=>{
                    // console.log(resToken)
                    const accessToken = resToken.data.access_token
    
                    fetchData(urlFor.profile+'/'+registerState.username, null, accessToken, 'POST')
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
    
                            alert('Registration Successful. Your Token and Profile is saved.')
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
            alert('Please fill all required fields.')
        }
    }

    return (
        <ScrollView>
            <Card>
                <Card.Title>Register</Card.Title>
                <Card.Divider/>

                <Input 
                    label='Username *'
                    onChangeText={(text)=>{
                        dispatch({type: 'username', payload: text})
                    }}
                />
                <Input
                    label='Name *'
                    onChangeText={(text)=>{
                        dispatch({type: 'name', payload: text})
                    }}
                />
                <Input 
                    label='Email'
                    onChangeText={(text)=>{
                        dispatch({type: 'email', payload: text})
                    }}
                />
                <Input 
                    label="Password *"
                    secureTextEntry={true}
                    onChangeText={(text)=>{
                        dispatch({type: 'password', payload: text})
                    }}
                />

                <Button
                    icon={<Icon name='rowing' color='#ffffff' />}
                    title='Register'
                    onPress={()=>{
                        registerUser(registerState)
                    }}
                />
            </Card>
        </ScrollView>
    )
}

export default RegisterScreen
