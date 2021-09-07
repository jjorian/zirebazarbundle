import { AC_SHOP_INFO, AC_SHOP_MEMBER, AC_SHOP_LIST, AC_SHOP_PRODUCTS, AC_SHOP_ADD_TO_CARD, AC_SHOP_REMOVE_FROM_CARD, AC_SHOP_FILL_CARD, AC_SHOP_ORDER_LIST, AC_SHOP_CARD_LIST, AC_SHOP_CLEAR_CARD, AC_FETCH_ORDER_LIST, AC_SHOP_CATEGORY_ID, AC_SHOP_CLEAR_PRODUCT, AC_SHOP_SET_HEAD_ID } from "./Actions";
import { ShopListView, ShopView } from "../models/shop";
import { ProductListView } from "../models/product";
import { OrderHeadView, OrderRowView } from "../models/order";
export const initialState = { shop: null, shops: [], products: [], rowsCard: [], headCardList: [], headOrderList: [], Loading: false, category: null, shopHeadId: 0, cartHeadId: 0 }
export const reducer = (state, action) => {
    switch (action.type) {
        case AC_SHOP_MEMBER:

            let index = state.shops.findIndex(x => x.ID === action.shop.ID);
            if (index >= 0) {
                const find = state.shops[index];
                state.shop.MemberStatus = action.newMemberStatus;
                find.MemberStatus = action.newMemberStatus;

                if (action.newMemberStatus == 0) {
                    state.shops = state.shops.slice(0, index).concat(state.shops.slice(index + 1, state.shops.length))
                }
            }
            else {

                const item = action.shop;
                item.MemberStatus = action.newMemberStatus;
                const newShop = {
                    __typename: "ShopList",
                    ID: item.ID,
                    Title: item.Title,
                    ActiveTitle: item.ActiveTitle,
                    StatusTitle: item.StatusTitle,
                    CategoryTitle: item.CategoryTitle,
                    MemberStatus: item.MemberStatus,
                    Media: item.Medias
                };
                state.shops = state.shops.concat(newShop);
            }
            return {
                ...state
            };
        case AC_SHOP_LIST:
            return {
                ...state,
                shops: action.shops,
            };
        case AC_SHOP_INFO:
            return {
                ...state,
                shop: action.shop,
            };
        case AC_SHOP_PRODUCTS:
            return {
                ...state,
                products: state.products.concat(action.products)
            };

        case AC_SHOP_ADD_TO_CARD:
            console.log(action.row);
            index = state.rowsCard.findIndex(x => x.PId === action.row.PId && x.HId === action.row.HId);
            if (index === -1) {
                state.rowsCard.push(action.row);
            } else {
                state.rowsCard[index] = action.row;
            }
            if (action.rowsType === 'Shop' && action.row.HId !== state.shopHeadId) {
                state.shopHeadId = action.row.HId;
            }
            else if (action.rowsType === 'Cart' && action.row.HId !== state.cartHeadId) {
                state.cartHeadId = action.row.HId;
            }
            return {
                ...state
            };
        case AC_SHOP_REMOVE_FROM_CARD:
            return {
                ...state,
                rowsCard: state.rowsCard.filter(x => x.ID !== action.RID)
            };
        case AC_SHOP_FILL_CARD:
            let rows = [];
            if (action.rowsCard.length > 0)
                rows = state.rowsCard.filter(x => x.HId != action.rowsCard[0].HId)

            if (action.rowsType === 'Shop') {
                state.shopHeadId = action.rowsCard[0].HId;
            }
            else if (action.rowsType === 'Cart') {

                state.cartHeadId = action.rowsCard[0].HId;
            }
            return {
                ...state,
                rowsCard: [...rows, ...action.rowsCard]

            };
        case AC_SHOP_CLEAR_CARD:
            return {
                ...state,
                rowsCard: state.rowsCard.filter(x => x.HId != action.HId)
            };

        case AC_SHOP_CARD_LIST:
            return {
                ...state,
                headCardList: action.headCardList,
            };
        case AC_SHOP_ORDER_LIST:
            return {
                ...state,
                headOrderList: action.headOrderList,
            };
        case AC_SHOP_CLEAR_PRODUCT:
            return {
                ...state,
                products: []
            };

        case AC_SHOP_CATEGORY_ID:

            return {
                ...state,
                category: action.category,
            };


        default:
            return state;
    }
}