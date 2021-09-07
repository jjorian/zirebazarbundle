import React, { useEffect, useState, useCallback, useContext } from 'react';
import { FlatList, Platform, View, StyleSheet, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import { Button, Text } from 'react-native-elements';
import theme from '../../constants/theme';
import { CategoryView } from "../../models/category";
import { GlobalContext } from "../../context/GlobalContext";
import { useQuery } from '@apollo/client';
import { FETCH_SHOP_CATEGORY } from '../../constants/GraphQlQuery';
import LoadingServer from '../../components/UI/LoadingServer';
import CategoryListItem from '../../components/shop/CategoryListItem';
import { ShopContext } from '../../context/ShopContext';
import { AC_SHOP_CATEGORY_ID } from '../../reducer/Actions';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { ICON_SET } from '../../constants/enums';
const CategoryListScreen = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  const shopID = props.route.params.shopID;
  const shopTitle = props.route.params.shopTitle;
  const group = props.route.params.group;
  const [categoryList, setCategoryList] = useState([]);
  const { state } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);
  const [current, setCurrent] = useState(new CategoryView(1, 101, "Main", 1, 1, shopID, 1, 1, 0, "", []));
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [route, setRoute] = useState(new Array());
  const { shopState, shopDispatch } = useContext(ShopContext);

  const { data, error, loading, refetch } = useQuery(FETCH_SHOP_CATEGORY,
    {
      fetchPolicy: 'no-cache',
      variables: { group: group, parent: current.ID, query: "N", sid: shopID },
    });

  useEffect(() => {

    if (data) {
      setCategoryList(data.categoryList);
    }
  }, [data])


  const loadItem = () => {
    refetch()
  };



  const selectItemHandler = (id, title) => {
    props.navigation.navigate('ProductDetail', {
      ID: id,
      Title: title
    });
  };
  if (error) {
    return <View style={styles.center}>
      <Text>{error.message}</Text>
      <Button title='تلاش مجدد' onPress={loadItem()} color={theme.primary} />
    </View>
  }
  else if (loading) {
    return <LoadingServer />
  }

  else if (!loading && categoryList.length === 0) {
    return <View style={styles.center}>
      <Text>هیچ دسته ای پیدا نشد</Text>
      <View style={{ justifyContent: 'space-between', marginVertical: 10, height: 130 }}>
        <Button title='تلاش مجدد' onPress={loadItem()} color={theme.primary} />
      </View>

    </View>
  }

  return (

    <View style={{ flex: 1, padding: 3, height: '100%', width: '100%' }}>
      {isLoading &&
        <LoadingServer />

      }
      {
        current.ID > 1 &&

        <View style={{ flexDirection: 'row' }}>
          <TouchableCmp useForeground onPress={() => { setCurrent({ ...current, ID: current.ParentId }); route.pop() }} >
            <Icon type={ICON_SET.IC} name="arrow-forward-outline" color='black'></Icon>

          </TouchableCmp>
          <Text style={{ flex: 1, alignItems: 'flex-start', textAlignVertical: 'center' }}>{route.toString()}</Text>

        </View>

      }
      <FlatList
        onRefresh={loadItem()}
        refreshing={isRefreshing}
        data={categoryList}
        extraData={true}
        horizontal={false}
        numColumns={2}
        keyExtractor={item => item.ID.toString()}
        renderItem={itemData => {
          return (
            <CategoryListItem
              Item={itemData.item}
              onSelect={() => {
                if (itemData.item.ChieldCount > 0) {
                  setCurrent(itemData.item);
                  route.push(itemData.item.Title);
                  loadItem();
                }
                else if (itemData.item.ProductCount > 0) {
                  shopDispatch({ type: AC_SHOP_CATEGORY_ID, category: itemData.item })

                  //props.route.params.onGoBack(itemData.item);
                  props.navigation.goBack();
                }
                // props.navigation.navigate('ProductDetails', {
                //   productID: itemData.item.ID,
                //   productName: itemData.item.Name
                // });
              }}
            >



            </CategoryListItem>)
        }
        }
      />
    </View>

  );

};
export const screenOptions = navData => {
  return {
    headerTitle: navData.route.params.shopTitle,
    // headerRight: () => (
    //   <HeaderButtons HeaderButtonComponent={HeaderButton}>
    //     <Item
    //       title="Search"
    //       iconName={Platform.OS === 'android' ? 'search' : 'search'}
    //       onPress={() => {
    //         //navData.navigation.navigate('ProductSearch');
    //         navData.navigation.navigate('ProductSearch', {
    //           shopID: navData.route.params.shopID,
    //           shopTitle: navData.route.params.shopTitle
    //         });
    //       }}
    //     />
    //     <Item
    //       title="Barcode"
    //       iconName={Platform.OS === 'android' ? 'barcode' : 'barcode'}
    //       onPress={() => {
    //         navData.navigation.navigate('ScanBarcode',
    //           {
    //             barCodeType: 2
    //           });
    //         // navData.navigation.navigate('ScanBarcode', {
    //         //   onGoBack: (data) => {

    //         //   }
    //         // });
    //       }}
    //     />
    //   </HeaderButtons>
    // )
  };
};
const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default CategoryListScreen;
