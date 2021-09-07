import { AC_USER_LOGIN, AC_USER_LOGOUT, AC_USER_INFO, AC_USER_RELOAD } from "./Actions";
export const initialState = { userId: 0, token: 'NaN', userHashCode: 'NaN', tryLoading: true, user: null }
export const reducer = (state, action) => {
    switch (action.type) {
        case AC_USER_LOGIN:
            return { userId: action.userId, token: action.token, tryLoading: action.tryLoading, user: action.user, userHashCode: action.hashCode }
        case AC_USER_INFO:
            return { ...initialState, user: action.user }
        case AC_USER_LOGOUT:
            return {
                ...initialState,
                tryLoading: false,
            };
        case AC_USER_RELOAD:
            return {
                ...initialState,
                tryLoading: true, userId: 0
            };


        default:
            return state;
    }



}