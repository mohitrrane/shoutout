import React, {useState, useEffect, useReducer} from 'react'
import { ActivityIndicator, ScrollView, View, Text } from 'react-native'
import { ListItem, ButtonGroup, Button, Avatar, Slider, Card } from 'react-native-elements'
import { QuestionComponent, SelectionComponent, MidResultComponent, EndResultComponent, WaitingComponent} from '../components/GamePlayComponents'
import {useSelector} from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import {fetchData} from '../helpers/dataFetchFunctions'
import {urlFor} from '../../sharedInfo'

const GamePlayScreen = ({navigation, route}) => {
    const [count, setCount] = useState(0)
    const token = useSelector(state => state.token)

    const [isLoading, setIsLoading] = useState(true)
    const [gameKey, setGameKey] = useState(route.params.gameKey)

    const initialState = {
        gameState: {num: null, event: null},
        usersState: [{username: null, state: null}],
        myState: {username: null, state: null}
    }

    const stateReducer = (state, action)=>{
        switch(action.type){
            case 'gameState':
                return {...state, gameState: action.payload}
            case 'usersState':
                return {...state, usersState: action.payload}
            case 'myState':
                return {...state, myState: action.payload}
            case 'setDefault':
                return initialState
            default:
                return state
        }
    }

    const [state, stateDispatch] = useReducer(stateReducer, initialState)

    const initialGameState = {
        question: null,
        myAnswer: null,
        allAnswers: null,
        mySelection: null,
        midResult: null,
        endResult: null,
        isReady: null
    }

    const gameReducer = (state, action)=>{
        switch(action.type){
            case 'question':
                return {...state, question: action.payload}
            case 'myAnswer':
                return {...state, myAnswer: action.payload}
            case 'allAnswers':
                return {...state, allAnswers: action.payload}
            case 'mySelection':
                return {...state, mySelection: action.payload}
            case 'midResult':
                return {...state, midResult: action.payload}
            case 'endResult':
                return {...state, endResult: action.payload}
            case 'isReady':
                return {...state, isReady: action.payload}
            case 'setDefault':
                return initialGameState
            default:
                return state
        }
    }
    
    const [game , gameDispatch] = useReducer(gameReducer, initialGameState)

    async function fetchAllStates(){
        const jsonData={
            game_key: gameKey
        }
        const res = await fetchData(urlFor.getAllStates, jsonData, token, 'POST')
        if(res){
            if(res.data){
                const allStates = res.data
                stateDispatch({type: 'gameState', payload: allStates.game_state})
                stateDispatch({type: 'usersState', payload: allStates.users_state})
                stateDispatch({type: 'myState', payload: allStates.my_state})
            }
        }
        console.log(`States fetched`)
    }

    async function fetchQuestion(gameKey, questionNumber){
        const jsonData = {
            game_key: gameKey,
            qn_num: questionNumber
        }
        const res = await fetchData(urlFor.getQuestion, jsonData, token, 'POST')
        if (res){
            if(res.data){
                const question = res.data
                gameDispatch({type: 'question', payload: question.question})
            }
        }
        console.log(`Question Number ${questionNumber} fetched`)
    }

    async function submitAnswer(gameKey, answer, questionNumber) {
        const jsonData = {
            game_key: gameKey,
            qn_num: questionNumber,
            answer: answer
        }
        await fetchData(urlFor.submitAnswer, jsonData, token, 'POST')
        console.log(`Answer Number ${questionNumber} submitted`)
    }

    const onSubmitAnswer = (answer)=>{
        submitAnswer(gameKey, answer, state.gameState.num)
        .then(()=>{
            console.log('Answer Submitted')
            //stateDispatch({type: 'myState', payload: {...state.myState, state: 'waiting'}})
        })
    }

    async function fetchAnswers(gameKey, questionNumber){
        const jsonData = {
            game_key: gameKey,
            qn_num: questionNumber
        }
        const res = await fetchData(urlFor.getAnswers, jsonData, token, 'POST')
        if (res){
            if(res.data){
                const allAnswers = res.data
                gameDispatch({type: 'allAnswers', payload: allAnswers})
            }
        }
        console.log(`Answers for question Number ${questionNumber} fetched`)
    }

    async function submitSelection(gameKey, answer, questionNumber) {
        const jsonData = {
            game_key: gameKey,
            qn_num: questionNumber,
            answer: answer
        }
        await fetchData(urlFor.submitSelection, jsonData, token, 'POST')
        console.log(`Selection for question Number ${questionNumber} submitted`)
    }

    const onSubmitSelection = (selection)=>{
        submitSelection(gameKey, selection, state.gameState.num)
        .then(()=>{
            console.log('Selection Submitted')
            //stateDispatch({type: 'myState', payload: {...state.myState, state: 'waiting'}})
        })
    }

    async function fetchMidResult(gameKey, questionNumber){
        const jsonData = {
            game_key: gameKey,
            qn_num: questionNumber
        }
        const res = await fetchData(urlFor.getMidResult, jsonData, token, 'POST')
        if (res){
            if(res.data){
                const midResult = res.data
                gameDispatch({type: 'midResult', payload: midResult})
            }
        }
        console.log(`Mid Result ${questionNumber} fetched`)
    }

    async function fetchEndResult(gameKey){
        const jsonData = {
            game_key: gameKey
        }
        const res = await fetchData(urlFor.getEndResult, jsonData, token, 'POST')
        if (res){
            if(res.data){
                const endResult = res.data
                gameDispatch({type: 'endResult', payload: endResult})
            }
        }
        console.log(`End Result ${state.gameState.num} fetched`)
    }

    async function beReady(gameKey) {
        const jsonData = {
            game_key: gameKey
        }
        await fetchData(urlFor.beReady, jsonData, token, 'POST')
        console.log(`Ready Status Submitted`)
    }

    const onBeingReady = ()=>{
        beReady(gameKey)
        .then(()=>{
            gameDispatch({type:'setDefault'})
        })
    }

    useEffect(()=>{
        fetchAllStates()
        .then(()=>{
            fetchQuestion(gameKey, state.gameState.num)
            .then(()=>{
                setIsLoading(false)
            })
        })
    }, [])

    useEffect(() => {
        let isMounted = true
        if (isMounted){
            fetchAllStates()
            .then(()=>{
                if(state.myState.state != 'waiting'){
                    if (state.gameState.event === 'question'){
                        if(!game.question){
                            setIsLoading(true)
                            fetchQuestion(gameKey, state.gameState.num)
                            .then(()=>{
                                setIsLoading(false)
                            })
                        } 
                    } else if (state.gameState.event === 'selection'){
                        if(!game.allAnswers){
                            console.log(game)
                            setIsLoading(true)
                            fetchAnswers(gameKey, state.gameState.num)
                            .then(()=>{
                                setIsLoading(false)
                            })
                        }
                    } else if (state.gameState.event === 'midresult'){
                        if(!game.midResult){
                            setIsLoading(true)
                            fetchMidResult(gameKey, state.gameState.num)
                            .then(()=>{
                                fetchEndResult(gameKey)
                                .then(()=>{
                                    setIsLoading(false)
                                })
                            })
                        }                     
                    } else if (state.gameState.event === 'ended'){
                        if(!game.endResult){
                            setIsLoading(true)
                            fetchEndResult(gameKey)
                            .then(()=>{
                                setIsLoading(false)
                            })
                        }
                    }
                }
            })
        }
        return (()=>{
            isMounted=false
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
            //console.log(interval)
            clearTimeout(interval)
        };
        }, [count])
    );


    if(isLoading){
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <ActivityIndicator 
                    size="large" 
                    color="#0000ff" 
                />
            </View>
        )
    }

    switch(state.myState.state){
        case 'waiting':
            if (state.usersState){
                return (
                    <ScrollView>
                        <WaitingComponent
                            users={state.usersState}
                        />
                    </ScrollView>
                )
            }
            
        case 'question':
            if(game.question){
                return (
                    <ScrollView>
                        <QuestionComponent
                            question={game.question}
                            onSubmitAnswer={onSubmitAnswer}
                        />
                    </ScrollView>
                )
            }
        case 'selection': 
            if(game.allAnswers){
                return (
                    <ScrollView>
                        <SelectionComponent
                            answers={game.allAnswers}
                            onSubmitSelection={onSubmitSelection}
                        />
                    </ScrollView>
                )
            }
        case 'midresult':
            if(game.midResult){
                return (
                    <ScrollView>
                        <MidResultComponent
                            midResult={game.midResult}
                        />
                        <EndResultComponent
                            endResult={game.endResult}
                        />
                        <Button
                            title='Ready'
                            onPress={()=>{
                                onBeingReady()
                            }}
                        />
                    </ScrollView>
                )
            }
        default:
            return (
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator 
                        size="large" 
                        color="#0000ff" 
                    />
                </View>
            )
    }
}

export default GamePlayScreen
