import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import { Text } from 'react-native-elements';
import MoneyLabelBox from "../UI/MoneyLabelBox";
import Card from "../UI/Card";
import theme from '../../constants/theme';

const OrderListItem = props => {
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
      <View >
        <TouchableOpacity onPress={props.onClick}>
          <Text style={{ color: theme.linkColor, textAlign: 'center', fontSize: 16 }}> مشاهده سفارش </Text>

        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={props.onRemove}
          style={styles.deleteButton}>
          <Ionicons
            name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
            size={23}
            color="red"
          />
        </TouchableOpacity> */}

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
  cartItem: {
    marginTop: 5,
    marginHorizontal: 3,
    padding: 0,
    backgroundColor: 'white',

    justifyContent: 'space-between',

  },
  itemData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1

  },
  mainText: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center'
  },

});

export default OrderListItem;
