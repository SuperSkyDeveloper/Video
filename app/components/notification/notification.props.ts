import { StyleProp, ViewStyle } from "react-native";
import { color } from "../../theme/color";

const BASE: ViewStyle = {
    position: 'absolute',
    backgroundColor: color.yeallow01,
    height: 25,
    width: 25,
    borderRadius: 30,
    bottom: 3, left: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: color.white
}

export const presets = {
    default: BASE,
    small: {
        ...BASE,
    } as ViewStyle,
    leftCommon: {
        ...BASE,
        bottom: 20, left: -12,
    } as ViewStyle,
}

export type NotificationPresets = keyof typeof presets;

export interface NotificationProps {
    style?: StyleProp<ViewStyle>
    number?: number
    preset?: NotificationPresets
}