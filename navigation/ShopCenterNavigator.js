import React, { useContext, useState } from 'react';
import { StackActions } from '@react-navigation/native';
import { Avatar, Divider, Text, Button } from 'react-native-elements';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  createDrawerNavigator, DrawerItemList
} from '@react-navigation/drawer';
// import {
//   DrawerItemList
// } from '@react-navigation/drawer';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Platform, SafeAreaView, StyleSheet, View, AsyncStorage } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
//import ProductsOverviewScreen from '../screens/product/ProductsOverviewScreen';
//import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
//import CartScreen from '../screens/order/CartScreen';
//import OrdersScreen from '../screens/order/OrdersScreen';
//import UserProductsScreen from '../screens/user/UserProductsScreen';
import ShopListScreen, { screenOptions as ShopListScreenOptions } from '../screens/shop/ShopListScreen';
import ShopDetailsScreen, { screenOptions as ShopDetailScreenOptions } from '../screens/shop/ShopDetailsScreen';
import ShopSearchScreen, { screenOptions as ShopSearchScreenOptions } from '../screens/shop/ShopSearchScreen';
import ScanBarcodeScreen, { screenOptions as ScanBarcodeScreenOptions } from '../screens/tools/ScanBarcodeScreen';
import ProductsListScreen, { screenOptions as ProductsListScreenOptions } from '../screens/product/ProductsListScreen';
import CategoryListScreen, { screenOptions as CategoryListScreenOptions } from '../screens/product/CategoryListScreen';
import ProductDetailsScreen, { screenOptions as ProductDetailsScreenOptions } from '../screens/product/ProductDetailsScreen';
import ProductSearchScreen, { screenOptions as ProductSearchScreenOptions } from '../screens/product/ProductSearchScreen';
import CartListScreen, { screenOptions as CartListScreenOptions } from '../screens/order/CartListScreen';

import CartRowsScreen, { screenOptions as CartRowsScreenOptions } from '../screens/order/CartRowsScreen';
import OrderFinalScreen, { screenOptions as OrderFinalScreenOptions } from '../screens/order/OrderFinalScreen';
import OrdersListScreen, { screenOptions as OrdersListScreenOptions } from '../screens/order/OrdersListScreen';
import OrderDetailsScreen, { screenOptions as OrderDetailsScreenOptions } from '../screens/order/OrderDetailsScreen';

import ToolsListScreen, { screenOptions as ToolsListScreenOptions } from '../screens/tools/ToolsListScreen';
import AuthScreen, { screenOptions as authScreenOptions } from '../screens/user/AuthScreen';
import ProfileScreen, { screenOptions as ProfileScreenOptions } from '../screens/user/ProfileScreen';
import AboutUsScreen from '../screens/tools/AboutUsScreen';
import theme from '../constants/theme';
import { GlobalContext } from "../context/GlobalContext";
import { ShopProvider } from '../context/ShopContext';
import { AC_USER_LOGOUT, AC_USER_RELOAD } from "../reducer/Actions";
import SettingsScreen from '../screens/tools/SettingsScreen';
import BorderButton from '../components/UI/BorderButton';
import * as ImagePicker from 'expo-image-picker';
import DialogSelectionList from "../components/UI/DialogSelectionList";
import { PICKER_IMAGE_LIST } from "../constants/GlobalConstants";
import { fetchPicture } from "../utils/Validation";
const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? theme.primary : ''
  },
  headerTitleStyle: {
    fontFamily: 'Benyamin'
  },

  headerBackTitleStyle: {
    fontFamily: 'Benyamin'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : theme.primary,


};
const ShopDrawerNavigator = createDrawerNavigator();
export const DrawerNavigator = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [showDialogImagePicker, setShowDialogImagePicker] = useState(false);

  const pickImage = async (id) => {

    if (id === 2) {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('دسترسی به کارت حافظه برای انتخاب تصویر داده نشده است');
        }
        else {
          let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
          });



          if (!result.cancelled) {

          }
          else {

          }
        }

      }

    }
    else {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          alert('دسترسی به دوربین برای انتخاب تصویر داده نشده است');
        }
        else {
          let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
          });



          if (!result.cancelled) {
          }
          else {
          }
        }

      }
    }
  };

  return (
    <ShopProvider>
      <ShopDrawerNavigator.Navigator initialRouteName="Main" drawerContent={(props) => {
        return (
          <View style={{ flex: 1, paddingTop: 30 }}>
            <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>

              <Avatar
                size='large'
                title="شما"
                rounded
                containerStyle={{ alignSelf: 'center', marginTop: 10 }}
                source={
                  fetchPicture(state.user.Medias.length > 0 ? state.user.Medias[0].URL : null, 'Profile')
                }
                onPress={async () => { setShowDialogImagePicker(true) }}
                activeOpacity={1}
              >
              </Avatar>
              <DialogSelectionList
                displayAlert={showDialogImagePicker}
                closeButtonText='بستن'
                alertTitleText='انتخاب کنید'
                alertDataList={PICKER_IMAGE_LIST}
                onSelectItem={(selected) => {
                  setShowDialogImagePicker(false);
                  if (selected.ID > 0) {
                    pickImage(selected.ID)
                  }
                }}
              >
              </DialogSelectionList>
              <Text style={{ textAlign: 'center', marginTop: 15 }}>{(state.user.ProfileScore >= 25 ? state.user.FullName : "در انتظار تکمیل مشخصات کاربر")}</Text>
              <Button
                buttonStyle={{ width: 40, height: 40, borderWidth: 0, backgroundColor: theme.primary, marginHorizontal: 7, borderRadius: 50, alignSelf: 'flex-end' }}
                icon={<Ionicons
                  name='md-refresh'
                  size={23}
                  color='white'
                />}
                onPress={() => {
                  dispatch({ type: AC_USER_RELOAD });

                }}
              />
              <Divider style={{ width: '100%', marginTop: 10, borderWidth: 0.3, marginBottom: 20 }} />
              <DrawerItemList {...props} />
              <BorderButton
                Title="ورود مجدد"
                style={{ borderWidth: 1, borderRadius: 10, width: '90%', height: 40, alignSelf: 'center' }}
                onPress={() => {

                  AsyncStorage.removeItem('userData')
                    .then(() => {
                      dispatch({ type: AC_USER_LOGOUT })
                    })
                    .catch((err) => {
                    })
                }}
              />
            </SafeAreaView>
          </View>
        );
      }} screenOptions={{ headerShown: false, drawerActiveTintColor: theme.primary }} >

        <ShopDrawerNavigator.Screen
          name="Main"
          component={MainTabs}
          options={{
            title: "صفحه اصلی",
            drawerIcon: props => (
              <Ionicons
                name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                size={23}
                color={props.color}
              />
            )
          }}
        />
        <ShopDrawerNavigator.Screen
          name="Setting"
          component={SettingsScreen}

          options={{
            title: "تنظمیات",
            drawerIcon: props => (
              <Ionicons
                name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                size={23}
                color={props.color}
              />
            )
          }}
        />
        <ShopDrawerNavigator.Screen
          name="Profile"
          component={ProfileScreen}

          options={{
            title: "مشخصات کاربر",
            drawerIcon: props => (
              <Ionicons
                name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                size={23}
                color={props.color}
              />
            )
          }}
        />
        <ShopDrawerNavigator.Screen
          name="AboutUs"
          component={AboutUsScreen}

          options={{
            title: "درباره ما",
            drawerIcon: props => (
              <Ionicons
                name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                size={23}
                color={props.color}
              />
            )
          }}
        />
      </ShopDrawerNavigator.Navigator>
    </ShopProvider>
  );
};


const MainTabNavigator = createMaterialBottomTabNavigator();
export const MainTabs = () => {

  return <MainTabNavigator.Navigator activeTintColor={theme.primary} shifting={false} labeled={true} barStyle={{ backgroundColor: theme.TabsBackground }} screenOptions={{ headerShown: false }}>

    <MainTabNavigator.Screen name="Home" component={ShopNavigator} options={{
      tabBarLabel: 'بازار', tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="ios-home" size={25} color={tabInfo.color} />
        );
      },
    }} />
    <MainTabNavigator.Screen name="Cart" component={CartNavigator} options={{
      tabBarLabel: 'سبد خرید', tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="ios-cart" size={25} color={tabInfo.color} />
        );
      },
    }} />
    <MainTabNavigator.Screen name="Orders" component={OrdersNavigator} options={{
      tabBarLabel: 'سفارشات', tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="ios-list" size={25} color={tabInfo.color} />
        );
      },
    }} />
    <MainTabNavigator.Screen name="Tools" component={ToolsNavigator} options={{
      tabBarLabel: 'ابزار', tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="hammer" size={25} color={tabInfo.color} />
        );
      },
    }} />
  </MainTabNavigator.Navigator>
};

////////////////////////////////ShopStackNavigator////////////////////////////////////
const ShopStackNavigator = createNativeStackNavigator();
export const ShopNavigator = () => {
  return (<ShopStackNavigator.Navigator screenOptions={defaultNavOptions} initialRouteName="ShopList">
    <ShopStackNavigator.Screen name="ShopList" component={ShopListScreen}
      options={ShopListScreenOptions}
    />
    <ShopStackNavigator.Screen name="ShopDetails" component={ShopDetailsScreen}
      options={ShopDetailScreenOptions}
    />
    <ShopStackNavigator.Screen name="ShopSearch" component={ShopSearchScreen}
      options={ShopSearchScreenOptions}
    />
    <ShopStackNavigator.Screen name="ScanBarcode" component={ScanBarcodeScreen}
      options={ScanBarcodeScreenOptions}
    />
    <ShopStackNavigator.Screen name="ProductsList" component={ProductsListScreen} options={ProductsListScreenOptions}
    />
    <ShopStackNavigator.Screen name="CategoryList" component={CategoryListScreen} options={CategoryListScreenOptions}
    />
    <ShopStackNavigator.Screen name="ProductSearch" component={ProductSearchScreen}
      options={ProductSearchScreenOptions}
    />
    <ShopStackNavigator.Screen name="ProductDetails" component={ProductDetailsScreen} options={ProductDetailsScreenOptions}
    />
    {/* <ShopStackNavigator.Screen name="CartRows" component={CartRowsScreen} options={CartRowsScreenOptions}
    />
    <ShopStackNavigator.Screen name="OrderFinal" component={OrderFinalScreen} options={OrderFinalScreenOptions}
    /> */}

  </ShopStackNavigator.Navigator>)
};

//////////////////////////////ProductStackNavigator////////////////////////////////////
// const ProductStackNavigator = createStackNavigator();
// export const ProductNavigator = () => {
//   return (
//     <ProductStackNavigator.Navigator screenOptions={defaultNavOptions}>
//       <ProductStackNavigator.Screen name="ProductsList" component={ProductsListScreen}
//         options={ProductsListScreenOptions}
//       />
//       <ProductStackNavigator.Screen name="ProductSearch" component={ProductSearchScreen}
//         options={ProductSearchScreenOptions}
//       />
//       <ProductStackNavigator.Screen name="ProductDetails" component={ProductDetailsScreen} options={ProductDetailsScreenOptions}
//       />
//       <ProductStackNavigator.Screen name="CategoryList" component={CategoryListScreen} options={CategoryListScreenOptions}
//       />
//     </ProductStackNavigator.Navigator>
//   );
// };

////////////////////////////////OrdersStackNavigator////////////////////////////////////
const OrdersStackNavigator = createNativeStackNavigator();
export const OrdersNavigator = () => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <OrdersStackNavigator.Screen name="OrdersList" component={OrdersListScreen} options={OrdersListScreenOptions} />
      <OrdersStackNavigator.Screen name="OrderDetails" component={OrderDetailsScreen} options={OrderDetailsScreenOptions} />
    </OrdersStackNavigator.Navigator>
  );
};

////////////////////////////////CartsStackNavigator////////////////////////////////////
const CartsStackNavigator = createNativeStackNavigator();
export const CartNavigator = () => {
  return (
    <CartsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <CartsStackNavigator.Screen name="CartList" component={CartListScreen}
        options={CartListScreenOptions}
      />
      <CartsStackNavigator.Screen name="CartRows" component={CartRowsScreen} options={CartRowsScreenOptions}
      />
      <CartsStackNavigator.Screen name="OrderFinal" component={OrderFinalScreen} options={OrderFinalScreenOptions}
      />
      <CartsStackNavigator.Screen name="ProductDetails" component={ProductDetailsScreen} options={ProductDetailsScreenOptions}
      />
    </CartsStackNavigator.Navigator>
  );
};

////////////////////////////////CartsStackNavigator////////////////////////////////////
const ToolsStackNavigator = createNativeStackNavigator();
export const ToolsNavigator = () => {
  return (
    <ToolsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ToolsStackNavigator.Screen name="ToolsList" component={ToolsListScreen}
        options={ToolsListScreenOptions}
      />
    </ToolsStackNavigator.Navigator>
  );
};

////////////////////////////////AuthStackNavigator////////////////////////////////////
const AuthStackNavigator = createNativeStackNavigator();
export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <AuthStackNavigator.Screen
        name="Auth"
        component={AuthScreen}
        options={authScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};
const styles = StyleSheet.create({
  row: {
    height: 48,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  },
});
