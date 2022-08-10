import React, { FC } from 'react';
import { View } from 'react-native'
import { HeaderProps, presets } from './header.props';
import { Text } from '../text/text';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons'
import { color } from '../../theme/color';

export const Header: FC<HeaderProps> = ({
    style,
    preset = 'default',
    title = '',
    titlePreset,
}) => {

    const headerStyle = [style, presets[preset]]

    return (
        <View style={headerStyle}>
            <Text preset={titlePreset || 'h2'} text={title} />
            <MaterialCommunity name='dots-horizontal' size={30} color={color.white} />
        </View>
    );
}