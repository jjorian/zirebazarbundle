import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import {
  Card, Text
} from 'react-native-elements';

import MoneyLabelBox from "../UI/MoneyLabelBox";
import { Ionicons } from '@expo/vector-icons';
import theme from '../../constants/theme';

const AddressItem = props => {
  return (
    <Card containerStyle={styles.cartItem}>
      <TouchableOpacity
        onPress={props.onClick}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ flex: 1, color: 'black', fontSize: 14, textAlign: 'left' }}>{props.Item.LocateTitle}</Text>
          <Text style={{ color: theme.linkColor, fontSize: 10, textAlign: 'right' }} onPress={props.onEdit}>ویرایش</Text>
        </View>
        <View style={styles.itemData}>
          <Text style={styles.mainText}> {props.Item.Details} </Text>
        </View>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    marginTop: 8,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
  },
  itemData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1

  },
  mainText: {
    fontSize: 14,
    color: 'black'
  },

});

export default AddressItem;
