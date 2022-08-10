import React from 'react';
import { View, ViewStyle } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { color } from '../../theme/color';
import { Text } from '../text/text';

const CONTAINER: ViewStyle = {
    flexDirection: 'row',
    justifyContent: 'space-around',
    zIndex: 1000,
    position: 'absolute',
    bottom: 5,
    left: 0,
    right: 0,
}

const TAB_BUTTON_CONTAINER: ViewStyle = {
    justifyContent: 'center',
    alignItems: 'center'
}

const tabs = [
    { title: 'Discover', Icon: Feather, iconName: 'compass', },
    { title: 'Stars', Icon: Feather, iconName: 'search', },
    { title: 'Add', Icon: Feather, iconName: 'plus-square', },
    { title: 'Cart', Icon: Feather, iconName: 'shopping-cart', },
    { title: 'Profile', Icon: EvilIcons, iconName: 'user', },
]

export const TabBar = () => {
    return (
        <View style={CONTAINER}>
            <View 
                style={{
                    position: 'absolute',
                    bottom: -20,
                    left: 0,
                    right: 0,
                    height: 70,
                    backgroundColor: 'black',
                    opacity: 0.05
                }} 
            />
            {
                tabs.map(tab => {
                    const {Icon, title, iconName} = tab
                    return (
                        <View key={`bottom-tab-${iconName}`} style={TAB_BUTTON_CONTAINER}>
                            <Icon name={iconName} size={20} color={color.white} />
                            <Text text={title} preset='tabTitle' style={{paddingTop: 5,}} />
                        </View>
                    );
                })
            }
        </View>
    );
}