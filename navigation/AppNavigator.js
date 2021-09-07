import React, { useContext, useState, useEffect } from 'react';
import { View } from 'react-native';
import { Button, Card, Divider, Image, Text } from 'react-native-elements';
import BorderButton from '../components/UI/BorderButton';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerNavigator, AuthNavigator } from './ShopCenterNavigator';
import StartupScreen from '../screens/StartupScreen';
import { GlobalContext } from "../context/GlobalContext";
import { ApolloProvider } from '@apollo/client';
import makeApolloClient from '../Service/makeApolloClient';
import ReadUserData from "../Service/AsyncStorageTools";

const AppNavigator = props => {
  const { state } = useContext(GlobalContext);

  const [client, setClient] = useState(null);
  const fetchSession = async () => {
    const { userId, token } = await ReadUserData();
    const clientQl = makeApolloClient(userId, token);
    setClient(clientQl);
  }
  useEffect(() => {
    fetchSession();
  }, [state.userId])
  if (client) {
    return (
      <ApolloProvider client={client}>
        <NavigationContainer>
          {state.userId > 0 && <DrawerNavigator />}
          {state.userId === 0 && state.tryLoading === false && <AuthNavigator />}
          {state.userId === 0 && state.tryLoading === true && <StartupScreen />}
        </NavigationContainer>
      </ApolloProvider>
    );
  }
  else {
    return (<View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Card containerStyle={{ borderRadius: 10, marginBottom: 10 }} wrapperStyle={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 12, alignSelf: 'center', marginBottom: 5 }}>توجه</Text>
        <Card.Divider />
        <Image style={{ width: 180, height: 180 }} source={require("../assets/img_ops.png")} />
        <Text style={{ fontSize: 14, alignSelf: 'center' }}>برنامه بارگذاری نشد مجددا تلاش کنید</Text>
      </Card>

      <BorderButton style={{
        width: 150,
        borderRadius: 25,
        borderWidth: 2,
        height: 50,
        marginTop: 10,
      }} fontSize={12} Title="تلاش دوباره" onPress={fetchSession}></BorderButton>

    </View>
    )
  };
}
export default AppNavigator;
