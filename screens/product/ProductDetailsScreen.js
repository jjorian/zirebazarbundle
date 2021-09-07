import React, { useContext, useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
} from 'react-native';
import { Text, Button, Image } from 'react-native-elements';
import { useQuery } from '@apollo/client';
import theme from '../../constants/theme';
import { FETCH_PRODUCT } from '../../constants/GraphQlQuery';
import LoadingServer from '../../components/UI/LoadingServer';
import { fetchPicture } from '../../utils/Validation';

const ProductDetailsScreen = props => {
  // const { state } = useContext(GlobalContext);
  const [product, setProduct] = useState(null);
  const productID = props.route.params.productID

  const { data, error, loading, refetch } = useQuery(FETCH_PRODUCT,
    {
      fetchPolicy: 'no-cache',
      variables: { pid: productID, productName: "N", productCode: "N" },
    });
  useEffect(() => {
    if (data) {
      setProduct(data.Response)
      //props.navigation.setOptions({ headerTitle: data.Response.ProductName });

    }
  }, [data])
  if (error) {
    return <View style={styles.center}>
      <Text>{error.message}</Text>
      <Button title='تلاش مجدد' onPress={refetch} color={theme.primary} />
    </View>
  }
  else if (loading) {
    return <LoadingServer />
  }
  if (product) {
    return (
      <View>
        <ScrollView>
          <View>
            <Image source={fetchPicture(product.Medias.length > 0 ? product.Medias[0].URL : null, 'Product')} style={styles.image}></Image>
            <Text style={styles.content}>دسته:  {product.CategoryTitle}</Text>
            <Text style={styles.content}>نام محصول:  {product.Name}</Text>
          </View>
        </ScrollView>

      </View>

    );
  };
  return (
    <View>
      <Text style={styles.content}>در حال بارگذاری</Text>

    </View>

  );
}

export const screenOptions = navData => {
  return {
    headerTitle: navData.route.params.productName
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  details: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 22,
    textAlign: "center",
  },
  content: {
    fontSize: 14,
    padding: 15,
    textAlign: 'justify'
  },
  ListItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10
  },
});

export default ProductDetailsScreen;
