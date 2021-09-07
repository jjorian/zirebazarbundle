// typography.js

import React from 'react'
import { StyleSheet } from 'react-native'
import { Text } from 'react-native-elements';
import theme from '../constants/theme'

export const TypoGraphy = () => {
  const oldTextRender = Text.render
  Text.render = function (...args) {
    const origin = oldTextRender.call(this, ...args)
    return React.cloneElement(origin, {
      style: [styles.defaultText, origin.props.style],
    })
  }
}

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: theme.defaultFontFamily,//Default font family
  }
});