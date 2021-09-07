import React, { useEffect, useState, useCallback, useContext } from 'react';
import {
  ScrollView,
  View,
  FlatList,
  StyleSheet, ActivityIndicator
} from 'react-native';
import { Button, Text, Icon } from 'react-native-elements';
import { OrderRowView } from '../../models/order';

import CartItem from '../../components/shop/CartItem';
import { ShopContext } from "../../context/ShopContext";
import { GlobalContext } from "../../context/GlobalContext";
import { useLazyQuery, useMutation } from '@apollo/client';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { FETCH_SHOP_ORDER_HEAD, ADD_EDIT_ORDER_ROW } from '../../constants/GraphQlQuery';
import { AC_SHOP_ORDER_LIST, AC_SHOP_FILL_CARD, AC_SHOP_REMOVE_FROM_CARD, AC_SHOP_ADD_TO_CARD, AC_SHOP_SET_HEAD_ID } from '../../reducer/Actions';
import MoneyLabelBox from '../../components/UI/MoneyLabelBox';
import { sumKala, sumPurePrice, sumPrice } from "../../utils/OrderUtils";
import HeaderButton from '../../components/UI/HeaderButton';
import theme from '../../constants/theme';
import LoadingServer from '../../components/UI/LoadingServer';
import { ICON_SET } from '../../constants/enums';
import useAddEditProduct from '../../Hooks/useAddEditProduct';
const CartRowsScreen = props => {

  const [headCard, setHeadCard] = useState(null)
  const [shopId, setShopId] = useState(0)
  const { shopState, shopDispatch } = useContext(ShopContext);
  const { state } = useContext(GlobalContext);


  const [oRefetch, { loading, data, error }] = useLazyQuery(FETCH_SHOP_ORDER_HEAD,
    {
      fetchPolicy: 'no-cache',
      variables: { hid: props.route.params.headId, uid: 0, sid: 0, status: 0 },
    });


  useEffect(() => {
    if (data) {
      if (data.orderHead) {
        if (data.orderHead.OrderRows.length > 0) {
          const rows = data.orderHead.OrderRows;
          data.orderHead.OrderRows = [];
          setHeadCard(data.orderHead);
          setShopId(data.orderHead.ShopId)
          props.navigation.setOptions({ headerTitle: data.orderHead.ShopTitle });

          shopDispatch({ type: AC_SHOP_FILL_CARD, rowsCard: rows, rowsType: 'Cart' })

        }
      }
    }
  }, [data])
  useEffect(() => {
    oRefetch();
  }, [])
  return (
    <View style={styles.screen}>
      {(loading) &&
        <LoadingServer></LoadingServer>
      }
      <FlatList

        onRefresh={oRefetch}
        refreshing={loading}
        data={shopState.rowsCard.filter(x => x.HId === shopState.cartHeadId)}
        keyExtractor={item => item.ID.toString()}
        renderItem={itemData =>
          <CartItem
            Item={itemData.item}
            shopId={shopId}
            onSelect={() => {

            }}
          >
          </CartItem>
        }
      />

      <View style={{ flexDirection: 'row', padding: 3, width: '100%', borderColor: theme.primary, borderWidth: 2, borderRadius: 5, backgroundColor: theme.white, justifyContent: "space-between" }}>
        <Button
          color={theme.primary}
          title="ثبت سفارش"
          icon={<Icon
            name={Platform.OS === 'android' ? 'chevron-forward-outline' : 'chevron-forward-outline'}
            type={ICON_SET.IC}
            color='white'
          />}
          onPress={() => {

            props.navigation.navigate('OrderFinal',
              {
                head: headCard
              });
          }}
        />
        {/* <Text style={{ textAlign: 'center', textAlignVertical: 'center' }}>{sumKala()}</Text> */}
        <View>
          <MoneyLabelBox style={{ textAlign: 'center', textAlignVertical: 'center', flex: 2 }} Label="جمع کل:" Money={sumPrice(shopState.rowsCard.filter(x => x.HId === shopState.cartHeadId))}></MoneyLabelBox>
          <MoneyLabelBox style={{ textAlign: 'center', textAlignVertical: 'center', flex: 2 }} Label="پرداختی:" Money={sumPurePrice(shopState.rowsCard.filter(x => x.HId === shopState.cartHeadId))}></MoneyLabelBox>
        </View>

      </View>
    </View>
  );
};
export const screenOptions = navData => {
  return {
    headerTitle: navData.route.params.shopTitle,

    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Barcode"
          IconSet={ICON_SET.MT}
          iconName={'storefront'}
          onPress={() => {
            // navData.navigation.navigate('ScanBarcode',
            //   {
            //     barCodeType: 1
            //   });
          }}
        />
        <Item
          iconName={'list-outline'}
          onPress={() => {
            navData.navigation.navigate('CartList');

          }}
        />

      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 3,
    flexDirection: 'column',
    justifyContent: 'center',
  },

});

export default CartRowsScreen;
