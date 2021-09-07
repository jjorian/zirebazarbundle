import React, { useEffect, useState, useContext, useCallback, useLayoutEffect } from 'react';
import { FlatList, Platform, ActivityIndicator, View, StyleSheet, BackHandler } from 'react-native';
import { Icon, Text, Tab, Button } from 'react-native-elements';



import { AC_SHOP_CARD_LIST } from '../../reducer/Actions';
import LoadingServer from "../../components/UI/LoadingServer";

import CartListItem from '../../components/shop/CartListItem';
import { ShopContext } from "../../context/ShopContext";
import { GlobalContext } from "../../context/GlobalContext";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { FETCH_SHOP_ORDER_HEAD_LIST } from '../../constants/GraphQlQuery';
import { useLazyQuery } from '@apollo/client';


import HeaderButton from '../../components/UI/HeaderButton';
import theme from '../../constants/theme';


const CartListScreen = props => {


  const { state } = useContext(GlobalContext);
  const { shopState, shopDispatch } = useContext(ShopContext);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [headId, setHeadId] = useState(0);
  const [loadItem, { loading, data, error }] = useLazyQuery(FETCH_SHOP_ORDER_HEAD_LIST,
    {
      fetchPolicy: 'no-cache',
      variables: { uid: state.userId, sid: 0, type: 0, status: 1 },
    });
  useEffect(() => {
    if (data) {
      shopDispatch({ type: AC_SHOP_CARD_LIST, headCardList: data.orderHeadList })
    }
  }, [data])
  useEffect(useCallback(() => {
    loadItem();
  }), [])

  const NavigateToCartRows = (HId, ShopTitle) => {
    props.navigation.navigate('CartRows',
      {
        shopTitle: ShopTitle,
        headId: HId,
      });
  }
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


  if (loading) {
    return <LoadingServer></LoadingServer>
  }
  return <View style={styles.center}>
    {(shopState.headCardList.length === 0) ?
      <View style={styles.center}>
        <View style={{ alignItems: 'center' }}>
          <Text>شما هیچ سبد خریدی  {<Icon type='ionicon' name='cart' ></Icon>} ندارید </Text>
          <Text>به صفحه بازار {<Icon type='ionicon' name='home' ></Icon>} بروید</Text>
        </View>
      </View>
      :
      <FlatList
        onRefresh={loadItem}
        refreshing={isRefreshing}
        data={shopState.headCardList}
        keyExtractor={item => item.ID.toString()}
        renderItem={itemData => {
          return (
            <CartListItem
              Item={itemData.item}
              onClick={() => {
                NavigateToCartRows(itemData.item.ID, itemData.item.ShopTitle);

              }}
            >
            </CartListItem>)
        }
        }
      />
    }
  </View>

}
export const screenOptions = navData => {
  const loadItem = navData.route.params ? navData.route.params.refresh : null;
  const routeParams = navData.route.params ? navData.route.params : {};
  return {
    headerTitle: 'سبد های خرید',

  };
};
const styles = StyleSheet.create({
  center: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  }

});

export default CartListScreen;
