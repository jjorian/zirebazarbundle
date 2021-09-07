import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import { Text } from 'react-native-elements';
import MoneyLabelBox from "../UI/MoneyLabelBox";
import { Ionicons } from '@expo/vector-icons';
import theme from '../../constants/theme';
import Card from '../UI/Card';
import { ICON_SET } from '../../constants/enums';
import { Icon } from 'react-native-elements/dist/icons/Icon';

const CartListItem = props => {
  return (
    <Card style={styles.product}>
      <View style={styles.itemData}>
        <Text style={{ flex: 1, color: 'black', fontSize: 15, textAlign: 'left' }}>{props.Item.ShopTitle}</Text>
        <Text style={{ flex: 1, color: 'black', fontSize: 15, textAlign: 'right' }}>{props.Item.CDateTime.substring(0, 16)}</Text>

      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainText}> {props.Item.StatusTitle} </Text>
        <MoneyLabelBox style={{ justifyContent: 'flex-end' }} Money={props.Item.Sum} Label="جمع:"></MoneyLabelBox>
      </View>
      <View style={styles.itemData}>
        <TouchableOpacity
          onPress={props.onClick}
        >
          <Text style={[styles.mainText], { color: theme.linkColor }}> برو به سبد </Text>

        </TouchableOpacity>
        <TouchableOpacity
          onPress={props.onRemove}
          style={styles.deleteButton}>
          <Icon
            name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
            type={ICON_SET.IC}
            color="red"
          />
        </TouchableOpacity>

      </View>

    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    marginVertical: 5,
    marginHorizontal: 3,
    padding: 10
  },
  itemData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1

  },
  mainText: {
    flex: 1,
    fontSize: 14,
    color: 'black',
    textAlign: 'left'
  },

});

export default CartListItem;
