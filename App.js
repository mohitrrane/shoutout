import React from 'react'
import { View, Text } from 'react-native'
import RootComponent from './RootComponent'
import { Provider } from 'react-redux';
import store from './redux/store'

const App = () => {
  return (
    <Provider store={store}>
      <RootComponent/>
    </Provider>
  )
}

export default App
