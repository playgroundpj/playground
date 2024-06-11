import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_MENU     = 'menu/GET_MENU';
export const POST_REGISTER  = 'menu/POST_REGISTER';
export const GET_MENU_ID     = 'auth/GET_MENU';
export const PUT_MENU     = 'menu/PUT_MENU';
export const DELETE_MENU     = 'menu/DELETE_MENU';
export const GET_MENU_LIST     = 'menu/GET_MENU_LIST';


const actions = createActions({
    [GET_MENU]: () => {},
    [POST_REGISTER]: () => {},
    [GET_MENU_ID]: () => {},
    [PUT_MENU]: () => {},
    [DELETE_MENU]: () => {},
    [GET_MENU_LIST]: () => {},
});

/* 리듀서 */
const menuReducer = handleActions(
    {
        [GET_MENU]: (state, { payload }) => {
            
            return payload;
        },
        [POST_REGISTER]: (state, { payload }) => {
            
            return payload;
        },
        [GET_MENU_ID]: (state, { payload }) => {
            
            return payload;
        },
        [PUT_MENU]: (state, { payload }) => {
            
            return payload;
        },
        [DELETE_MENU]: (state, { payload }) => {
            
            return payload;
        },
        [GET_MENU_LIST]: (state, { payload }) => {
            
            return payload;
        },

    },
    initialState
);

export default menuReducer;