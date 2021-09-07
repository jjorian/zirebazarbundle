import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList, Platform, ActivityIndicator, View, StyleSheet, BackHandler } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import ShopListItem from '../../components/shop/ShopListItem';
import { getShopList } from '../../Service/ShopService';
import theme from '../../constants/theme';
import { AC_SHOP_CATEGORY_ID, AC_SHOP_CLEAR_PRODUCT, AC_SHOP_LIST } from '../../reducer/Actions';
import { ShopContext } from "../../context/ShopContext";
import { GlobalContext } from "../../context/GlobalContext";
import { useQuery, useLazyQuery } from '@apollo/client';
import { ICON_SET, SCAN_BARCODE_TITLE } from '../../constants/enums';
import { FETCH_SHOPS } from '../../constants/GraphQlQuery';
import { ImageBackground } from 'react-native';
import { Icon, Text, Button } from 'react-native-elements';
import LoadingServer from '../../components/UI/LoadingServer';



const ShopListScreen = props => {
  const { state } = useContext(GlobalContext);
  const { shopState, shopDispatch } = useContext(ShopContext);
  const [isRefreshing, setIsRefreshing] = useState(false);


  const [loadItem, { loading, data, error }] = useLazyQuery(FETCH_SHOPS,
    {
      fetchPolicy: 'no-cache',
      variables: { userId: state.userId },
    });





  useEffect(() => {
    if (data) {
      shopDispatch({ type: AC_SHOP_LIST, shops: data.shopList })
    }
  }, [data])
  useEffect(useCallback(() => {

    loadItem();
  }), [])


  const selectItemHandler = (id, title) => {
    shopDispatch({ type: AC_SHOP_CLEAR_PRODUCT })

    shopDispatch({ type: AC_SHOP_CATEGORY_ID, category: null })
    props.navigation.navigate('ProductsList', {
      shopID: id,
      shopTitle: title
    });
  };
  const onShopButtonClickHandler = (id, title) => {
    props.navigation.navigate('ShopDetails', {
      shopID: id,
      shopName: "N",
      shopCode: "N",
      shopTitle: title
    });
  };

  if (state.user.ProfileScore < 25) {
    return <View style={styles.center}>

      <Text>مشخصات کاربری شما کامل نمی باشد</Text>

      <Text>با لمس دکمه {<Icon type='ionicon' name='menu' ></Icon>} از بالا وارد صفحه مشخصات کاربر شوید</Text>

    </View>
  }
  if (error) {
    return <View style={styles.center}>
      <Text>{error.message}</Text>
      <Button title='تلاش مجدد' onPress={loadItem} color={theme.primary} />
    </View>
  }
  else if (loading) {
    return <LoadingServer />
  }

  else if (!loading && shopState.shops.length === 0) {
    return <View style={styles.center}>

      <Text>شما در هیچ فروشگاهی عضو نمی باشید</Text>
      <Text>با لمس دکمه {<Icon type='ionicon' name='search' ></Icon>} از منوی بالا فروشگاه را پیدا کنید</Text>
      <Text>با لمس دکمه {<Icon type='ionicon' name='barcode' ></Icon>} بارکد فروشگاه را اسکن کنید</Text>

    </View>
  }


  return (
    <View style={styles.center}>
      <View style={{ width: '100%', height: '100%' }}>

        <FlatList
          onRefresh={loadItem}
          refreshing={isRefreshing}
          data={shopState.shops}
          keyExtractor={item => item.ID.toString()}
          renderItem={itemData => (
            <ShopListItem
              shop={itemData.item}
              //onMemberClick={() => { shopDispatch({ type: AC_SHOP_MEMBER, shop: itemData.item, newMemberStatus: 1 }) }}
              onPressProducts={() => {
                //selectItemHandler(itemData.item.ID, itemData.item.Title);
              }}
              onPressBuy={() => {
                selectItemHandler(itemData.item.ID, itemData.item.Title);
              }}

              onPressShopInfo={() => {

                onShopButtonClickHandler(itemData.item.ID, itemData.item.Title);
              }}
            >
            </ShopListItem>
          )}
        />

      </View>
    </View>
  );


}

export const screenOptions = navData => {
  return {
    title: 'فروشگاهها',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton} >
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Search"
          iconName={Platform.OS === 'android' ? 'search' : 'search'}
          onPress={() => {
            navData.navigation.navigate('ShopSearch');



          }}
        />
        <Item
          title="Barcode"
          iconName={Platform.OS === 'android' ? 'barcode' : 'barcode'}
          onPress={() => {
            navData.navigation.navigate('ScanBarcode',
              {
                barCodeType: 1
              });
          }}
        />
      </HeaderButtons>
    )
  };

};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'

  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  },
});
export default ShopListScreen;
