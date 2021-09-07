import React from 'react';
import {
  View,

  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import Card from '../UI/Card';
import { Text } from 'react-native-elements';

import MoneyLabelBox from "../UI/MoneyLabelBox";
import { Ionicons } from '@expo/vector-icons';

const DialogListItem = props => {
  return (
    <Card style={styles.product}>
      <View style={styles.touchable}>

        <View style={styles.itemData}>
          <TouchableOpacity
            style={{ width: '100%' }}
            onPress={props.onSelectItem}>
            <Text style={{ flex: 1, color: 'black', fontSize: 22, textAlign: 'center' }}>{props.Item.Title}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    marginVertical: 5,
    width: '100%'
  },
  touchable: {
    borderRadius: 10,
    margin: 5,
    overflow: 'hidden'
  },
  itemData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1

  },
  mainText: {
    fontSize: 16,
    color: 'black'
  },
  deleteButton: {
    marginLeft: 20
  }
});

export default DialogListItem;
