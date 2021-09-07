import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import NumberFormat from 'react-number-format';
const MoneyLabelBox = props => {
  let aa = {};
  if (props.textDecorationLine === true) {
    aa = StyleSheet.create({
      txt: {
        textDecorationLine: 'line-through'
      }
    }
    ).txt
  }
  return (
    <NumberFormat
      value={props.Money.toFixed(0)}
      displayType={'text'}
      thousandSeparator={true}
      prefix={''}
      renderText={value => <View style={[props.style, { flexDirection: 'row' }]}>
        <Text style={[props.labelStyle, { fontFamily: 'Benyamin' }]}>
          {props.Label}
        </Text>
        <Text style={[props.textStyle, aa, { fontFamily: 'Benyamin' }]} >
          {value}
        </Text>
      </View>
      } />

  );
};

export default MoneyLabelBox;