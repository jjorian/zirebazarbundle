import React, { useContext, useEffect, useReducer, useState } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,

} from 'react-native';
import { Text } from 'react-native-elements';
import { AC_USER_LOGIN, AC_USER_LOGOUT } from '../reducer/Actions';
import { FETCH_USER_INFO } from '../constants/GraphQlQuery';

import ReadUserData from "../Service/AsyncStorageTools";
import theme from '../constants/theme';
import { GlobalContext } from "../context/GlobalContext";
import { useLazyQuery } from '@apollo/client';
import BorderButton from '../components/UI/BorderButton';

const StartupScreen = props => {
  // AsyncStorage.removeItem('userData')
  //   .then(() => {
  //     dispatch({ type: AC_USER_LOGOUT })
  //   })
  //   .catch((err) => {
  //   })
  const { state, dispatch } = useContext(GlobalContext);
  const [loginInfo, setLoginInfo] = useState({ userId: 0, token: 'NaN', hashCode: 'NaN' })
  const [loadItem, { loading, data, error }] = useLazyQuery(FETCH_USER_INFO,
    {
      fetchPolicy: 'no-cache',
      variables: { ID: loginInfo.userId, UserName: '', Password: '', HashCode: loginInfo.hashCode, Mobile: '', Email: '', SessionID: 0 },
    });
  useEffect(() => {
    if (data) {

      dispatch({ type: AC_USER_LOGIN, userId: loginInfo.userId, token: loginInfo.token, tryLoading: false, user: data.user, userHashCode: loginInfo.hashCode })
    }
  }, [data])
  useEffect(() => {
    if (loginInfo.userId > 0) {
      loadItem();
    }
  }, [loginInfo])

  useEffect(() => {
    const tryLogin = async () => {
      const { userId, token, hashCode } = await ReadUserData();

      if (userId === 0) {
        dispatch({ type: AC_USER_LOGOUT })
        return;
      }
      setLoginInfo({ userId: userId, token: token, hashCode: hashCode })



      // const transformedData = JSON.parse(userData);
      // const { token, userId } = transformedData;

      // if (!token || !userId) {
      //   dispatch({ type: "LogOut" })

      //   return;
      // }
    };

    tryLogin();
  }, []);
  if (error) {
    return (
      <View style={styles.screen}>
        <Text>{error.message}</Text>
        <BorderButton
          Title="تلاش مجدد"
          style={{ borderWidth: 1, borderRadius: 10, width: '90%', height: 40, alignSelf: 'center' }}
          onPress={() => {
            loadItem();
          }}
        />
      </View>
    )
  }
  if (loading) {
    return (
      <View style={styles.screen}>
        <ActivityIndicator size="large" color={theme.primary} />
        <Text>صبور باشید در حال دریافت داده ها</Text>
      </View>
    )
  }
  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={theme.primary} />
      <Text>...در حال بارگذاری</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default StartupScreen;
