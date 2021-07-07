import React, {useState} from 'react'
import { ScrollView, Share, Text, View } from 'react-native'
import { ListItem, ButtonGroup, Button, Avatar, Slider, Card, Input } from 'react-native-elements'
import {fetchData} from '../helpers/dataFetchFunctions'
import {urlFor} from '../../sharedInfo'
import {useSelector } from 'react-redux'

const QuestionComponent = ({question, onSubmitAnswer}) => {
    const [answer, setAnswer] = useState('')
    return (
        <View>
            <Card>
                <Card.Title>Question: {question}</Card.Title>
                <Input
                    onChangeText={(answer=>{
                        setAnswer(answer)
                    })}
                />
                <Button
                    title='Submit Answer'
                    onPress={()=>{
                        if(answer != ''){
                            onSubmitAnswer(answer)
                        }
                    }}
                />
            </Card>
        </View>
    )
}

const SelectionComponent = ({answers, onSubmitSelection}) => {
    const [selection, setSelection] = useState('')
    selectionList = answers.map(answer => {
        return (
            <ListItem 
                key={answer.user} 
                onPress={()=>{
                    setSelection(answer.answer)
                }}
            >
                <ListItem.Title>{answer.answer}</ListItem.Title>
            </ListItem>
        )
    })
    return (
        <View>
            {selectionList}
            <Button
                title='Submit'
                onPress={()=>{
                    if(selection != ''){
                        onSubmitSelection(selection)
                    }
                }}
            />
        </View>
    )
}

const MidResultComponent = ({midResult})=>{
    const midResultList = midResult.map(result => {
        return (
            <ListItem 
                key={result.user} 
            >
                <ListItem.Title>{result.user}</ListItem.Title>
                <ListItem.Subtitle>{result.score}</ListItem.Subtitle>
            </ListItem>
        )
    })

    return (
        <View>
            <Text>
                Result of the last question
            </Text>
            {midResultList}
        </View>
    )
}

const EndResultComponent = ({endResult})=>{
    const endResultList = endResult.map(result => {
        return (
            <ListItem 
                key={result.user} 
            >
                <ListItem.Title>{result.user}</ListItem.Title>
                <ListItem.Subtitle>{result.score}</ListItem.Subtitle>
            </ListItem>
        )
    })

    return (
        <View>
            <Text>
                Overall leaderboard
            </Text>
            {endResultList}
        </View>
    )
}

const WaitingComponent = ({users})=>{
    const usersList = users.map(user => {
        return (
            <ListItem 
                key={user.username} 
            >
                <ListItem.Title>{user.username}</ListItem.Title>
                <ListItem.Subtitle>{user.state}</ListItem.Subtitle>
            </ListItem>
        )
    })
    return(
        <View>
            {usersList}
        </View>
    )
}

export { QuestionComponent, SelectionComponent,  MidResultComponent, EndResultComponent, WaitingComponent}