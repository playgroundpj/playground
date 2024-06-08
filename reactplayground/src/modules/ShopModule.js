import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_SHOP     = 'shop/GET_SHOP';
export const POST_REGISTER  = 'shop/POST_REGISTER';
export const GET_SHOP_ID     = 'auth/GET_SHOP';
export const PUT_SHOP     = 'shop/PUT_SHOP';
export const DELETE_SHOP     = 'shop/DELETE_SHOP';
export const GET_SHOP_LIST     = 'shop/GET_SHOP_LIST';
export const GET_GAMETABLE     = 'shop/GET_GAMETABLE';


const actions = createActions({
    [GET_SHOP]: () => {},
    [POST_REGISTER]: () => {},
    [GET_SHOP_ID]: () => {},
    [PUT_SHOP]: () => {},
    [DELETE_SHOP]: () => {},
    [GET_SHOP_LIST]: () => {},
    [GET_GAMETABLE]: () => {},
});

/* 리듀서 */
const shopReducer = handleActions(
    {
        [GET_SHOP]: (state, { payload }) => {
            
            return payload;
        },
        [POST_REGISTER]: (state, { payload }) => {
            
            return payload;
        },
        [GET_SHOP_ID]: (state, { payload }) => {
            
            return payload;
        },
        [PUT_SHOP]: (state, { payload }) => {
            
            return payload;
        },
        [DELETE_SHOP]: (state, { payload }) => {
            
            return payload;
        },
        [GET_SHOP_LIST]: (state, { payload }) => {
            
            return payload;
        },
        [GET_GAMETABLE]: (state, { payload }) => {
            
            return payload;
        },

    },
    initialState
);

export default shopReducer;