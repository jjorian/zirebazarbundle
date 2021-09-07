import React, { useContext, useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  StyleSheet

} from 'react-native';
import {
  Text,
  Input,
  ListItem,
  Image,
  Header,
  Icon,
  Divider
} from 'react-native-elements';
import { API_BASE_URL, ERROR_FETCH_TEXT } from "../../constants/GlobalConstants";
import { EnumToTitleList, mobileNumberValidator, removeProperties, ZAlert } from "../../utils/Validation";
import { AC_USER_INFO, AC_USER_RELOAD } from "../../reducer/Actions";
import Card from '../../components/UI/Card';
import theme from '../../constants/theme';
import { GlobalContext } from "../../context/GlobalContext";
import DialogAlert from "../../components/UI/DialogAlert";
import { UserView } from "../../models/user";
import BorderButton from '../../components/UI/BorderButton';
import DialogSelectionList from '../../components/UI/DialogSelectionList';
import { USER_ACTIVE_TITLE, USER_GENDER_TITLE } from '../../constants/enums';
import DialogDateSelection from '../../components/UI/DialogDateSelection';
import DialogSelectionLocate from '../../components/UI/DialogSelectionLocate';
import DropDownPicker from 'react-native-dropdown-picker';
import { EDIT_USER_INFO, FETCH_SHOP } from '../../constants/GraphQlQuery';
import { useQuery, gql, useMutation } from '@apollo/client';

const ProfileScreen = props => {
  const { state, dispatch } = useContext(GlobalContext);
  const [user, setUser] = useState(new UserView())
  const [showDialog, setShowDialog] = useState(0)
  const [dialogMessage, setDialogMessage] = useState("")
  useEffect(() => {
    setUser(state.user)
  }, [state.user])
  const [updateProfile] = useMutation(EDIT_USER_INFO,
    {
      fetchPolicy: 'no-cache',
    });
  const onUpdateProfile = () => {
    const a = removeProperties(user, 'HashCode', 'Mobile', 'RegisterDate', 'Status', 'Role', 'StatusTitle', 'LocateTitle', 'ActiveTitle', 'GenderTitle', 'IsOnline', 'ProfileScore', 'Medias', '__typename')

    updateProfile({
      variables: { InputUser: a }
    }).then(res => {
      if (!res.errors) {
        dispatch({ type: AC_USER_RELOAD });
      }
      else {
        setDialogMessage(res.errors[0]);
        setShowDialog(5);
      }

    })
  }

  return (
    <View style={styles.screen} >
      <Header
        backgroundColor={theme.primary}
        leftComponent={<Icon name='arrow-forward-outline' type="ionicon" color='white' onPress={() => { props.navigation.goBack(); props.navigation.toggleDrawer(); }}></Icon>}
        centerComponent={{ text: 'ویرایش مشخصات کاربر', style: { color: '#fff' } }}
      // rightComponent={{ icon: 'home', color: '#fff' }}
      />
      <ScrollView>
        <View style={styles.box}>
          <Text style={styles.textLabel}>کد معرفی </Text>
          <Text style={styles.textBox}>{user.Code}</Text>
          <Icon name='copy-outline' type="ionicon" color={theme.linkColor} onPress={() => { }} />

        </View>
        <View style={styles.box}>
          <Text style={styles.textLabel}>موبایل </Text>
          <Text style={styles.textBox}>{user.Mobile}</Text>
        </View>
        <Divider />

        <Input label='نام کامل' placeholder='نام و نام خانوادگی' value={user.FullName} onChangeText={text => { setUser({ ...user, FullName: text }) }} ></Input>
        <View style={styles.box}>
          <Text style={styles.textLabel}>شهر و استان </Text>
          <Text style={styles.textBox}>{user.LocateTitle}</Text>
          <Icon name='create-outline' type="ionicon" color={theme.linkColor} onPress={() => { setShowDialog(1) }} />
          {showDialog === 1 &&
            <DialogSelectionLocate displayAlert={true}
              closeButtonText='بستن'
              okButtonText="انتخاب"
              onCloseButton={() => { setShowDialog(0) }}

              alertTitleText='استان و شهر را انتخاب کنید'
              //alertDataList={EnumToTitleList(USER_GENDER_TITLE)}
              onSelectItem={(selectedState, selectedCity) => {
                setShowDialog(0)
                setUser({ ...user, StateId: parseInt(selectedState.ID), CityId: parseInt(selectedCity.ID), LocateTitle: selectedState.Title + "-" + selectedCity.Title })
              }
              } />
          }
        </View>
        <Divider />
        <View style={styles.box}>
          <Text style={styles.textLabel}>تاریخ تولد </Text>
          <Text style={styles.textBox}>{user.BirthDay}</Text>
          <Icon name='create-outline' type="ionicon" color={theme.linkColor} onPress={() => { setShowDialog(2) }} />

          {showDialog === 2 &&
            <DialogDateSelection displayAlert={true} displayAlertIcon={true}
              closeButtonText='بستن'
              alertTitleText='تاریخ را انتخاب کنید'
              alertDataList={EnumToTitleList(USER_GENDER_TITLE)}
              onSelectItem={(selected) => {
                setShowDialog(0)
                if (selected != "N")
                  setUser({ ...user, BirthDay: selected })
              }
              } />
          }
        </View>
        <Divider />
        <View style={styles.box}>
          <Text style={styles.textLabel}>جنسیت </Text>
          <Text style={styles.textBox}>{USER_GENDER_TITLE[user.Gender]}</Text>
          <Icon name='create-outline' type="ionicon" color={theme.linkColor} onPress={() => { setShowDialog(3) }} />
          {showDialog === 3 && <DialogSelectionList displayAlertIcon={true}
            displayAlert={true}
            closeButtonText='بستن'
            alertTitleText='جنسیت را انتخاب کنید'
            alertDataList={EnumToTitleList(USER_GENDER_TITLE)}
            onSelectItem={(selected) => {
              setShowDialog(0)
              setUser({ ...user, Gender: parseInt(selected.ID) })

            }
            }
          />}
        </View>
        <Divider />
        <View style={styles.box}>
          <Text style={styles.textLabel}>فعالیت </Text>
          <Text style={styles.textBox}>{USER_ACTIVE_TITLE[user.Active]}</Text>
          <Icon name='create-outline' type="ionicon" color={theme.linkColor} onPress={() => { setShowDialog(4) }} />
          {showDialog === 4 && <DialogSelectionList
            displayAlert={true}
            closeButtonText='بستن'
            alertTitleText='انتخاب کنید'
            alertDataList={EnumToTitleList(USER_ACTIVE_TITLE)}
            onSelectItem={(selected) => {
              setShowDialog(0)
              setUser({ ...user, Active: parseInt(selected.ID) })
            }
            }
          />}
        </View>
        <Divider />
        <Input label='ایمیل' placeholder='example@email.com' value={user.Email} onChangeText={text => { setUser({ ...user, Email: text }) }} ></Input>
      </ScrollView>
      {showDialog === 5 && <DialogAlert
        displayAlert={true}
        displayAlertIcon={true}
        alertTitleText='توجه'
        alertMessageText={"موارد زیر را برطرف کنید\n" + dialogMessage}
        okButtonText="بسیار خب"
        displayOkButton={true}
        onPress={(what) => {
          setShowDialog(0);

        }
        }
      />}
      <BorderButton style={{
        width: '50%',
        borderRadius: 25,
        borderWidth: 2,
        height: 50,
        alignSelf: 'center',
        marginBottom: 10,
      }} fontSize={12} Title='ثبت تغییرات' onPress={() => {
        let msg = "";
        if (!user.FullName || user.FullName?.length === 0) {
          msg += "نام را باید وارد کنید\n"
        }

        if (user.StateId === 0) {
          msg += "شهر و استان را تعیین کنید\n"
        }
        if (user.BirthDay === "1300/01/01") {
          msg += "تاریخ تولد را تعیین کنید\n"
        }
        if (user.Gender === 0) {
          msg += "جنسیت را تعیین کنید\n"
        }
        if (user.Active === 0) {
          msg += "وضعیت کاربری را مشخص کنید\n"
        }
        if (msg.length > 0) {
          setDialogMessage(msg);
          setShowDialog(5)
        }

        else {

          onUpdateProfile();
        }

      }}></BorderButton>

    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
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


export default ProfileScreen;
