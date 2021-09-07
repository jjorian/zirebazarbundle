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
import ProductOrder from '../UI/ProductOrder';
import { ProductListView, ProductOrderItem } from '../../models/product';

const CartItem = props => {

  return (
    <Card style={styles.product}>
      <View style={styles.touchable}>

        <Text style={{ flex: 1, color: 'black', fontSize: 22, textAlign: 'center' }}>{props.Item.Title}</Text>
        <ProductOrder Product={new ProductOrderItem(props.Item.PId, props.Item.Title, props.shopId, props.Item.Price, props.Item.Discount)} type='Cart'></ProductOrder>
      </View>
    </Card>
  );
};
const styles = StyleSheet.create({
  product: {
    marginVertical: 5,
    marginHorizontal: 3,

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

export default CartItem;
