import React, { useState } from 'react'
import { ScrollView, Share, Text, View } from 'react-native'
import { ListItem, ButtonGroup, Button, Avatar, Slider, Card } from 'react-native-elements'
import {fetchData} from '../helpers/dataFetchFunctions'
import {urlFor} from '../../sharedInfo'
import {useSelector } from 'react-redux'

const StartScreen = ({navigation}) => {
    const [value, setValue] = useState(5)
    const token = useSelector(state => state.token)
    
    const onStartGame = ()=>{
        const gameInfo = {
            game_type: 'mining_the_answers',
            n_questions: value
        }
        fetchData(urlFor.start, gameInfo, token, 'POST')
        .then(resp=>{
            if(resp.data.game_key){
                const gameKey = resp.data.game_key
                navigation.navigate('Waiting',{gameKey: gameKey})
            } else {
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
                <Card.Title h4>Number of Questions</Card.Title>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{marginTop: 10}}>1</Text>
                    <View style={{flex: 1, marginHorizontal: 10}}>
                        <Slider
                            value={value}
                            onValueChange={(value)=>setValue(value)}
                            maximumValue={10}
                            minimumValue={1}
                            step={1}
                        />
                    </View>
                    <Text style={{marginTop: 10}}>10</Text>
                </View>
                <Text>Start with {value} questions</Text>
                <Button
                    title="Start"
                    onPress={()=>{
                        onStartGame()
                    }}
                />
            </Card>

        </ScrollView>
    )
}

export default StartScreen
