import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { color } from '../../theme/color';
import { Text, Notification } from '../';
import { ButtonProps, presets } from './button.props';

export const Button = (props: ButtonProps) => {
    const { children, text, Icon = null, LeftIcon = null, preset = 'default', textPreset = 'default', style, textStyle, notifications,...rest} = props;

    const content = children || (text ? <Text text={text} preset={textPreset} style={textStyle} /> : null);

    const styles = [presets[preset], style]

    return (
        <TouchableOpacity
            style={styles}
            {...rest}
        >
            { LeftIcon }
            { content }
            { Icon }
            { notifications &&  <Notification number={notifications} /> }
        </TouchableOpacity>
    );
}