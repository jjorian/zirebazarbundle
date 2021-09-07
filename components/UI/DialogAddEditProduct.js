import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Modal, View, TouchableOpacity, Image } from 'react-native';
import { Text, Button, Icon } from 'react-native-elements';
import PropTypes from "prop-types";
import theme from '../../constants/theme';
import { ShopContext } from '../../context/ShopContext';
import { GlobalContext } from '../../context/GlobalContext';
import { ICON_SET } from '../../constants/enums';
import MoneyLabelBox from './MoneyLabelBox';
import useAddEditProduct from '../../Hooks/useAddEditProduct';
import { OrderRowView } from '../../models/order';


const DialogAddEditProduct = props => {
  const { shopState } = useContext(ShopContext);
  const { state } = useContext(GlobalContext);
  const [discount, setDiscount] = useState(0);
  const [isAddEditing, onAddEditItem, headIdByRow] = useAddEditProduct(props.Product.ShopId, state.userId, 1, props.type);
  const getHId = () => {
    switch (props.type) {
      case 'Cart':
        return shopState.cartHeadId;
      case 'Shop':
        return shopState.shopHeadId;
    }

  }
  const exist = shopState.rowsCard.find(x => x.PId === props.Product.ID && x.HId === getHId());
  useEffect(() => {
    if (props.Product.Discount > 0) {
      if (props.Product.Discount <= 100)
        setDiscount(props.Product.Price1 * props.Product.Discount / 100)
      else
        setDiscount(props.Product.Discount)
    }


  }, [])
  return (

    <Modal
      visible={props.Product !== null}
      transparent={true}
      animationType={"fade"}>
      <View style={styles.mainOuterComponent}>
        <View style={styles.mainContainer}>
          <View style={styles.topPart}>
            <Icon
              name={exist ? 'edit' : 'add'}
              type={ICON_SET.MT}
              size={25}
              color='white'
            />
            <Text style={styles.alertTitleTextStyle}>{(exist ? "ویرایش" : "افزودن")}</Text>
            <TouchableOpacity
              onPress={props.onPressClose}
              style={styles.deleteButton}>
              <Icon
                name={'close'}
                type={ICON_SET.MT}
                color='white'
              />
            </TouchableOpacity>
          </View>
          <View style={{ backgroundColor: 'transparent' }}>
            <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }} >{props.Product.Name}</Text>
            <MoneyLabelBox style={{ justifyContent: 'center' }} labelStyle={{ color: 'white', fontSize: 20 }} textStyle={{ color: 'white', fontSize: 20 }} textDecorationLine={discount > 0} Label='قیمت:' Money={props.Product.Price1}></MoneyLabelBox>
            {discount > 0 && <MoneyLabelBox style={{ justifyContent: 'center' }} labelStyle={{ color: 'white', fontSize: 20 }} textStyle={{ color: 'white', fontSize: 20 }} Label='پرداختی:' Money={props.Product.Price1 - discount}></MoneyLabelBox>}
            <View style={{ flexDirection: 'row' }}>
              <Button
                loading={isAddEditing}
                type={'clear'}
                icon={
                  <Icon
                    name="add-circle"
                    size={40}
                    color="white"
                  />
                }
                onPress={() => {
                  const item = new OrderRowView(exist ? exist.ID : 0, exist ? exist.HId : 0, props.Product.ID, "", props.Product.Price1, discount, exist ? exist.Count + 1 : 1, "");
                  onAddEditItem(item);
                }}
              />
              <Text style={{ color: 'white', fontSize: 22, flex: 1, textAlign: 'center', textAlignVertical: 'center' }}>{exist ? exist.Count : 0}</Text>
              <Button
                loading={isAddEditing}
                type={'clear'}
                icon={
                  <Icon
                    name="remove-circle"
                    size={40}
                    color="white"
                  />
                }
                onPress={() => {
                  if (exist) {
                    const item = new OrderRowView(exist ? exist.ID : 0, exist ? exist.HId : 0, props.Product.ID, "", props.Product.Price1, discount, exist ? exist.Count - 1 : 0, "");
                    onAddEditItem(item);
                  }
                }}
              />
            </View>
            {exist && <MoneyLabelBox style={{ justifyContent: 'center' }} labelStyle={{ color: 'white', fontSize: 20 }} textStyle={{ color: 'white', fontSize: 20 }} Label='جمع:' Money={exist.Count * (exist.Price - exist.Discount)}></MoneyLabelBox>}

          </View>

        </View>
      </View>
    </Modal>
  );
}

DialogAddEditProduct.propTypes = {
  onPressClose: PropTypes.func,
}
const styles = StyleSheet.create({
  mainOuterComponent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000088'
  },
  mainContainer: {
    width: '95%',
    backgroundColor: theme.dialogBackground,
    // borderWidth: 1,
    // borderColor: '#FF0000',
    borderRadius: 10,
    padding: 4,
  },
  topPart: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 2,
    paddingVertical: 4
  },

  bottomPart: {
    width: '100%',
    flexDirection: 'row',
    padding: 4,
    justifyContent: 'space-evenly'
  },
  alertIconStyle: {
    // borderWidth: 1,
    // borderColor: '#cc00cc',
    height: 35,
    width: 35,
  },
  alertTitleTextStyle: {
    flex: 1,
    textAlign: 'justify',
    color: "#FFFFFF",
    fontSize: 18,
    padding: 2,
    marginHorizontal: 2
  },
  alertMessageTextStyle: {
    color: '#FFFFFF',
    textAlign: 'justify',
    fontSize: 16,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  alertMessageButtonStyle: {
    width: '30%',
    paddingHorizontal: 6,
    marginVertical: 4,
    height: 35,
    borderRadius: 10,
    backgroundColor: theme.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertMessageButtonTextStyle: {
    fontSize: 14,
    fontFamily: 'Benyamin',
    color: '#FFFFFF'
  },

});

export default DialogAddEditProduct;
