import React from 'react';
import { View } from 'react-native'
import { Text } from '../';
import { NotificationProps, presets } from './notification.props';

export const Notification = (props: NotificationProps) => {
    const {number, preset = 'default', style} = props;

    const styles = [presets[preset], style];

    return (
        <View style={styles}>
            <Text preset='button' text={number?.toString()} />
        </View>
    );
}