import React, { useEffect, useState, useContext, useCallback } from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { CheckBox, Button, Text, Input, Card } from 'react-native-elements'

import { AC_SHOP_ORDER_LIST, AC_SHOP_FILL_CARD, AC_SHOP_CLEAR_CARD, AC_GLOBAL_FETCH } from '../../reducer/Actions';

import { ShopContext } from "../../context/ShopContext";
import { GlobalContext } from "../../context/GlobalContext";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { ADD_EDIT_ORDER_HEAD } from '../../constants/GraphQlQuery';
import DialogAlert from "../../components/UI/DialogAlert";
import { useMutation } from '@apollo/client';
import { StackActions } from '@react-navigation/native';


import HeaderButton from '../../components/UI/HeaderButton';
import theme from '../../constants/theme';
import AddressBox from '../../components/UI/AddressBox';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { KeyboardAvoidingView } from 'react-native';
import { Keyboard } from 'react-native';
import { ORDER_HEAD_STATUS } from '../../constants/enums';

const OrderFinalScreen = props => {
  const [headCard, setHeadCard] = useState(props.route.params.head)
  const [error, setError] = useState('')
  const { shopState, shopDispatch } = useContext(ShopContext);
  const { state } = useContext(GlobalContext);

  const [editOrderHead] = useMutation(ADD_EDIT_ORDER_HEAD,
    {
      fetchPolicy: 'no-cache',
    });

  const onEditOrderHeadPress = (head) => {
    editOrderHead({
      variables: { addEditItem: head }
    }).then(res => {
      if (res.data.addEditOrderHead) {
        shopDispatch({ type: AC_SHOP_CLEAR_CARD, HId: headCard.ID })
        props.navigation.dispatch(StackActions.popToTop());
        props.navigation.navigate('Orders', {
          screen: 'OrdersList',
          params: {
            headId: headCard.ID,
            refreshStatus: ORDER_HEAD_STATUS['ثبت شده']
          }
        });
        shopDispatch({ type: AC_GLOBAL_FETCH, FetchCode: 101 })
      }
    })
  }
  useEffect(() => {
  }, [headCard])
  const changeAddress = (aid) => {

    setHeadCard({ ...headCard, AddressId: aid })
  }
  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView>
        <View style={styles.center}>
          <AddressBox addressID={headCard.AddressId} onSelectAddress={changeAddress}></AddressBox>
          <Card >
            <Text style={{ backgroundColor: 'white', textAlign: 'center', fontSize: 17 }}>{headCard.ShopTitle}</Text>
            <Card.Divider />

            <Card.Title>نحوه تسویه</Card.Title>
            <CheckBox
              title='نقدی/کارت'
              key={101}
              checked={headCard.PayMethod === 'cash'}
              onPress={() => setHeadCard({ ...headCard, PayMethod: 'cash' })}

            />
            <CheckBox
              title='چک'
              key={102}
              checked={headCard.PayMethod === 'check'}
              onPress={() => setHeadCard({ ...headCard, PayMethod: 'check' })}
            />
            <Card.Divider />
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
              <Input label="توضیحات" style={styles.textInput} value={headCard.Details} multiline={true}
                numberOfLines={4} onChangeText={text => setHeadCard({ ...headCard, Details: text })
                } placeholder='موراد تکمیلی برای سفارش را اینجا بنویسید' />
            </TouchableWithoutFeedback>
            <Button title='ثبت سفارش' onPress={() => {
              if (headCard.AddressId == 1) {
                setError("آدرس انتخاب نشده است");
              }
              else if (headCard.PayMethod.length === 0) {
                setError("حداقل یک روش پرداخت انتخاب کنید");
              }
              else {
                onEditOrderHeadPress({ AccCode: headCard.AccCode, AddressId: parseInt(headCard.AddressId), Details: headCard.Details, ID: headCard.ID, PayMethod: headCard.PayMethod, Status: 2 })
              }

            }}></Button>

            <DialogAlert

              displayAlert={error.length > 0}
              displayAlertIcon={true}
              alertTitleText={'توجه'}
              alertMessageText={error.toString()}
              displayOkButton={true}
              okButtonText={'بسیار خب'}
              onPress={(what) => { setError('') }}
            />


          </Card>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );

};

export const screenOptions = navData => {
  return {
    headerTitle: 'نهایی کردن سفارش',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {

            //navData.navigation.navigate('Cart');
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  center: {
    flex: 1,
    flexDirection: 'column',
  },
  textInput: {

    borderColor: "#000000",
    borderLeftColor: "#000000",
    borderBottomWidth: 1
  },

});

export default OrderFinalScreen;
