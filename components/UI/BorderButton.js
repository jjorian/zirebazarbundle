
import React from 'react';
import {

    Text,

} from 'react-native-elements';

import {
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import theme from '../../constants/theme';
const BorderButton = props => {
    return (
        <TouchableOpacity style={[props.style, styles.loginBtn]} onPress={props.onPress}>
            <Text style={styles.loginText, { fontSize: props.fontSize }} >{props.Title}</Text>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({

    loginBtn: {
        borderColor: theme.primary,
        alignItems: "center",
        justifyContent: "center",
    },
    loginText: {

    }


});
export default BorderButton;
