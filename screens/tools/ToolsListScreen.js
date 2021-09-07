import React from 'react';
import {
  ScrollView,
  View,


  StyleSheet
} from 'react-native';
import { Text } from 'react-native-elements';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';

import theme from '../../constants/theme';


const ToolsListScreen = props => {
  return (
    <View style={styles.actions}>
      <Text>ابزارها</Text>
    </View>
  );
};

export const screenOptions = navData => {
  return {
    title: 'ابزارها',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {
            //navData.navigation.navigate('Cart');
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'

  },

});

export default ToolsListScreen;
