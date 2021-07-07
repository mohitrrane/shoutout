import React, {useEffect, useState} from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { Card, ListItem, Button, Icon, Avatar, Image, Input, Text } from 'react-native-elements'
import { removeUserDetails } from '../helpers/userFunctions'
import { useSelector, useDispatch } from 'react-redux'
import { removeUserLogin } from '../../redux/user/userActions'

const ProfileTextComponent = ({title, value})=>{
    return(
        <View style={styles.textComponentStyle}>
            <Text style={styles.textComponentTitleStyle}>
                {title}
            </Text>
            <Text style={styles.textComponentValueStyle}>
                {value}
            </Text>
        </View>
    ) 
}

const ProfileScreen = ({navigation, afterLoggedOut}) => {
    const token = useSelector(state => state.token)
    const profile = useSelector(state => state.profile)
    const reduxDispatch = useDispatch()
    return (
        <ScrollView>
            <Card>
                <Card.Title h4>Your Profile</Card.Title>
                <Card.Divider/>
                <View style={{alignItems: 'center'}}>
                    <Image
                        source={{ uri: 'https://randomuser.me/api/portraits/men/41.jpg' }}
                        style={{ width: 120, height: 120, borderRadius: 40}}
                    />
                </View>
                
                <ProfileTextComponent
                    title='Name'
                    value={profile.name}
                />

                <ProfileTextComponent
                    title='Username'
                    value={profile.username}
                />
                <ProfileTextComponent
                    title='Email'
                    value={profile.email}
                />
            </Card>
            <View style={styles.logoutButtonStyle}>
                <Button
                    icon={<Icon name='rowing' color='#ffffff' />}
                    title='Logout'
                    onPress={()=>{
                        removeUserDetails()
                        alert('You will be logged out. Please Restart app.')
                        reduxDispatch(removeUserLogin())
                    }} 
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    textComponentStyle: {
        alignItems: 'center'
    },
    textComponentTitleStyle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textComponentValueStyle: {
        fontSize: 15
    },
    logoutButtonStyle: {
        marginVertical: 10,
        marginHorizontal: 50
    }
})


export default ProfileScreen
