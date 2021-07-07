import React, {useEffect, useState} from 'react'
import { View, Text, ScrollView } from 'react-native'
import {ListItem, Button} from 'react-native-elements'

const HomeScreen = ({navigation}) => {    
    return (
        <ScrollView>
            <Button
                title="Join Game"
                type="outline"
                onPress={()=>{
                    navigation.navigate('Join')
                }}
            />

            <ListItem onPress={()=>{
                navigation.navigate('Start')
            }}>
                <ListItem.Content>
                    <ListItem.Title> Mining The Answers </ListItem.Title>
                    <ListItem.Subtitle> Play this game only on ShoutOut. </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron/>
            </ListItem>
        </ScrollView>
    )
}

export default HomeScreen
