import React, { useContext, useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  StyleSheet

} from 'react-native';
import {
  Text,
  Input,
  Icon,
  Divider
} from 'react-native-elements';
import { API_BASE_URL, ERROR_FETCH_TEXT } from "../../constants/GlobalConstants";
import { EnumToTitleList, mobileNumberValidator, ZAlert } from "../../utils/Validation";
import { AC_USER_LOGIN } from "../../reducer/Actions";
import Card from '../../components/UI/Card';
import theme from '../../constants/theme';
import { GlobalContext } from "../../context/GlobalContext";
import DialogAlert from "../../components/UI/DialogAlert";
import { AddressView } from "../../models/address";
import BorderButton from '../../components/UI/BorderButton';
import DialogSelectionList from '../../components/UI/DialogSelectionList';
import { USER_ACTIVE_TITLE, USER_GENDER_TITLE } from '../../constants/enums';
import DialogDateSelection from '../../components/UI/DialogDateSelection';
import DialogSelectionLocate from '../../components/UI/DialogSelectionLocate';
import DropDownPicker from 'react-native-dropdown-picker';

const AddEditAddress = props => {
  const { state, dispatch } = useContext(GlobalContext);
  const [address, setAddress] = useState(new AddressView())
  const [showDialog, setShowDialog] = useState(0)

  useEffect(() => {
    setAddress(props.Address)
  }, [state.address])
  return (
    <View style={styles.screen} >
      <Text >{address.LocateTitle}</Text>
      <ScrollView style={{ width: '100%', flex: 1 }}>

        <Divider />

        <View style={styles.box}>
          <Text style={styles.textLabel}>شهر و استان </Text>
          <Text style={styles.textBox}>{address.LocateTitle}</Text>
          <Icon name='create-outline' type="ionicon" color={theme.linkColor} onPress={() => { setShowDialog(1) }} />
          {showDialog === 1 &&
            <DialogSelectionLocate displayAlert={true}
              closeButtonText='بستن'
              okButtonText='ثبت'
              alertTitleText='انتخاب کنید'

              //alertDataList={EnumToTitleList(USER_GENDER_TITLE)}
              onCloseButton={() => { setShowDialog(0) }}
              onSelectItem={(selectedState, selectedCity) => {

                setAddress({ ...address, LocateTitle: selectedState.Title + "-" + selectedCity.Title, StateId: parseInt(selectedState.ID), CityId: parseInt(selectedCity.ID) })
                setShowDialog(0)
              }
              } />
          }
        </View>

        <Divider />
        <Input label='موبایل' placeholder='09' value={address.Mobile} onChangeText={text => { setAddress({ ...address, Mobile: text }) }} ></Input>
        <Divider />
        <Input label='تلفن' placeholder='021-------' value={address.Tel} onChangeText={text => { setAddress({ ...address, Tel: text }) }} ></Input>
        <Divider />
        <Input label='کد پستی' placeholder='00000-00000' value={address.PostalCode} onChangeText={text => { setAddress({ ...address, PostalCode: text }) }} ></Input>
        <Divider />
        <Input label='جزئیات' placeholder='خیابان محله کوچه پلاک' value={address.Details} onChangeText={text => { setAddress({ ...address, Details: text }) }} ></Input>
      </ScrollView>
      <BorderButton style={{
        width: '50%',
        borderRadius: 25,
        borderWidth: 2,
        height: 50,
        alignSelf: 'center',
        marginBottom: 10,
      }} fontSize={12} Title='ثبت تغییرات' onPress={() => props.onSaveClick(address)}></BorderButton>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
  },
  box: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  textBox: {
    fontSize: 16,
    color: "black",
    flex: 1,
    textAlign: 'center'


  },
  textLabel: {
    flex: 0.3,
    fontSize: 14,
    color: theme.textLabelLight,
  }

});


export default AddEditAddress;
