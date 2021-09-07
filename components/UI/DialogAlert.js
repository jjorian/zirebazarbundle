import React from 'react';
import { StyleSheet, Modal, View, TouchableOpacity, Image } from 'react-native';
import { Text } from 'react-native-elements';
import PropTypes from "prop-types";
import theme from '../../constants/theme';


const DialogAlert = props => {

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
            <Text style={styles.alertMessageTextStyle}>
              {`${props.alertMessageText}`}
            </Text>
          </View>
          {/* Third Row - Positive and Negative Button */}
          <View style={styles.bottomPart}>
            {
              props.displayPositiveButton
              &&
              <TouchableOpacity
                onPress={() => { props.onPress(1) }}
                style={styles.alertMessageButtonStyle} >
                <Text style={styles.alertMessageButtonTextStyle}>{props.positiveButtonText}</Text>
              </TouchableOpacity>
            }
            {
              props.displayOkButton
              &&
              <TouchableOpacity
                onPress={() => { props.onPress(0) }}
                style={styles.alertMessageButtonStyle} >
                <Text style={styles.alertMessageButtonTextStyle}>{props.okButtonText}</Text>
              </TouchableOpacity>
            }
            {
              props.displayNegativeButton
              &&
              <TouchableOpacity
                onPress={() => { props.onPress(-1) }}
                style={styles.alertMessageButtonStyle}>
                <Text style={styles.alertMessageButtonTextStyle}>{props.negativeButtonText}</Text>
              </TouchableOpacity>
            }
          </View>
        </View>
      </View>
    </Modal>
  );
}

DialogAlert.propTypes = {
  displayAlert: PropTypes.bool,
  displayAlertIcon: PropTypes.bool,
  alertTitleText: PropTypes.string,
  alertMessageText: PropTypes.string,
  displayPositiveButton: PropTypes.bool,
  positiveButtonText: PropTypes.string,
  displayNegativeButton: PropTypes.bool,
  negativeButtonText: PropTypes.string,
  displayOkButton: PropTypes.bool,
  okButtonText: PropTypes.string,
  onPress: PropTypes.func,
}
const styles = StyleSheet.create({
  mainOuterComponent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000088'
  },
  mainContainer: {
    width: '80%',
    backgroundColor: theme.dialogBackground,
    // borderWidth: 1,
    // borderColor: '#FF0000',
    borderRadius: 10,
    padding: 4,
  },
  topPart: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 2,
    paddingVertical: 4
  },
  middlePart: {
    width: '100%',
    padding: 4,
    color: '#FFFFFF',
    fontSize: 16,
    marginVertical: 2
  },
  bottomPart: {
    width: '100%',
    flexDirection: 'row',
    padding: 4,
    justifyContent: 'space-evenly'
  },
  alertIconStyle: {
    // borderWidth: 1,
    // borderColor: '#cc00cc',
    height: 35,
    width: 35,
  },
  alertTitleTextStyle: {
    flex: 1,
    textAlign: 'justify',
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: 'bold',
    // borderWidth: 1,
    // borderColor: '#660066',
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
  alertMessageButtonStyle: {
    width: '30%',
    paddingHorizontal: 6,
    marginVertical: 4,
    height: 35,
    borderRadius: 10,
    backgroundColor: theme.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertMessageButtonTextStyle: {
    fontSize: 14,
    fontFamily: 'Benyamin',
    color: '#FFFFFF'
  },

});

export default DialogAlert;
