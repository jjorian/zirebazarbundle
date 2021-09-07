import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-elements';
import theme from '../../constants/theme';

const LoadingServer = props => {
    return (

        <View style={{ alignContent: 'center', alignItems: 'center' }}>
            <Text>صبور باشید </Text>
            <ActivityIndicator size='large' color={theme.primary} />
        </View>

    );
};

const styles = StyleSheet.create({
    center: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    }
});

export default LoadingServer;
