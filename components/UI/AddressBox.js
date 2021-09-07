import React, { useEffect, useState, useContext, useCallback } from 'react';
import { TouchableOpacity, ActivityIndicator, FlatList, Modal, View, StyleSheet } from 'react-native';
import Card from './Card';
import { Button, Text } from 'react-native-elements'

import AddressItem from '../shop/AddressItem';
import { ShopContext } from "../../context/ShopContext";
import { GlobalContext } from "../../context/GlobalContext";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { FETCH_ADDRESS, ADD_EDIT_ADDRESS, FETCH_ADDRESS_LIST } from '../../constants/GraphQlQuery';
import { useLazyQuery, useMutation } from '@apollo/client';
import { AddressView } from "../../models/address";
import theme from '../../constants/theme';
import AddEditAddress from "./AddEditAddress";
const AddressButton = (props) => {
  return (<TouchableOpacity>
    <Text style={{ color: 'blue' }} onPress={props.onClick} >
      {props.aId == 1 ? "تعیین آدرس" : "تغییر آدرس"}
    </Text>
  </TouchableOpacity>)

}
const AddressBox = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const { state } = useContext(GlobalContext);
  const { shopState, shopDispatch } = useContext(ShopContext);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [addressList, setAddressList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [addEditMode, setAddEditMode] = useState(false)
  const [addEditAddress, setAddEditAddress] = useState(null);
  const [address, setAddress] = useState(new AddressView(1, state.userId, 0, 0, 0, "آدرس تعیین نشده است", "", "", "", "", "", "استان و شهر", ""));
  const [loadAddressList, { loading: loadingAddressList, data: dataAddressList, error: errorAddressList }] = useLazyQuery(FETCH_ADDRESS_LIST,
    {
      fetchPolicy: 'no-cache',
      variables: { uid: state.userId },
    });

  const [addEditItem] = useMutation(ADD_EDIT_ADDRESS,
    {
      fetchPolicy: 'no-cache',
    });
  const onAddEditItem = (item) => {
    setIsLoading(true);
    addEditItem({
      variables: { inputAddress: item }
    }).then(res => {
      setIsLoading(false);

      if (res.data) {
        setAddEditMode(false);
        loadAddressList();
      }
    })
  }

  useEffect(() => {
    if (dataAddressList) {
      setAddressList(dataAddressList.addressList)
      if (props.addressId > 1) {
        let a = dataAddressList.addressList.find(x => x.ID == props.addressId);

        if (a)
          setAddress(a);
      }
    }
  }, [dataAddressList])
  useEffect(() => {
    loadAddressList();

  }, [])
  const setTitle = () => {
    if (addEditMode) {
      return "افزودن یا ویرایش آدرس"
    }
    else {
      return "آدرس را انتخاب کنید"
    }
  }

  return (
    <View style={styles.centeredView}>

      <View style={{ flexDirection: 'row', padding: 8 }}>
        <Text style={{ flex: 1, fontSize: 16 }}>
          {address.LocateTitle}
        </Text>
        <AddressButton aId={props.addressID} onClick={() => { setModalVisible(true) }} />
      </View>
      <Text style={{ padding: 8, fontSize: 15 }}>
        {address.Details}
      </Text>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ padding: 8, fontSize: 15, flex: 1 }}>
              {
                setTitle()
              }
            </Text>
            {!addEditMode && <Button onPress={() => {
              if (!addEditMode) {
                setAddEditAddress(new AddressView(0, state.userId, 0, 0, 0, "", "", "", "", "", "", "استان و شهر", ""))
                setAddEditMode(true);
              }

            }}
              type='outline' icon={{
                name: "add",
                size: 15,
                color: "black"
              }}></Button>
            }
            <Button onPress={() => {
              if (!addEditMode) {
                setModalVisible(!modalVisible)
              }
              else {
                setAddEditMode(false);
              }

            }

            }
              type='outline' icon={{
                name: !addEditMode ? "close" : "chevron-left",
                size: 15,
                color: "black"
              }}></Button>
          </View>
          {isLoading &&
            <View >
              <Text>در حال اعمال تغییرات به سرور</Text>
              <ActivityIndicator size='large' color={theme.primary} />
            </View>
          }
          {
            addEditMode &&
            <AddEditAddress Address={addEditAddress} onCloseClick={() => { setAddEditMode(false) }} onSaveClick={(add) => {
              setAddEditMode(false);
              const { __typename, LocateTitle, FullName, ...newObj } = add;

              onAddEditItem(newObj)
            }} ></AddEditAddress>
          }
          {!addEditMode &&
            <FlatList
              onRefresh={loadAddressList}
              refreshing={isRefreshing}
              data={addressList}
              keyExtractor={item => item.ID.toString()}
              renderItem={itemData => {
                return (
                  <AddressItem
                    Item={itemData.item}
                    onClick={() => {
                      setAddress(itemData.item);
                      props.onSelectAddress(itemData.item.ID);
                      setModalVisible(!modalVisible);
                    }}
                    onEdit={() => {

                      setAddEditAddress(itemData.item);
                      setAddEditMode(true);


                    }}
                  >
                  </AddressItem>)
              }
              }
            />
          }
        </View>
      </Modal>

    </View>
  )
};

const styles = StyleSheet.create({

  centeredView: {
    flex: 1
  },
  modalView: {
    margin: 2,
    height: '100%',
    width: '100%',
    borderRadius: 12,
    backgroundColor: 'white',
    padding: 5,
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },




});

export default AddressBox;
