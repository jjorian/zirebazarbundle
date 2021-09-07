import React, { useState, useEffect, useContext, useRef } from 'react';

import {
  Image,
  Input,
  Text,
  Icon
} from 'react-native-elements';

import {
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform, TouchableWithoutFeedback, Keyboard,
  StyleSheet,
  Animated,
  Alert, AsyncStorage, View
} from 'react-native';
import { API_BASE_URL, ERROR_FETCH_TEXT } from "../../constants/GlobalConstants";
import AuthCode from "../../models/authcode";
import { mobileNumberValidator, ZAlert } from "../../utils/Validation";
import { AC_USER_LOGIN } from "../../reducer/Actions";
import Card from '../../components/UI/Card';
import theme from '../../constants/theme';
import { GlobalContext } from "../../context/GlobalContext";
import DialogAlert from "../../components/UI/DialogAlert";
const saveDataToStorage = (token, userId, hashCode) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      hashCode: hashCode
    })
  );
};

const AuthScreen = props => {
  const translateX = useRef(new Animated.Value(-200)).current;
  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(translateX, {
      toValue: 0,
      duration: 1300,
      useNativeDriver: true
    }).start()
  };

  const { dispatch } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(false);
  const [resultFetch, setResultFetch] = useState(null);
  const [error, setError] = useState(null);
  const [mobilePhone, setMobilePhone] = useState('09366071736');
  const [applyCode, setApplyCode] = useState(false);
  const [errorPhone, setErrorPhone] = useState('');
  const [receivedCode, setReceivedCode] = useState('123465');
  const [authCode, setAuthCode] = useState('');

  const createAuthCodeHandler = async (mobile) => {
    setError(null);

    setIsLoading(true);
    try {

      const response = await fetch(
        API_BASE_URL + 'api/v1/User/AuthCode',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(new AuthCode(0, mobile, 0, 0, "ZireBazar", ""))
        }
      );

      if (!response.ok) {

        const errorResData = await response.json();
        setError(errorResData.error.message);

      }
      else {
        const resData = await response.json();
        setApplyCode(!applyCode);
        translateX.setValue(-200);
        fadeIn();
        setAuthCode(resData);

      }
    } catch (err) {
      setError(ERROR_FETCH_TEXT)
    }
    setIsLoading(false);


  };
  const checkAuthCodeHandler = async (id, code, mobile) => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(
        API_BASE_URL + 'api/v1/User/AuthCode',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(new AuthCode(id, mobile, code, 0, "ZireBazar", ""))

        }
      );
      if (!response.ok) {
        const errorResData = await response.json();

        if (errorResData.status === 404)
          setError("کد مورد نظر پیدا نشد،مجددا تلاش کنید");
        else
          setError(errorResData.error.message);
      }
      else {
        const resData = await response.json();

        const user = resData;
        setResultFetch(user);

      }
    } catch (err) {

      setError(ERROR_FETCH_TEXT)
    }

    setIsLoading(false);

  };

  useEffect(() => {
    fadeIn();
  }, [translateX])

  useEffect(() => {
    if (resultFetch) {
      const user = resultFetch;
      console.log(user);
      saveDataToStorage(user.HashCode, user.ID, user.HashCode)
      dispatch({ type: AC_USER_LOGIN, userId: user.ID, token: user.HashCode, tryLoading: false, hashCode: user.HashCode, user: user })

    }
  }, [resultFetch])

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardContainer}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <View style={styles.container}>
          {error &&
            <DialogAlert

              displayAlert={true}
              displayAlertIcon={true}
              alertTitleText={'توجه'}
              alertMessageText={error.toString()}
              displayOkButton={true}
              okButtonText={'بستن'}
              onPress={(what) => { setError(null) }}
            />
          }


          <Image style={{ width: 100, height: 100 }} source={require("../../assets/ic_launcher.png")} />
          <Text style={styles.logo}>زیر بازار</Text>
          {
            !applyCode ? (
              <View style={[styles.inputView]} >
                <Input
                  label="شماره موبایل را وارد کنید"
                  placeholder="09---------"
                  value={mobilePhone}
                  inputStyle={styles.phoneText}
                  keyboardType='phone-pad'
                  errorMessage={errorPhone}
                  rightIcon={<Icon name='keypad' type="ionicon"></Icon>}
                  onChangeText={text => { setMobilePhone(text); setErrorPhone('') }} />
              </View>
            ) : (
              <Animated.View style={[styles.inputView, { transform: [{ translateX }] }]} >
                <Input
                  label={"کد دریافتی"}
                  placeholder="------"
                  value={receivedCode}
                  keyboardType='numeric'
                  style={styles.phoneText}

                  onChangeText={text => setReceivedCode(text)} />
              </Animated.View>
            )
          }

          {
            applyCode && (
              <TouchableOpacity onPress={() => {
                setApplyCode(!applyCode);
                setReceivedCode('');
              }}>
                <Text style={styles.forgot}>ویرایش شماره {mobilePhone}</Text>
              </TouchableOpacity>
            )
          }

          <TouchableOpacity style={styles.loginBtn} onPress={() => {
            if (!applyCode) {
              const res = mobileNumberValidator(mobilePhone);
              if (res.Result === 0) {
                createAuthCodeHandler(mobilePhone);

              }
              else {
                setErrorPhone(res.Message)
              }
            }
            else {
              // saveDataToStorage("12555", 8, "12555")
              // dispatch({ type: AC_USER_LOGIN, userId: 8, token: "12555", tryLoading: false, hashCode: "12555", user: "" })

              checkAuthCodeHandler(authCode.ID, receivedCode, authCode.MobilePhone);

            }
          }}>
            <View style={{ flexDirection: 'row' }}>

              <Text style={styles.loginText}  >{!applyCode ? "ارسال کد" : "تایید کد دریافتی"}</Text>
              {isLoading && <ActivityIndicator size='large' color={theme.primary} />}
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity>
        <Text style={styles.loginText}>Signup</Text>
      </TouchableOpacity> */}
          <Text style={{
            fontSize: 10,
            position: 'absolute', //Here is the trick
            bottom: 0,
            color: 'black'
          }} >Copy Right 2021 ParsianAndroid</Text>
        </View>


      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

  );
};

export const screenOptions = {

  headerTitle: 'ورود به برنامه'
};

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: theme.viewBackGround,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 25,
    marginBottom: 40
  },
  inputView: {
    height: 50,
    width: "80%",
    justifyContent: "center",
  },

  forgot: {
    color: theme.linkColor,
    fontSize: 11
  },
  loginBtn: {
    width: "80%",
    borderWidth: 2,
    borderColor: theme.primary,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  loginText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14
  }
  ,
  phoneText: {
    textAlign: 'center',
    fontSize: 25,
  },
  phoneTextLabelStyle: {
    textAlign: 'center',
    fontSize: 12
  }

});

export default AuthScreen;
