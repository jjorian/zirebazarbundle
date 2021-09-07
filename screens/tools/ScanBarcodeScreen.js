import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Text, Button } from 'react-native-elements';
const ScanBarcodeScreen = props => {
  const scanType = props.route.params.barCodeType;
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);

    try {
      if (scanType === 1) {
        const c = data.split('/')
        props.navigation.replace('ShopDetails', {
          shopID: 0,
          shopName: c[4],
          shopCode: "N",
          shopTitle: 'بدون عنوان'
        });
      }
      else if (scanType === 2) {
        const c = data.split('/')
        props.navigation.replace('ProductDetails', {
          productID: c[5],
          productName: 'بدون عنوان'
        });
      }
    } catch (error) {
      alert('خطایی در حین تحلیل بارکد بوجود آمده است');
    }
  };
  if (hasPermission === null) {
    return <Text>در حال درخواست برای مجوز بارکد خوان</Text>;
  }
  if (hasPermission === false) {
    return <Text>دسترسی به دوربین برای اسکن بارکد داده نشده است</Text>;
  }
  return (
    <View style={styles.screen}>
      {!scanned && <BarCodeScanner onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} focusable={true} style={StyleSheet.absoluteFillObject} />}
      {/* <Button title={'Tap to Scan Again'} onPress={handleBarCodeScannedHandled} /> */}
      {scanned && <Button title={'برای اسکن بارکد لمس کنید'} onPress={() => setScanned(false)} />}

    </View>
  );
};

export const screenOptions = navData => {
  return {
    headerTitle: 'اسکن بارکد',
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black'
  },

});

export default ScanBarcodeScreen;
