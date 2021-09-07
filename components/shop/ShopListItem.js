import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from 'react-native';
import { Text, Image } from 'react-native-elements';
import Card from '../UI/Card';
import RibbonText from '../UI/RibbonText';
import { MEMBER_STATUS_TITLE } from "../../constants/enums";
import BorderButton from "../UI/BorderButton";
import { fetchPicture } from '../../utils/Validation';

const ShopListItem = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <Card style={styles.product}>

      <View style={styles.touchable}>

        <TouchableCmp onPress={props.onPressProducts} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image source={fetchPicture(props.shop.Media?.URL, 'Shop')} style={styles.image}></Image>

              {/* {props.shop.Media ?
                <Image style={styles.image} source={{ uri: props.shop.Media?.URL }} /> : ""} */}
              <RibbonText backgroundColor='#00000099'
                text={MEMBER_STATUS_TITLE[props.shop.MemberStatus]}
              >
              </RibbonText>
            </View>

            <View style={styles.details}>
              <Text style={styles.title}>{props.shop.Title}</Text>
              <Text style={styles.title}>{props.shop.CategoryTitle}</Text>
              <Text style={styles.title}>{props.shop.LocateTitle}</Text>


            </View>
            <View style={styles.actions}>
              {props.children}
            </View>
          </View>
        </TouchableCmp>

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', padding: 3 }}>
          <BorderButton
            Title={props.shop.CartsCount === 0 ? "شروع خرید" : "ادامه خرید"}
            style={{ borderWidth: 1, borderRadius: 10, width: '45%', height: 40, alignSelf: 'center' }}
            onPress={props.onPressBuy}
          />
          <BorderButton
            Title="مشخصات"
            style={{ borderWidth: 1, borderRadius: 10, width: '45%', height: 40, alignSelf: 'center' }}
            onPress={props.onPressShopInfo}
          />
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    paddingBottom: 5,
    margin: 15
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden'

  },
  imageContainer: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  details: {
    alignItems: 'center',
  },
  title: {
    fontSize: 14,
  },
  price: {
    fontSize: 14,
    color: '#888'
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    //paddingHorizontal: 20
  }
});

export default ShopListItem;
