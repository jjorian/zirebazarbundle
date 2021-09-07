import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import Card from '../UI/Card';
import { MEMBER_STATUS_TITLE } from "../../constants/enums";
import theme from '../../constants/theme';
import { TouchableOpacity } from 'react-native-gesture-handler';

const MemberStatusTitle = props => {
    return (
        <Card style={styles.orderItem}>
            <TouchableOpacity onPress={props.onClick}>
                <View style={styles.summary}>
                    <Text style={styles.detailItems}>{MEMBER_STATUS_TITLE[props.memberStatus]}</Text>
                </View>
            </TouchableOpacity>
        </Card>
    );
};

const styles = StyleSheet.create({
    orderItem: {
        marginVertical: 10,
        height: 40,
        alignSelf: 'center',
        width: '50%',
        overflow: 'hidden'
    },
    summary: {
        height: '100%',
        flexDirection: 'row',
    },
    detailItems: {
        backgroundColor: theme.primary,
        color: 'white',
        textAlignVertical: 'center',
        textAlign: 'center',
        width: '100%',
    }
});

export default MemberStatusTitle;
