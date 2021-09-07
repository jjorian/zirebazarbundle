import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
const RibbonText = props => {
  return (
    <Text style={{
      position: 'absolute',
      right: -50,
      top: 30,
      width: 200,
      transform: [{ rotate: "-45deg" }],
      paddingHorizontal: 15,
      paddingVertical: 3,
      color: 'white',
      backgroundColor: props.backgroundColor,
      textAlign: 'center',
    }}>{props.text}</Text>)
};

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white'
  }
});

export default RibbonText;
