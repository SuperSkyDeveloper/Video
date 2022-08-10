import React from 'react';
import { Text as RNText } from 'react-native';
import { TextProps, presets } from './text.props';

export const Text = (props: TextProps) => {
    const { preset = 'default', style, children, text, ...rest } = props;

    const content = text || children;

    const styles = [presets[preset], style]

    return (
        <RNText {...rest} style={styles}>
            {content}
        </RNText>
    );
}