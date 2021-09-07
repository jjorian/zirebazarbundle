import { useMutation } from '@apollo/client';
import { useState, useEffect, useContext } from 'react';
import { ADD_EDIT_ORDER_ROW } from '../constants/GraphQlQuery';
import { GlobalContext } from '../context/GlobalContext';
import { ShopContext } from '../context/ShopContext';
import { OrderRowView } from '../models/order';
import { AC_SHOP_ADD_TO_CARD, AC_SHOP_REMOVE_FROM_CARD } from '../reducer/Actions';

export default function useAddEditProduct(sid, uid, status, type) {
  const [isAddEditing, setIsAddEditing] = useState(false);
  const [headIdByRow, setHeadIdByRow] = useState(0);
  const { shopState, shopDispatch } = useContext(ShopContext);
  const { state } = useContext(GlobalContext);
  const [addEditCard] = useMutation(ADD_EDIT_ORDER_ROW,
    {
      fetchPolicy: 'no-cache',
    });
  const onAddEditItem = (item) => {
    //const item = new OrderRowView(id, hid, pid, "", price, discount, count, comment);

    setIsAddEditing(true);
    addEditCard({
      variables: { sid: sid, uid: uid, status: status, addEditItem: item }
    }).then(res => {
      setIsAddEditing(false);

      if (res.data) {
        if (item.Count != 0) {
          setHeadIdByRow(res.data.addEditOrderRow.HId);
          shopDispatch({ type: AC_SHOP_ADD_TO_CARD, row: res.data.addEditOrderRow, rowsType: type })
        }
        else {
          shopDispatch({ type: AC_SHOP_REMOVE_FROM_CARD, RID: item.ID, rowsType: type })
        }
      }
    })
  }

  return [isAddEditing, onAddEditItem, headIdByRow];
}