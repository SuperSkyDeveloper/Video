import { StyleProp, ViewStyle, Platform, Dimensions } from 'react-native';
import { TextPresets } from '../text/text.props';

const { height } = Dimensions.get('screen');

const isAndroid = Platform.OS === 'android';

const BASE: ViewStyle = {
    flexDirection: 'row',
    marginTop: isAndroid ? 5 : 0.05 * height,
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
}

export const presets = {
    default: BASE,
}

export type HeaderPresets = keyof typeof presets;

export interface HeaderProps {
    style?: StyleProp<ViewStyle>
    preset?: HeaderPresets
    title?: string
    titlePreset?: TextPresets
}