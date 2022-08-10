import React from 'react';
import { StyleProp, TextProps as TextProperties, TextStyle } from "react-native";
import { color } from '../../theme/color';

const size = {
    h1: 24,
    h2: 18,
    h3: 15,
    h4: 13,
    h5: 11,
    h6: 10,
    body1: 15,
    body2: 12,
    button: 16,
    caption: 12,
    label: 14,

    input: 18,
    regular: 17,
    medium: 16,
    small: 12,
    tiny: 8.5,
}

const BASE: TextStyle = {
    fontSize: size.body1,
    color: color.black,
}

export const presets = {
    default: BASE,
    h1: {
        fontSize: size.h1,
        color: color.white,
    } as TextStyle,
    h2: {
        fontSize: size.h2,
        color: color.white,
    } as TextStyle,
    h3Bold: {
        fontSize: size.h3,
        fontWeight: 'bold',
        color: color.white,
    } as TextStyle,
    tabTitle: {
        fontSize: size.body2,
        color: color.white
    } as TextStyle,
    button: {
        fontSize: size.button,
        color: color.white,
    } as TextStyle,
    notificationNumber: {
        fontSize: size.tiny,
        color: color.white,
    } as TextStyle,
    instruction: {
        fontSize: size.small,
        color: color.white,
    } as TextStyle,
    addCart: {
        fontSize: size.label,
        fontWeight: '600',
        color: color.white,
    } as TextStyle,
}

export type TextPresets = keyof typeof presets

export interface TextProps extends TextProperties {
    children?: React.ReactNode
    style?: StyleProp<TextStyle>
    preset?: TextPresets
    text?: string
}