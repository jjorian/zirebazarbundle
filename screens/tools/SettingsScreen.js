import React, { useContext, useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  StyleSheet

} from 'react-native';
import {
  Text,
  Input,
  ListItem,
  Image,
  Header,
  Icon
} from 'react-native-elements';
import Card from '../../components/UI/Card';

import theme from '../../constants/theme';


const SettingsScreen = props => {

  return (
    <View style={styles.screen} >
      <Header
        backgroundColor={theme.primary}
        leftComponent={<Icon name='arrow-forward-outline' type="ionicon" color='white' onPress={() => { props.navigation.goBack(); props.navigation.toggleDrawer(); }}></Icon>}
        centerComponent={{ text: 'ویرایش پروفایل', style: { color: '#fff' } }}
      // rightComponent={{ icon: 'home', color: '#fff' }}
      />
      <Text style={{ color: 'black' }}>تنظیمات</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

});

export default SettingsScreen;
