import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import {ListItem, Button, Divider} from 'react-native-elements'

const InfoScreen = () => {
    return (
        <ScrollView>
            <ListItem>
                <ListItem.Content>
                    <ListItem.Title> How to play </ListItem.Title>
                    <ListItem.Subtitle> Click here to know the rules. </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron/>
            </ListItem>

            <Divider/>

            <ListItem>
                <ListItem.Content>
                    <ListItem.Title> About Us </ListItem.Title>
                    <ListItem.Subtitle> Know more about us. </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron/>
            </ListItem>
        </ScrollView>
    )
}

export default InfoScreen
