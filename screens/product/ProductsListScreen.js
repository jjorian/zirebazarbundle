import React, { useEffect, useState, useLayoutEffect, useContext, useRef } from 'react';
import { FlatList, Platform, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Icon, Text } from 'react-native-elements';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import MoneyLabelBox from '../../components/UI/MoneyLabelBox';
import ProductItem from '../../components/shop/ProductItem';
import theme from '../../constants/theme';
import { OrderRowView } from '../../models/order';
import { ShopContext } from "../../context/ShopContext";
import { GlobalContext } from "../../context/GlobalContext";
import { useQuery, gql, useMutation, useLazyQuery } from '@apollo/client';
import { AC_SHOP_ADD_TO_CARD, AC_SHOP_PRODUCTS, AC_SHOP_REMOVE_FROM_CARD, AC_SHOP_FILL_CARD, AC_SHOP_CATEGORY_ID, AC_SHOP_SET_HEAD_ID } from '../../reducer/Actions';
import { FETCH_SHOP_PRODUCTS, FETCH_SHOP_ORDER_HEAD, ADD_EDIT_ORDER_ROW } from '../../constants/GraphQlQuery';
import { log } from 'react-native-reanimated';
import { sumKala, sumPurePrice, sumPrice } from "../../utils/OrderUtils";
import LoadingServer from '../../components/UI/LoadingServer';
import { ICON_SET, KeyType } from '../../constants/enums';
import { Card } from 'react-native-elements/dist/card/Card';
import { ActivityIndicator } from 'react-native-paper';
import { Input } from 'react-native-elements/dist/input/Input';
import useAddEditProduct from '../../Hooks/useAddEditProduct';
import DialogAddEditProduct from '../../components/UI/DialogAddEditProduct';

const ProductsListScreen = props => {
  const PAGE_SIZE = 20;

  const shopID = props.route.params.shopID;
  const shopTitle = props.route.params.shopTitle;
  const { shopState, shopDispatch } = useContext(ShopContext);
  const { state } = useContext(GlobalContext);
  const [offset, setOffset] = useState(0);
  const [listProducts, setListProducts] = useState(null);
  let myList = useRef();
  const [loadingMore, setLoadingMore] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [loadItem, { data: dataProducts, error: pError, loading: pLoading }] = useLazyQuery(FETCH_SHOP_PRODUCTS,
    {
      fetchPolicy: 'no-cache',
      variables: { sid: shopID, catId: shopState.category ? shopState.category.ID : 0, query: "N", pageSize: PAGE_SIZE, offset: offset },
    });

  const { data: oData, error: oError, loading: oLoading, refetch: oRefetch } = useQuery(FETCH_SHOP_ORDER_HEAD,
    {
      fetchPolicy: 'no-cache',
      variables: { hid: 0, uid: state.userId, sid: shopID, status: 1 },
    });

  useEffect(() => {
    if (dataProducts) {
      if (offset == 0) {
        setListProducts(dataProducts.productList)

      }
      else {
        if (dataProducts.productList.length === 0) {
          // if no new items were fetched, set all loaded to true to prevent further requests
          setAllLoaded(true);
        } else {
          setListProducts(listProducts.concat(dataProducts.productList));
        }

        // load more complete, set loading more to false
        setLoadingMore(false);
        //shopDispatch({ type: AC_SHOP_PRODUCTS, products: dataProducts.productList })
      }
    }

  }, [dataProducts]);

  useEffect(() => {
    loadItem();
  }, []);
  useEffect(() => {
    setOffset(0);
    loadItem();
  }, [shopState.category])
  useEffect(() => {
    if (oData) {

      if (oData.orderHead) {
        const rows = oData.orderHead.OrderRows;
        oData.orderHead.orderRows = [];
        shopDispatch({ type: AC_SHOP_FILL_CARD, rowsCard: rows, rowsType: 'Shop' })
      }
    }
  }, [oData])



  const loadMoreResults = info => {

    // if already loading more, or all loaded, return
    if (loadingMore || allLoaded)
      return

    // set loading more (also updates footer text)
    setLoadingMore(true);

    // get next results
    setOffset(listProducts?.length)

    loadItem();




  }

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Search"
            iconName={Platform.OS === 'android' ? 'search' : 'search'}
            onPress={() => {
              props.navigation.navigate('ProductSearch', {
                shopID: props.route.params.shopID,
                shopTitle: props.route.params.shopTitle
              });

            }}
          />
          <Item
            title="Category"
            iconName={Platform.OS === 'android' ? 'apps' : 'apps'}
            onPress={() => {

              if (shopState.category == null) {
                props.navigation.navigate('CategoryList', {
                  group: KeyType.KeyTypeProduct,
                  shopID: props.route.params.shopID,
                  shopTitle: props.route.params.shopTitle,
                });
              }
              else {
                shopDispatch({ type: AC_SHOP_CATEGORY_ID, category: null })

              }
            }}
          />

          <Item
            title="Barcode"
            iconName={Platform.OS === 'android' ? 'barcode' : 'barcode'}
            onPress={() => {
              props.navigation.navigate('ScanBarcode',
                {
                  barCodeType: 2
                });
              // props.navigation.navigate('ScanBarcode', {
              //   onGoBack: (data) => {

              //   }
              // });
            }}
          />
        </HeaderButtons>
      )
    });
  }, [props.navigation, shopState.category]);

  const renderFooter = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null
    if (!loadingMore) return null;
    return (
      <ActivityIndicator
        style={{ color: '#000' }}
      />
    );
  };
  const renderHeader = () => {
    //it will show indicator at the bottom of the list when data is loading otherwise it returns null

    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Input placeholder={'جستجو'}></Input>
      </View>
    );
  };
  if (pError) {
    return <View style={styles.center}>
      <Text>{pError.message}</Text>
      <Button title='تلاش مجدد' onPress={loadItem} color={theme.primary} />
    </View>
  }

  else if (!pLoading && listProducts?.length === 0) {
    return <View style={styles.center}>
      <Text>هیچ کالایی پیدا نشد</Text>
      <View style={{ justifyContent: 'space-between', marginVertical: 10, height: 130 }}>
        <Button title='تلاش مجدد' onPress={loadItem} color={theme.primary} />
      </View>

    </View>
  }
  // else if (pLoading) {
  //   return <LoadingServer />
  // }
  return (

    <View style={{ flex: 1, padding: 3, height: '100%', width: '100%' }}>
      {(pLoading || oLoading) && <ActivityIndicator
        style={{ color: '#000' }}
      />}

      <FlatList
        onRefresh={() => { setOffset(0); loadItem() }}
        data={listProducts}
        extraData={false}
        keyExtractor={item => item.ID.toString()}
        refreshing={false}
        ref={myList}
        // ListHeaderComponent={renderHeader}
        // stickyHeaderIndices={[0]}
        ListFooterComponent={renderFooter}
        onEndReached={info => {
          loadMoreResults(info);
        }}
        onEndReachedThreshold={0.4}
        renderItem={itemData => {
          return (
            <ProductItem
              Item={itemData.item}
              onSelect={() => {
                props.navigation.navigate('ProductDetails', {
                  productID: itemData.item.ID,
                  productName: itemData.item.Name,
                });
              }}
            >
            </ProductItem>)
        }
        }
      />
      {
        sumKala(shopState.rowsCard.filter(x => x.HId === shopState.shopHeadId)) > 0 &&
        (<View style={{ flexDirection: 'row', padding: 3, width: '100%', borderColor: theme.primary, borderWidth: 2, borderRadius: 5, backgroundColor: theme.white, justifyContent: "space-between" }}>
          <Button
            color={theme.primary}
            title="سبد خرید"
            icon={<Icon
              name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              type='ionicon'
              color='white'
            />}
            onPress={() => {
              props.navigation.navigate('Cart', {
                screen: 'CartRows',
                params: {
                  headId: shopState.shopHeadId,
                  shopTitle: shopTitle,
                  shopId: shopID

                }
              });
            }}
          />
          {/* <Text style={{ textAlign: 'center', textAlignVertical: 'center' }}>{sumKala()}</Text> */}
          <View>
            <MoneyLabelBox style={{ textAlign: 'center', textAlignVertical: 'center', flex: 2 }} Label="جمع کل:" Money={sumPrice(shopState.rowsCard.filter(x => x.HId === shopState.shopHeadId))}></MoneyLabelBox>
            <MoneyLabelBox style={{ textAlign: 'center', textAlignVertical: 'center', flex: 2 }} Label="پرداختی:" Money={sumPurePrice(shopState.rowsCard.filter(x => x.HId === shopState.shopHeadId))}></MoneyLabelBox>
          </View>

        </View>)
      }
    </View>

  );

};
export const screenOptions = navData => {
  return {
    headerTitle: navData.route.params.shopTitle,

  };
};
const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default ProductsListScreen;
