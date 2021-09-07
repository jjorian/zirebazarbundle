import React, { useContext, useEffect } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import {
  Text,
  Image,
  Button,
} from 'react-native-elements';
import { useQuery, gql, useMutation } from '@apollo/client';

import MemberStatusTitle from '../../components/shop/MemberStatusTitle';

import theme from '../../constants/theme';
import { AC_SHOP_INFO, AC_SHOP_MEMBER } from '../../reducer/Actions';
import { ShopContext } from '../../context/ShopContext';
import { GlobalContext } from '../../context/GlobalContext';
import { MEMBER_STATUS_TITLE } from '../../constants/enums';

import { FETCH_SHOP, MEMBER_TO_SHOP } from '../../constants/GraphQlQuery';
import LoadingServer from '../../components/UI/LoadingServer';
import { fetchPicture } from '../../utils/Validation';

const ShopDetailsScreen = props => {
  const { state } = useContext(GlobalContext);
  const { shopState, shopDispatch } = useContext(ShopContext);
  const shopID = props.route.params.shopID;
  const shopCode = props.route.params.shopCode;
  const shopName = props.route.params.shopName;
  const { data, error, loading, refetch } = useQuery(FETCH_SHOP,
    {
      fetchPolicy: 'no-cache',
      variables: { sid: shopID, shopCode: shopCode, shopName: shopName },
    });
  useEffect(() => {
    if (data) {
      props.navigation.setOptions({ headerTitle: data.shop.Title });
      shopDispatch({ type: AC_SHOP_INFO, shop: data.shop })
    }
  }, [data])
  const [memberToShop] = useMutation(MEMBER_TO_SHOP,
    {
      fetchPolicy: 'no-cache',
    });
  const onMemberStatusPress = () => {
    memberToShop({
      variables: { ID: 0, ShopId: shopID, UserId: state.userId, MemberStatus: (shopState.shop.MemberStatus == 3 ? 0 : 3), AccCode: "N", GroupId: 0 }
    }).then(res => {

      shopDispatch({ type: AC_SHOP_MEMBER, shop: shopState.shop, newMemberStatus: res.data.memberToShop });
    })
  }

  if (error) {
    return <View style={styles.center}>
      <Text>{error.message}</Text>
      <Button title='تلاش مجدد' onPress={refetch} color={theme.primary} />
    </View>
  }
  else if (loading) {
    return <LoadingServer />
  }
  if (shopState.shop) {
    return (
      <View>
        <ScrollView>
          <View>

            <Image source={fetchPicture(shopState.shop.Medias.length > 0 ? shopState.shop.Medias[0].URL : null, 'Shop')} style={styles.image}></Image>
            <MemberStatusTitle onClick={onMemberStatusPress} memberStatus={shopState.shop.MemberStatus} />
            <Text style={{ fontSize: 16, textAlign: 'center' }}>{shopState.shop.Logo}</Text>
            <Text style={styles.content}>دسته:  {shopState.shop.CategoryTitle}</Text>
            <Text style={styles.content}>نام فروشگاه:  {shopState.shop.Name}</Text>
            <Text style={styles.content}>تلفن:  {shopState.shop.Tel}</Text>
            <Text style={styles.content}>سایت:  {shopState.shop.Site}</Text>
            <Text style={styles.content}>آدرس:  {shopState.shop.Address}</Text>
            <Text style={styles.content}>شرح:  {shopState.shop.Description}</Text>

          </View>
          <Button title='مسیر یابی' onPress={() => { }} />
        </ScrollView>

      </View>

    );
  };
  return (
    <View>
      <Text style={styles.content}>در حال بارگذاری</Text>

    </View>

  );
}

export const screenOptions = navData => {
  return {
    headerTitle: navData.route.params.shopTitle
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  details: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 22,
    textAlign: "center",
  },
  content: {
    fontSize: 14,
    padding: 15,
    textAlign: 'justify'
  },
  ListItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10
  },
});

export default ShopDetailsScreen;
