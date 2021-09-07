import React from 'react';
import { StyleSheet, FlatList, Modal, View, TouchableOpacity, Image } from 'react-native';
import { Text } from 'react-native-elements';
import PropTypes from "prop-types";

import DialogListItem from "../shop/DialogListItem";
import theme from '../../constants/theme';

const DialogSelectionList = props => {
  onSelectItem = (selected) => {
    props.onSelectItem(selected);
  };
  return (
    <Modal
      visible={props.displayAlert}
      transparent={true}
      animationType={"fade"}>
      <View style={styles.mainOuterComponent}>
        <View style={styles.mainContainer}>
          {/* First ROw - Alert Icon and Title */}
          <View style={styles.topPart}>
            {
              props.displayAlertIcon
              &&
              <Image
                source={require('../../assets/ic_notification.png')}
                resizeMode={'contain'}
                style={styles.alertIconStyle}
              />
            }
            <Text style={styles.alertTitleTextStyle}>
              {`${props.alertTitleText}`}
            </Text>
          </View>
          {/* Second Row - Alert Message Text */}
          <View style={styles.middlePart}>

            <FlatList


              data={props.alertDataList}
              keyExtractor={item => item.ID.toString()}
              renderItem={itemData => (
                <DialogListItem
                  Item={itemData.item}
                  //onMemberClick={() => { shopDispatch({ type: AC_SHOP_MEMBER, shop: itemData.item, newMemberStatus: 1 }) }}
                  onSelectItem={() => {
                    props.onSelectItem(itemData.item)

                  }}
                >
                </DialogListItem>
              )}
            />
          </View>
          {/* Third Row - Positive and Negative Button */}
          <View style={styles.bottomPart}>
            <TouchableOpacity
              onPress={() => {
                props.onSelectItem({ "ID": 0, "Title": "انتخاب نشد" })
              }
              }
              style={styles.closeButtonStyle} >
              <Text style={styles.closeTextStyle}>{props.closeButtonText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

DialogSelectionList.propTypes = {
  displayAlert: PropTypes.bool,
  displayAlertIcon: PropTypes.bool,
  alertTitleText: PropTypes.string,
  alertDataList: PropTypes.array,
  closeButtonText: PropTypes.string,
  onSelectItem: PropTypes.func,
}
const styles = StyleSheet.create({
  mainOuterComponent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000088'
  },
  mainContainer: {
    flexDirection: 'column',

    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.dialogBackground,
    // borderWidth: 2,
    // borderColor: '#FF0000',
    borderRadius: 10,
    padding: 4,
  },
  topPart: {
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 2,
    paddingVertical: 4
  },
  middlePart: {
    width: '95%',
    padding: 4,
    color: '#FFFFFF',
    fontSize: 16,
    marginVertical: 2
  },
  bottomPart: {
    width: '95%',
    flexDirection: 'row',
    padding: 4,
    justifyContent: 'space-evenly'
  },
  alertIconStyle: {
    height: 35,
    width: 35,
  },
  alertTitleTextStyle: {
    flex: 1,
    textAlign: 'justify',
    color: "#FFFFFF",
    fontSize: 18,
    padding: 2,
    marginHorizontal: 2
  },
  alertMessageTextStyle: {
    color: '#FFFFFF',
    textAlign: 'justify',
    fontSize: 16,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  closeButtonStyle: {
    width: '30%',
    height: 35,
    paddingHorizontal: 6,
    marginVertical: 4,
    borderRadius: 10,
    backgroundColor: theme.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeTextStyle: {
    fontSize: 14,
    fontFamily: 'Benyamin',
    color: '#FFFFFF'
  },

});

export default DialogSelectionList;
