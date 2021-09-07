import React, { useEffect, useState, useCallback, useContext } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import theme from '../../constants/theme';
import { GlobalContext } from "../../context/GlobalContext";
import { useQuery, gql } from '@apollo/client';
import Autocomplete from 'react-native-autocomplete-input';
import { FIND_PRODUCTS } from '../../constants/GraphQlQuery';

import { Text, Button } from 'react-native-elements';

const ProductSearchScreen = props => {
  const { state } = useContext(GlobalContext);
  const [inputQuery, setInputQuery] = useState("");
  const [skip, setSkip] = React.useState(true)
  const shopID = props.route.params.shopID

  const [FilterData, setFilterData] = useState([]);
  const [selectedItem, setSelectedItem] = useState({});
  const { data, error, loading, refetch } = useQuery(FIND_PRODUCTS,
    {
      fetchPolicy: 'no-cache',
      variables: { sid: shopID, query: inputQuery },
      skip: skip
    });
  useEffect(() => {
    if (data) {
      setFilterData(data.findProduct);
    }
    else {
      setFilterData([]);
    }
  }, [data])
  useEffect(() => {
    if (inputQuery.length >= 1) {
      setSkip(false);
      refetch();
    }
    else {
      setSkip(true);
      setFilterData([]);
    }

  }, [inputQuery])
  useEffect(() => {
    selectItemHandler();

  }, [selectedItem])
  const selectItemHandler = () => {
    if (selectedItem.ID > 0) {
      props.navigation.replace('ProductDetails', {
        productID: selectedItem.ID,
        productName: selectedItem.Name
      });
    }
  };
  if (error) {
    return <View style={styles.center}>
      <Text>{error.message}</Text>
      <Button title='تلاش مجدد' onPress={refetch} color={theme.primary} />
    </View>
  }
  return (
    <View style={styles.center}>
      <Autocomplete
        autoCapitalize="none"
        autoCorrect={false}
        containerStyle={styles.AutocompleteStyle}
        data={FilterData}
        defaultValue=
        {
          JSON.stringify(selectedItem) === '{}' ?
            '' :
            selectedItem.Title
        }
        keyExtractor={(item, i) => i.toString()}
        onChangeText={(text) => { setInputQuery(text); }}
        placeholder="ّبرای جستجو انتخاب کنید"
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedItem(item);
              setFilterData([]);
            }}>
            <Text style={styles.SearchBoxTextItem}>
              {item.Name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>

  );


}

export const screenOptions = navData => {
  return {
    headerTitle: 'جستجوی کالا',
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
  selectedTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  selectedTextStyle: {
    textAlign: 'center',
    fontSize: 18,
  },
});
export default ProductSearchScreen;
