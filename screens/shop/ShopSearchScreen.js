import React, { useEffect, useState, useCallback, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Input, Icon } from 'react-native-elements';
import theme from '../../constants/theme';
import { GlobalContext } from "../../context/GlobalContext";
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import Autocomplete from 'react-native-autocomplete-input';
import { FIND_SHOPS } from '../../constants/GraphQlQuery';
import BorderButton from '../../components/UI/BorderButton';
import LoadingServer from '../../components/UI/LoadingServer';


const ShopSearchScreen = props => {

  const [inputQuery, setInputQuery] = useState('');
  const [query, setQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedItem, setSelectedItem] = useState({});
  const [loadItem, { loading, data, error }] = useLazyQuery(FIND_SHOPS,
    {
      fetchPolicy: 'no-cache',
      variables: { query: query },
      //skip: skip
    });
  useEffect(() => {
    if (data) {
      if (data.findShop.length > 0) {
        setErrorMessage("");
        setSelectedItem(data.findShop[0]);
      }
      else {
        setErrorMessage("فروشگاهی با این نام یا کد پیدا نشد");

      }
    }
  }, [data])
  // useEffect(() => {
  //   setErrorMessage("");
  // }, [inputQuery])

  useEffect(() => {
    selectItemHandler();

  }, [selectedItem])
  const selectItemHandler = () => {
    if (selectedItem.ID > 0) {
      props.navigation.replace('ShopDetails', {
        shopID: selectedItem.ID,
        shopName: "N",
        shopCode: "N",
        shopTitle: selectedItem.Name
      });
    }
  };
  if (error) {
    return <View style={styles.center}>
      <Text>{error.message}</Text>
      <Button title='تلاش مجدد' onPress={loadItem} color={theme.primary} />
    </View>
  }

  return (
    <View style={styles.center}>

      <Input
        label="نام و یا کد فروشگاه را وارد کنید"
        placeholder="ZireBazar"
        value={inputQuery}
        inputStyle={styles.search}
        //keyboardType='phone-pad'
        errorMessage={errorMessage}
        //rightIcon={<Icon name='search' type="ionicon"></Icon>}
        onChangeText={text => { setInputQuery(text) }} />
      <Button type={'solid'} buttonStyle={{ width: '50%', alignSelf: 'center' }} loading={loading} onPress={() => {
        if (inputQuery.length > 1) {
          setQuery(inputQuery);
          loadItem()
        }
        else {
          // setSkip(true);
          setErrorMessage(" ورودی باید بیشتر از یک حرف باشد")
        }
      }} title='جستجو' />


    </View>

  );


}

export const screenOptions = navData => {
  return {
    headerTitle: 'جستجوی فروشگاه',
  };
};
const styles = StyleSheet.create({
  center: {
    backgroundColor: '#FAFAFA',
    flex: 1,
    padding: 12,
  },
  AutocompleteStyle: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
    borderWidth: 1
  },
  SearchBoxTextItem: {
    margin: 5,
    fontSize: 16,
    paddingTop: 4,
  },
  search: {
    textAlign: 'center',
  },
  selectedTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  selectedTextStyle: {
    textAlign: 'center',
    fontSize: 18,
  },
});
export default ShopSearchScreen;
