import React, { useContext, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import { Text, Image, Icon } from 'react-native-elements';
import MoneyLabelBox from './MoneyLabelBox';
import { ICON_SET } from '../../constants/enums';
import useAddEditProduct from '../../Hooks/useAddEditProduct';
import DialogAddEditProduct from './DialogAddEditProduct';
import { GlobalContext } from '../../context/GlobalContext';
import { ShopContext } from '../../context/ShopContext';
import { OrderRowView } from '../../models/order';

const ProductOrder = props => {
  const { state } = useContext(GlobalContext);
  const [addEditProduct, setAddEditProduct] = useState(null);
  const { shopState, shopDispatch } = useContext(ShopContext);
  const [isAddEditing, onAddEditItem, headIdByRow] = useAddEditProduct(props.Product.ShopId, state.userId, 1, props.type);


  const getHId = () => {
    switch (props.type) {
      case 'Cart':
        {
          return shopState.cartHeadId;
        }
      case 'Shop':
        return shopState.shopHeadId;
    }

  }


  const OrderRow = shopState.rowsCard.find(x => x.PId === props.Product.ID && x.HId === getHId());

  return (
    <View style={styles.touchable}>
      <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row', marginTop: 10 }}>
        {addEditProduct && <DialogAddEditProduct Product={addEditProduct} onPressClose={() => { setAddEditProduct(null) }} type={props.type} />}
        {OrderRow ? (
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'transparent' }}>
            <Text style={{ textAlign: 'center', textAlignVertical: 'center' }}> تعداد:  {OrderRow.Count}    </Text>
            <MoneyLabelBox Label='جمع:' Money={OrderRow.Count * (OrderRow.Price - OrderRow.Discount)}></MoneyLabelBox>
            <TouchableOpacity
              onPress={() => {
                setAddEditProduct(props.Product);
              }}
              style={styles.deleteButton}>
              <Icon
                name={'edit'}
                type={ICON_SET.MT}
                color='blue'
              />

            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {

                const item = new OrderRowView(OrderRow.ID, OrderRow.HId, props.Product.ID, "", props.Product.Price1, props.Product.Discount, 0, "");
                onAddEditItem(item);
              }}
              style={styles.deleteButton}>
              <Icon
                name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                type={ICON_SET.IC}
                color='red'
              />
            </TouchableOpacity>

          </View>

        )
          :
          (
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', backgroundColor: 'transparent' }}>

              <TouchableOpacity
                onPress={() => {
                  setAddEditProduct(props.Product);
                }}
                style={styles.deleteButton}>
                <Icon
                  name={'add-shopping-cart'}
                  type={ICON_SET.MT}
                  color='green'
                />

              </TouchableOpacity>
            </View>
          )

        }
      </View>
    </View>


  );
};

const styles = StyleSheet.create({

});

export default ProductOrder;
