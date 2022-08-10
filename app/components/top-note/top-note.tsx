import React from 'react';
import { Image, View, Dimensions } from 'react-native';
import { Button, Text } from '../';
import { color } from '../../theme/color';
import { Notification } from '../notification/notification';

const { height } = Dimensions.get('screen')

interface TopNoteProps {
    onPress: () => void
}

export const TopNote = (props: TopNoteProps) => {
    const { onPress } = props;
    return (
        <View
            style={{
                backgroundColor: color.black02,
                borderRadius: 10,
                padding: 10,
                flexDirection: 'row',
                position: 'absolute',
                bottom: 0.13 * height,
                left: 10, right: 10,
                alignItems: 'center',
                justifyContent: 'space-around'
            }}
        >
            <View>
                <Image source={{ uri: 'https://stgmedia.starzly.io/videos/3/8/2022/1OJa5bHPRzxmJrHAgzHBIXFiaFi1Eh6ScU48oTPY-thumbnail00001.png'}} style={{
                    width: 50, height: 50, borderRadius: 30,
                }} />
                <Notification number={1} preset='leftCommon' />
            </View>
            <View>
                <Text text='$140' preset='h3Bold' />
                <Text text='#Eau de Parfum' preset='h3Bold' />
                <Text preset='instruction' text='Top Notes: Bergamot...' numberOfLines={1} style={{flex: 1,}}/>
            </View>
            <Button 
                text='ADD TO CART' 
                style={{
                    backgroundColor: color.pink,
                    width: 80,
                    borderRadius: 10,
                }}
                textPreset='addCart'
                textStyle={{
                    textAlign: 'center',
                }}
                onPress={onPress}
            />
        </View>
    );
}