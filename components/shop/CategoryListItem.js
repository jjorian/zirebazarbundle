import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text, Image } from 'react-native-elements';

import theme from '../../constants/theme';
import Card from '../UI/Card';
import { fetchPicture } from '../../utils/Validation';

const CategoryListItem = props => {

  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <Card style={styles.Card}>

      <View style={styles.touchable}>

        <TouchableCmp onPress={props.onSelect} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image source={fetchPicture(props.Item.Media?.URL, 'Shop')} style={styles.image}></Image>
            </View>

            <View style={styles.details}>
              <Text style={styles.title}>{props.Item.Title}</Text>
              {/* <Text style={styles.title}>{props.Item.ChieldCount}</Text>
              <Text style={styles.title}>{props.Item.ProductCount}</Text> */}
              {
                props.Item.ChieldCount > 0 &&
                <Ionicons
                  name='caret-back-outline'
                  size={23}
                  color='black'
                />
              }
            </View>
            <View style={styles.actions}>
              {props.children}
            </View>
          </View>
        </TouchableCmp>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  Card: {
    width: '42.5%',
    paddingBottom: 5,
    margin: 15
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden'

  },
  imageContainer: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 10
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    //paddingHorizontal: 20
  }
});

export default CategoryListItem;
