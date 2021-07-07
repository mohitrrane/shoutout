import React, {useState} from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import {Card, Input, Button, Divider} from 'react-native-elements'
import {fetchData} from '../helpers/dataFetchFunctions'
import {urlFor} from '../../sharedInfo'
import {useSelector } from 'react-redux'

const JoinScreen = ({navigation}) => {
    const [joinKey, setJoinKey] = useState(null)
    const token = useSelector(state => state.token)

    const onJoinGame = ()=>{
        const joinInfo = {
            game_key: joinKey,
        }
        fetchData(urlFor.join, joinInfo, token, 'POST')
        .then(resp=>{
            if(resp){
                const gameKey = resp.data.game_key
                navigation.navigate('Waiting',{gameKey: gameKey})
            } else {
                console.log(resp)
                alert('Game key not found')
            }
        })
        .catch((err)=>{
            console.log(err)
            alert('Something went wrong')
        })
    }

    return (
        <ScrollView>
            <Card>
                <Card.Title h4>Enter join key here</Card.Title>
                <Divider></Divider>
                <Input 
                    onChangeText={(text)=>{
                        setJoinKey(text)
                    }}
                />
                <Button 
                    title='Join'
                    onPress={()=>{
                        if(joinKey){
                            onJoinGame()
                        } else {
                            alert('Please enter the join key')
                        }
                        
                    }}
                />
            </Card>
        </ScrollView>
    )
}



export default JoinScreen
