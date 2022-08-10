import React, { useEffect, useState } from 'react';
import { Dimensions, View, ViewStyle, } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Text, Button} from '../'
import { color } from '../../theme/color';

const { height } = Dimensions.get('screen');

const CONTAINER: ViewStyle = {
    position: 'absolute',
    top: 0.25 * height,
    right: 20,
}

interface SideBarProps {
    index: number
}

export const SideBar = (props: SideBarProps) => {
    const {index} = props;
    const [like, setLike] = useState<string>('0');

    useEffect(() => {
        // getLikes();
    }, [])

    async function getLikes() {
        let like = '0';
        try {
            const likes = await AsyncStorage.getItem('likes') || '';
            like = JSON.parse(likes)[index] || '0';
            setLike(like);
        } catch (error) {
            console.log('get async error: ', error);
        }
    }

    async function handleLike() {
        try {
            let stringLikes = await AsyncStorage.getItem('likes') || null;
            let likes = stringLikes ? JSON.parse(stringLikes) : [];
            // console.log('parse int likes index: ', (parseInt(likes[index] || '0') + 1).toString());
            
            likes[index] = likes ? (parseInt(likes[index] || '0') + 1).toString() : '0';

            await AsyncStorage.setItem('likes', JSON.stringify(likes))
            getLikes();
        } catch (error) {
            console.log('get async error: ', error);
        }
    }

    return (
        <View style={CONTAINER}>
            <Button
                preset='circleButton'
                Icon={<Feather name='heart' size={20} color={color.pink} />}
                onPress={handleLike}
            />
            <Text preset='button' text={like} style={{textAlign: 'center'}} />
            <Button
                preset='circleButton'
                Icon={<MaterialCommunityIcons name='dots-horizontal-circle-outline' size={20} color={color.white} />}
                notifications={3}
            />
            <Text preset='button' >27.2K</Text>
            <Button
                preset='circleButton'
                Icon={<MaterialCommunityIcons name='dots-horizontal-circle-outline' size={20} color={color.white} />}
            />
            <Button
                preset='circleButton'
                Icon={<MaterialCommunityIcons name='volume-mute' size={20} color={color.white} />}
                notifications={2}
            />
        </View>
    );
}