import React from 'react'
import { StyleSheet } from 'react-native'
import { ListItem } from 'react-native-elements'

const UserElement = ({key, waiting}) => {
    const [iconName, setIconName] = useState(null)
    if (waiting){
        setIconName('checkcircle')
    } else {
        setIconName('closecircle')
    }

    return (
    <ListItem key={key} bottomDivider>
        <ListItem.Content>
            <ListItem.Title>{name}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron
            name={iconName}
        />
    </ListItem>
    )
}

export { UserElement }
