import React, { useEffect, useState, useCallback, useContext } from 'react';
import {
  ScrollView,
  View,
  FlatList,
  StyleSheet, ActivityIndicator
} from 'react-native';
import { Text, Divider } from 'react-native-elements';
import { OrderRowView, OrderHeadView } from '../../models/order';

import OrderDetailsItem from '../../components/shop/OrderDetailsItem';
import { ShopContext } from "../../context/ShopContext";
import { GlobalContext } from "../../context/GlobalContext";
import { useLazyQuery, useMutation } from '@apollo/client';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { FETCH_SHOP_ORDER_HEAD, ADD_EDIT_ORDER_ROW } from '../../constants/GraphQlQuery';
import { AC_SHOP_ORDER_LIST, AC_SHOP_FILL_CARD, AC_SHOP_REMOVE_FROM_CARD, AC_SHOP_ADD_TO_CARD } from '../../reducer/Actions';
import MoneyLabelBox from '../../components/UI/MoneyLabelBox';
import { sumKala, sumPurePrice, sumPrice } from "../../utils/OrderUtils";
import HeaderButton from '../../components/UI/HeaderButton';
import theme from '../../constants/theme';
import LoadingServer from '../../components/UI/LoadingServer';
import { PAY_METHOD_TITLE } from '../../constants/enums';
const OrderDetailsScreen = props => {
  const [headCard, setHeadCard] = useState(null)
  //const { shopState, shopDispatch } = useContext(ShopContext);
  const { state } = useContext(GlobalContext);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [oRefetch, { loading, data, error }] = useLazyQuery(FETCH_SHOP_ORDER_HEAD,
    {
      fetchPolicy: 'no-cache',
      variables: { hid: props.route.params.headID, uid: 0, sid: 0, status: 0 },
    });

  /*const [addEditCard] = useMutation(ADD_EDIT_ORDER_ROW,
    {
      fetchPolicy: 'no-cache',
    });
  const onAddEditItem = (id, sid, uid, hid, pid, price, discount, count, comment) => {
    const item = new OrderRowView(id, hid, pid, "", price, discount, count, comment);
    setIsLoading(true);
    addEditCard({
      variables: { sid: sid, uid: uid, addEditItem: item }
    }).then(res => {
      setIsLoading(false);

      if (res.data) {
        if (count != 0) {
          if (shopState.rowsCard.filter(x => x.HId === res.data.addEditOrderRow.HId).length === 0)
            shopDispatch({ type: AC_SHOP_ADD_TO_CARD, row: res.data.addEditOrderRow })
        }
        else {
          shopDispatch({ type: AC_SHOP_REMOVE_FROM_CARD, RID: id })

        }
      }
    })
  }*/
  useEffect(() => {
    if (data) {

      setHeadCard(data.orderHead);
    }
  }, [data])
  useEffect(() => {
    oRefetch();
  }, [])
  const list = () => {
    return headCard.OrderRows.map((element, ID) => {
      return (
        <OrderDetailsItem Item={element} key={ID} />
      );
    });
  };
  return (
    <ScrollView >
      <View style={styles.screen}>
        {loading &&
          <LoadingServer></LoadingServer>
        }
        {headCard &&

          <View style={{ flex: 1 }}>
            <Text style={styles.textTitle}>{headCard.ShopTitle}</Text>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text style={styles.labelTitle}>وضعیت</Text>
              <Divider orientation="vertical" width={2} />
              <Text style={styles.labelTitle}>سفارش دهنده</Text>
            </View>
            <Divider orientation="horizontal" width={2} />
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text style={styles.textTitle}>{headCard.StatusTitle}</Text>
              <Divider orientation="vertical" width={2} />
              <Text style={styles.textTitle}>{headCard.UserFullName}</Text>
            </View>
            <Divider orientation="horizontal" width={2} />
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text style={styles.labelTitle}> شهر و استان </Text>
              <Divider orientation="vertical" width={2} />
              <Text style={styles.labelTitle}>زمان ثبت </Text>
            </View>
            <Divider orientation="horizontal" width={2} />
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text style={styles.textTitle}>{headCard.Address.LocateTitle}</Text>
              <Divider orientation="vertical" width={2} />
              <Text style={styles.textTitle}>{headCard.CDateTime}</Text>
            </View>
            <Divider orientation="horizontal" width={2} />
            <Text style={styles.textLong}>آدرس تحویل:{headCard.Address.Details}</Text>
            <Text style={styles.textLong}>تحویل گیرنده:{headCard.Address.FullName}</Text>

            <View style={{ marginVertical: 10 }}>{list()}</View>

            {headCard.Details.length > 0 && <Text style={styles.textLong}>شرح سفارش: {headCard.Details}</Text>}
            <MoneyLabelBox Label="جمع کل سفارش: " Money={sumPrice(headCard.OrderRows)} />
            <MoneyLabelBox Label="پرداختی: " Money={sumPurePrice(headCard.OrderRows)} />
            <Text style={styles.textLong}>روش پرداخت: {PAY_METHOD_TITLE[headCard.PayMethod]}</Text>
          </View>

        }
      </View>
    </ScrollView>
  );
};
export const screenOptions = navData => {
  return {
    //headerTitle: navData.route.params.shopTitle,
    title: 'مشاهده سفارش ',

    // headerRight: () => (
    //   <HeaderButtons HeaderButtonComponent={HeaderButton}>
    //     <Item
    //       title="Barcode"
    //       IconSet={'FA'}
    //       iconName={'shopping-bag'}
    //       onPress={() => {
    //         // navData.navigation.navigate('ScanBarcode',
    //         //   {
    //         //     barCodeType: 1
    //         //   });
    //       }}
    //     />
    //     <Item
    //       iconName={'list-outline'}
    //       onPress={() => {
    //         navData.navigation.navigate('CartList');

    //       }}
    //     />

    //   </HeaderButtons>
    // )
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 3,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  textTitle: {
    fontSize: 16,
    textAlign: 'center',
    flex: 1
  },
  labelTitle: {
    fontSize: 14,
    textAlign: 'center',
    color: 'gray',
    flex: 1
  },
  textLong: {
    fontSize: 13,
    textAlign: 'left',
    color: 'black',
    flex: 1
  },

});

export default OrderDetailsScreen;
