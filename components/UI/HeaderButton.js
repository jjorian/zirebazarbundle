
import React from 'react';
import { Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons, AntDesign, Feather, FontAwesome, FontAwesome5, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import theme from '../../constants/theme';
import { ICON_SET } from '../../constants/enums';

const CustomHeaderButton = props => {
  const getIconSet = (iconSet) => {
    switch (iconSet) {
      case ICON_SET.IC:
        return Ionicons;
      case ICON_SET.AD:
        return AntDesign;
      case ICON_SET.FD:
        return Feather;
      case ICON_SET.FA:
        return FontAwesome;
      case ICON_SET.FA5:
        return FontAwesome5;
      case ICON_SET.MT:
        return MaterialIcons;
      case ICON_SET.MTC:
        return MaterialCommunityIcons;
      default:
        return Ionicons;

    }
  }
  return (
    <HeaderButton
      {...props}
      IconComponent={getIconSet(props.IconSet)}
      iconSize={28}
      color={Platform.OS === 'android' ? 'white' : theme.primary}
    />
  );
};
export default CustomHeaderButton;
