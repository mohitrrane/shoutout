import React, {useState} from 'react'
import { ScrollView, Share, Text, View } from 'react-native'
import { ListItem, ButtonGroup, Button, Avatar, Slider, Card, Input } from 'react-native-elements'
import {fetchData} from '../helpers/dataFetchFunctions'
import {urlFor} from '../../sharedInfo'
import {useSelector } from 'react-redux'

const TestComponent = ({newData}) => {
    return (
        <View>
            <Card>
                <Card.Title>Question: {newData}</Card.Title>
                <Input
                     onChangeText={()=>{
                        
                    }}
                />
                <Button
                    onPress={()=>{
                        
                    }}
                />
            </Card>
        </View>
    )
}

export {TestComponent}


// const TestComponent = ({question, onSubmitAnswer}) => {
//     const [answer, setAnswer] = useState('')
//     return (
//         <View>
//             <Card>
//                 <Card.Title>Question</Card.Title>
//                 <Card.SubTitle>{question}</Card.SubTitle>
//                 <Input
//                     onChangeText={(answer=>{
//                         setAnswer(answer)
//                     })}
//                 />
//                 <Button
//                     onPress={()=>{
//                         if(answer != ''){
//                             onSubmitAnswer(answer)
//                         }
//                     }}
//                 />
//             </Card>
//         </View>
//     )
// }
