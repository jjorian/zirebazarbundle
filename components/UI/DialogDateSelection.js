import React from 'react';
import { StyleSheet, FlatList, Modal, View, TouchableOpacity, Image } from 'react-native';
import { Text } from 'react-native-elements';
import PropTypes from "prop-types";

import DatePicker from '@mohamadkh75/react-native-jalali-datepicker';
import theme from '../../constants/theme';

const DialogDateSelection = props => {

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

            <DatePicker
              style={{
                width: '100%',
                height: 370,
                alignSelf: 'center',
                backgroundColor: '#1e272e',
                borderWidth: 1,
                borderColor: '#4bcffa',
                borderRadius: 10,
                elevation: 4
              }}
              selected='1399/1/18'
              dateSeparator='/'
              minDate='1358/1/1'
              maxDate='1410/1/1'
              headerContainerStyle={{ height: '15%' }}
              yearMonthBoxStyle={{
                width: '30%',
                height: '75%',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 1,
                borderRadius: 10
              }}
              yearMonthTextStyle={{ fontSize: 22, color: '#4bcffa' }}
              iconContainerStyle={{ width: `${100 / 7}%` }}
              backIconStyle={{
                width: 20,
                height: 20,
                resizeMode: 'center',
                tintColor: '#808e9b'
              }}
              nextIconStyle={{
                width: 20,
                height: 20,
                resizeMode: 'center',
                tintColor: '#4bcffa'
              }}
              eachYearStyle={{
                width: '30%',
                height: 82,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#4bcffa',
                marginTop: '1.5%',
                marginBottom: 5,
                marginHorizontal: '1.5%',
                borderRadius: 10,
                elevation: 3
              }}
              eachYearTextStyle={{
                fontSize: 16,
                color: 'white'
              }}
              eachMonthStyle={{
                width: `${88 / 3}%`,
                height: `${88 / 4}%`,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#4bcffa',
                marginBottom: '3%',
                borderRadius: 10,
                elevation: 3
              }}
              eachMonthTextStyle={{ fontSize: 16, color: 'white' }}
              weekdaysContainerStyle={{ height: '10%' }}
              weekdayStyle={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}
              weekdayTextStyle={{
                fontSize: 16,
                color: '#808e9b',
                marginBottom: 5
              }}
              borderColor='#4bcffa'
              dayStyle={{
                width: `${100 / 7}%`,
                justifyContent: 'center',
                alignItems: 'center',
                aspectRatio: 1 / 1
              }}
              selectedDayStyle={{
                width: '70%',
                aspectRatio: 1 / 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 100
              }}
              selectedDayColor='#4bcffa'
              dayTextStyle={{ fontSize: 18 }}
              selectedDayTextColor='white'
              dayTextColor='#4bcffa'
              disabledTextColor='#4bcffa66'
              onDateChange={date => props.onSelectItem(date)}
            />
          </View>
          {/* Third Row - Positive and Negative Button */}
          <View style={styles.bottomPart}>
            <TouchableOpacity
              onPress={() => {
                props.onSelectItem("N")
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

DialogDateSelection.propTypes = {
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
    width: '80%',
    backgroundColor: theme.dialogBackground,
    borderRadius: 10,
    padding: 4,
  },
  topPart: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  middlePart: {
    width: '100%',

    marginVertical: 2
  },
  bottomPart: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: 5,
    justifyContent: 'space-evenly'
  },
  alertIconStyle: {
    height: 35,
    width: 35,
  },
  alertTitleTextStyle: {
    textAlign: 'justify',
    color: "#FFFFFF",
    fontSize: 18,
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

export default DialogDateSelection;
