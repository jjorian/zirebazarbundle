import React, { useEffect, useState, useContext, useCallback, useLayoutEffect } from 'react';
import { FlatList, Platform, ActivityIndicator, View, StyleSheet, BackHandler } from 'react-native';
import { ButtonGroup, Text, Icon } from 'react-native-elements';
import { AC_SHOP_ORDER_LIST } from '../../reducer/Actions';
import OrderListItem from '../../components/shop/OrderListItem';
import { ShopContext } from "../../context/ShopContext";
import { GlobalContext } from "../../context/GlobalContext";
import { ICON_SET, ORDER_HEAD_STATUS, ORDER_HEAD_STATUS_GROUP } from "../../constants/enums";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { FETCH_SHOP_ORDER_HEAD_LIST } from '../../constants/GraphQlQuery';
import { useLazyQuery } from '@apollo/client';
import { useFocusEffect } from '@react-navigation/native';
import HeaderButton from '../../components/UI/HeaderButton';
import theme from '../../constants/theme';
import LoadingServer from '../../components/UI/LoadingServer';


const OrdersListScreen = props => {

  const { state } = useContext(GlobalContext);
  const { shopState, shopDispatch } = useContext(ShopContext);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [index, setIndex] = useState(0);
  const [orders, setOrders] = useState([]);

  const [status, setStatus] = useState(ORDER_HEAD_STATUS['ثبت شده']);


  const [loadItem, { loading, data, error }] = useLazyQuery(FETCH_SHOP_ORDER_HEAD_LIST,
    {
      fetchPolicy: 'no-cache',
      variables: { uid: state.userId, sid: 0, type: 0, status: status },
    });
  useEffect(() => {
    if (data) {
      setOrders(data.orderHeadList)
      //shopDispatch({ type: AC_SHOP_ORDER_LIST, headOrderList: data.orderHeadList })
    }
  }, [data])


  useEffect(() => {
    if (index === 0) {
      setStatus(ORDER_HEAD_STATUS['ثبت شده'])
    }
    else if (index === 1) {
      setStatus(ORDER_HEAD_STATUS['در حال پردازش'])
    }
    else if (index === 2) {
      setStatus(ORDER_HEAD_STATUS['ارسال شده'])
    }
    else if (index === 3) {
      setStatus(ORDER_HEAD_STATUS['تعلیق شده'])
    }
    setOrders([]);
    loadItem();
  }, [index])


  useFocusEffect(
    React.useCallback(() => {
      if (props.route.params === "undefined") {
      }
    }, [])
  );
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Cart"
            iconName={'refresh'}
            onPress={loadItem}
          />
        </HeaderButtons>
      ),
    });
  }, [props.navigation]);
  const buttons = ['ثبت شده', 'در حال پردازش', 'ارسال شده', 'معلق',]
  return (
    <View style={styles.center}>
      <ButtonGroup
        onPress={(i) => { setIndex(i) }}
        selectedIndex={index}
        buttons={buttons}
        containerStyle={{ height: 45 }} />
      {loading &&
        <LoadingServer></LoadingServer>}

      {
        (!loading && orders.length === 0) ?
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ alignItems: 'center' }}>
              <Text>هیچ سفارشی در این وضعیت پیدا نشد </Text>
              <Text>{<Icon type={ICON_SET.IC} name="refresh" ></Icon>}</Text>
            </View>
          </View>
          :
          <FlatList
            onRefresh={loadItem}
            refreshing={isRefreshing}
            data={orders}
            keyExtractor={item => item.ID.toString()}
            renderItem={itemData => {
              return (
                <OrderListItem
                  Item={itemData.item}
                  onClick={() => {
                    props.navigation.navigate('OrderDetails',
                      {
                        headID: itemData.item.ID,
                      });
                  }}
                >
                </OrderListItem>)
            }
            }
          />
      }

    </View>
  );

};
export const screenOptions = navData => {
  const loadItem = navData.route.params ? navData.route.params.refresh : null;
  return {
    title: 'سفارشات',

  };
};
const styles = StyleSheet.create({
  center: {
    flex: 1,
    flexDirection: 'column',

  }

});
export default OrdersListScreen;
