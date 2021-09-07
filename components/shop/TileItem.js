import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from 'react-native';

import Card from '../UI/Card';

const ProductItem = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <Card style={styles.product}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onSelect} useForeground>
          <View style={{ flexDirection: 'column' }}>

            <Text style={styles.title}>{props.Item.Name}</Text>
            <View style={styles.details}>
              <View style={{ flex: 1, borderRadius: 1, height: '100%', marginLeft: 5, alignItems: 'flex-start' }}>
                <Text>دسته : {props.Item.CategoryTitle}{props.Item.Brand && (' - برند : ' + props.Item.Brand)}</Text>
                <MoneyLabelBox textDecorationLine={props.Item.Discount > 0} Label='قیمت:' Money={props.Item.Price1}></MoneyLabelBox>
                {props.Item.Discount > 0 && <MoneyLabelBox textDecorationLine={false} Label='پرداختی:' Money={props.Item.Price1 - props.Item.Discount}></MoneyLabelBox>}
                <Text  >{props.Item.Inventory > 0 ? 'موجود در انبار' : 'غیر موجود در انبار'}</Text>
              </View>
              {props.Item.Media && <Image borderRadius={15} style={styles.image} source={fetchPicture(props.Item.Media.URL, 'Product')} />}
            </View>

            <View style={styles.actions}>
              {props.children}
            </View>
            {
              props.Item.Discount > 0 &&
              <RibbonText backgroundColor='#EA0F0FAA' text={'تخفیف : ' + Math.trunc(props.Item.Discount * 100 / props.Item.Price1) + '%'}>

              </RibbonText>
            }
          </View>
        </TouchableCmp>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    margin: 3,
    padding: 5

  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
    width: '100%',
  },
  image: {
    width: 100,
    height: 100
  },
  details: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  title:
  {
    fontSize: 18,
    textAlign: 'center'
  },
  price: {
    fontSize: 14,
    color: '#888'
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});

export default ProductItem;
