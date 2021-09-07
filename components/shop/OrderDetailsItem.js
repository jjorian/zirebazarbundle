import React from 'react';
import {
  View,
  StyleSheet,

} from 'react-native';
import { Text } from 'react-native-elements';
import MoneyLabelBox from "../UI/MoneyLabelBox";

const OrderDetailsItem = props => {
  return (
    <View style={styles.product}>
      <Text style={{ color: 'black', fontSize: 16, textAlign: 'center' }}>{props.Item.Title}</Text>
      <View style={styles.cartItem}>
        <View style={styles.grid}>
          <Text style={styles.labelGrid}>قیمت</Text>
          <MoneyLabelBox style={{ justifyContent: 'center' }} labelStyle={{ color: 'black', fontSize: 14 }} textStyle={{ color: 'black', fontSize: 16 }} Money={props.Item.Price}></MoneyLabelBox>

        </View>
        <View style={styles.grid}>
          <Text style={styles.labelGrid}>تعداد</Text>
          <MoneyLabelBox style={{ justifyContent: 'center' }} labelStyle={{ color: 'black', fontSize: 14 }} textStyle={{ color: 'black', fontSize: 16 }} Money={props.Item.Count} />
        </View>
      </View>
      <View style={styles.cartItem}>
        <View style={styles.grid}>
          <Text style={styles.labelGrid}>تخفیف</Text>
          <MoneyLabelBox style={{ justifyContent: 'center' }} labelStyle={{ color: 'black', fontSize: 14 }} textStyle={{ color: 'black', fontSize: 16 }} Money={props.Item.Discount} />
        </View>
        <View style={styles.grid}>
          <Text style={styles.labelGrid}>جمع کل</Text>
          <MoneyLabelBox style={{ justifyContent: 'center' }} labelStyle={{ color: 'black', fontSize: 14 }} textStyle={{ color: 'black', fontSize: 16 }} Money={props.Item.Price * props.Item.Count - props.Item.Discount} />
        </View>
      </View>
      {props.Item.Comment.length > 0 && <Text style={styles.textLong}>شرح ردیف:{props.Item.Comment}</Text>}


    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    marginVertical: 2,
    marginHorizontal: 1,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: 'white',
    padding: 10
  },
  cartItem: {
    flexDirection: 'row',
    marginTop: 5,
    marginHorizontal: 3,
    padding: 0,
    backgroundColor: 'white',

    justifyContent: 'space-between',

  },
  grid: {
    flexDirection: 'row',
    // /backgroundColor: 'green',
    flex: 1
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
  labelGrid: {
    fontSize: 12,
    color: 'gray',
    textAlignVertical: 'center',
    //backgroundColor: 'red',
    width: 60,
    textAlign: 'left'
  },
  textGrid: {
    fontSize: 14,
    color: 'black',
    backgroundColor: 'red',
    textAlign: 'center'
  },

});

export default OrderDetailsItem;
