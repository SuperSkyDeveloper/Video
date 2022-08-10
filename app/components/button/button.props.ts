import React from "react";
import { StyleProp, TextStyle, TouchableOpacityProps, ViewStyle } from "react-native";
import { color } from "../../theme/color";
import { TextPresets } from "../text/text.props";

const BASE: ViewStyle = {
    padding: 10,
}

export const presets = {
    default: BASE,
    circleButton: {
        backgroundColor: color.black01,
        padding: 10,
        borderRadius: 20,
        marginVertical: 10,
    } as ViewStyle,
}

export type ButtonPresets = keyof typeof presets;

export interface ButtonProps extends TouchableOpacityProps {
    text?: string
    children?: React.ReactNode
    style?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>
    preset?: ButtonPresets
    textPreset?: TextPresets
    Icon?: React.ReactNode
    notifications?: number
    LeftIcon?: React.ReactNode
}