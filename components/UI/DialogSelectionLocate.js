import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, Modal, View, TouchableOpacity, Image } from 'react-native';
import { Text } from 'react-native-elements';
import PropTypes from "prop-types";
import DropDownPicker from 'react-native-dropdown-picker';

import { useLazyQuery, useMutation } from '@apollo/client';
import { FETCH_LOCATE_LIST } from '../../constants/GraphQlQuery';
import theme from '../../constants/theme';
import DialogListItem from '../shop/DialogListItem';
import LoadingServer from './LoadingServer';

const DialogSelectionLocate = props => {
  const [stateList, setStateList] = useState([])
  const [cityList, setCityList] = useState([])
  const [parent, setParent] = useState(0)
  const [level, setLevel] = useState(1)
  const [state, setState] = useState(null)
  const [city, setCity] = useState(null)
  const [loadLocateList, { loading: loadingLocateList, data: dataLocateList, error: errorLocateList }] = useLazyQuery(FETCH_LOCATE_LIST,
    {
      fetchPolicy: 'no-cache',
      variables: { id: 0, level: level, parent: parent },
    });
  useEffect(() => {

    if (dataLocateList) {
      if (level == 1) {
        setStateList(dataLocateList.locate)
      }
      else {
        setCityList(dataLocateList.locate)
      }
    }
  }, [dataLocateList])
  useEffect(() => {
    loadLocateList();
  }, [parent])
  return (
    <Modal
      visible={props.displayAlert}
      transparent={true}
      animationType={"fade"}>
      <View style={styles.mainOuterComponent}>
        <View style={styles.mainContainer}>
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

          <View style={styles.middlePart}>
            {loadingLocateList &&
              <LoadingServer></LoadingServer>
            }
            <FlatList


              data={level === 1 ? stateList : cityList}
              keyExtractor={item => item.ID.toString()}
              renderItem={itemData => (
                <DialogListItem
                  Item={itemData.item}
                  //onMemberClick={() => { shopDispatch({ type: AC_SHOP_MEMBER, shop: itemData.item, newMemberStatus: 1 }) }}
                  onSelectItem={() => {
                    if (parent === 0) {
                      setLevel(2); setParent(parseInt(itemData.item.ID)); setState(itemData.item)
                    }
                    else {
                      setCity(itemData.item)
                      props.onSelectItem(state, itemData.item)
                    }

                  }}
                >
                </DialogListItem>
              )}
            />
            {/* <Text style={{ color: 'white', marginBottom: 4 }}>استان</Text>
            <DropDownPicker
              searchable={true}
              items={stateList}
              placeholder="استان را انتخاب کنید"
              searchablePlaceholder='جستجو...'
              defaultIndex={0}
              showArrow={true}
              containerStyle={{ height: 40 }}
              onChangeItem={item => { setLevel(2); setParent(parseInt(item.value), setState(item)) }}
            />
            <Text style={{ color: 'white', marginTop: 5, marginBottom: 4 }}>شهر</Text>
            <DropDownPicker


              searchable={true}
              items={cityList}
              placeholder="شهر را انتخاب کنید"
              searchablePlaceholder='جستجو...'
              defaultIndex={0}

              containerStyle={{ height: 40 }}
              onChangeItem={item => setCity(item)}
            /> */}

          </View>
          {/* Third Row - Positive and Negative Button */}
          <View style={styles.bottomPart}>

            <TouchableOpacity
              onPress={props.onCloseButton}
              style={styles.closeButtonStyle} >
              <Text style={styles.closeTextStyle}>{props.closeButtonText}</Text>
            </TouchableOpacity>




          </View>
        </View>
      </View>
    </Modal>
  );
}

DialogSelectionLocate.propTypes = {
  displayAlert: PropTypes.bool,
  displayAlertIcon: PropTypes.bool,
  alertTitleText: PropTypes.string,
  alertDataList: PropTypes.array,
  closeButtonText: PropTypes.string,
  okButtonText: PropTypes.string,
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
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.dialogBackground,
    borderRadius: 10,
    padding: 5,
  },
  topPart: {
    //flex: 0.5,

    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: '#00FF00',
    paddingHorizontal: 2,
    paddingVertical: 4
  },
  middlePart: {
    width: '100%',
    height: '80%',
    // borderWidth: 1,
    // borderColor: '#FF6600',
    padding: 4,
    color: '#FFFFFF',
    fontSize: 16,
    marginVertical: 2
  },
  bottomPart: {
    //flex: 0.5,
    width: '100%',

    // borderWidth: 1,
    // borderColor: '#0066FF',
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
  closeButtonStyle: {
    width: '30%',
    height: 40,
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

export default DialogSelectionLocate;
