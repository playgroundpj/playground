import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_STORE_BOARDGAME = 'store/GET_STORE_BOARDGAME';
export const GET_STORE_GAMETABLE = 'store/GET_STORE_GAMETABLE';
export const GET_STORE_MENU = 'store/GET_STORE_MENU';
export const GET_STORE_RESERVATION = 'store/GET_STORE_RESERVATION';


const actions = createActions({
    [GET_STORE_BOARDGAME]: () => {},
    [GET_STORE_GAMETABLE]: () => {},
    [GET_STORE_MENU]: () => {},
    [GET_STORE_RESERVATION]: () => {},
});

/* 리듀서 */
const storeReducer = handleActions(
    {
        [GET_STORE_BOARDGAME]: (state, { payload }) => {
            
            return payload;
        },
        [GET_STORE_GAMETABLE]: (state, { payload }) => {
            
            return payload;
        },
        [GET_STORE_MENU]: (state, { payload }) => {
            
            return payload;
        },
        [GET_STORE_RESERVATION]: (state, { payload }) => {
            
            return payload;
        },
    },
    initialState
);

export default storeReducer;