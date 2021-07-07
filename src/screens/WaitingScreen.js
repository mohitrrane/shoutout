import React, {useState, useEffect} from 'react'
import { ScrollView, Share, Text, ActivityIndicator, View } from 'react-native'
import { ListItem, ButtonGroup, Button, Avatar } from 'react-native-elements'
import { useFocusEffect } from '@react-navigation/native'
import {fetchData} from '../helpers/dataFetchFunctions'
import {urlFor} from '../../sharedInfo'
import {useSelector } from 'react-redux'

const WaitingScreen = ({navigation, route}) => {
    const [count, setCount] = useState(0)
    const token = useSelector(state => state.token)

    const [gameKey, setGameKey] = useState(route.params.gameKey)
    const [loading, setLoading] = useState(true)
    const [allStates, setAllStates] = useState(null)

    const onPressEnter = ()=>{
        const jsonData = {
            game_key: gameKey
        }
        fetchData(urlFor.enterGame, jsonData, token, 'POST')
    }

    useEffect(()=>{
        //fetchAllStates()
        let isCancelled = false
        const jsonData = {
            game_key: gameKey
        }
        console.log('Hi')
        fetchData(urlFor.getAllStates, jsonData, token, 'POST')
        .then(res=>{
            if (!isCancelled){
                if(res.data!=null){
                    if(res.data.game_state.event === 'question'){
                        navigation.navigate('GamePlay', {gameKey: gameKey})
                    }
                    setAllStates(res.data)
                    setLoading(false)

                }
            }
        })
        .catch((err)=>{
            if (!isCancelled){
                console.log(err)
                alert('API call failed')
                navigation.navigate('Start')
            }
        })

        return (()=>{
            return isCancelled = true
        })

    }, [count])

    useFocusEffect(
        React.useCallback(() => {
        // Do something when the screen is focused
        function countPlus(){
            setCount(count+1)
        }
        let interval = setInterval(()=>countPlus(), 10000)
    
        return () => {
            // Do something when the screen is unfocused
            // Useful for cleanup functions
            console.log(count)
            //console.log(interval)
            clearTimeout(interval)
        };
        }, [count])
    );

    if(loading){
        return(
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator 
              size="large" color="#0000ff" />
        </View>
        )
        
    }

    const userList = allStates.users_state.map((user)=>{
        return(
            <View key={user.username}>
                <ListItem bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>{user.username}</ListItem.Title>
                    </ListItem.Content>
                </ListItem>
            </View>
        )
    })

    return (
        <ScrollView>
            <ButtonGroup
                buttons={gameKey.split('')}
                textStyle={{fontSize: 25}}
                containerStyle={{height: 40}}
                disabled
            />
            <Button
                title='Share Code'
                type='clear'
                onPress={()=>{
                    Share.share({
                        title: 'Join on ShoutOut',
                        message: `Join us on the ShoutOut. ShoutOut Code for the game: ${gameKey.toUpperCase()}`
                    })
                }}
            />
            { userList }
            <Button
                title="Enter Game"
                onPress={()=>{
                    onPressEnter()
                }}
            />
        </ScrollView>
    )
}

export default WaitingScreen
