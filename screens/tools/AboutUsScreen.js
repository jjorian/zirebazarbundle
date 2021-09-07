import React from 'react';
import {

  View,
  StyleSheet

} from 'react-native';
import {
  Text,

  Header,
  Icon
} from 'react-native-elements';

import theme from '../../constants/theme';


const AboutUsScreen = props => {
  const OpenWEB = (url) => {
    Linking.openURL(url);
  };
  return (
    <View style={styles.screen} >
      <Header
        backgroundColor={theme.primary}
        leftComponent={<Icon name='arrow-forward-outline' type="ionicon" color='white' onPress={() => { props.navigation.goBack(); props.navigation.toggleDrawer(); }}></Icon>}
        centerComponent={{ text: 'درباره ما', style: { color: '#fff' } }}
      // rightComponent={{ icon: 'home', color: '#fff' }}
      />
      <Text onPress={() => OpenWEB("http://jjorian.ir/")} style={{ color: 'black' }}>درباره ما</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

});

export default AboutUsScreen;
