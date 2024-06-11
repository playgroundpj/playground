import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_RESERVATION     = 'reservation/GET_RESERVATION';
export const POST_REGISTER  = 'reservation/POST_REGISTER';
export const GET_RESERVATION_ID     = 'auth/GET_RESERVATION';
export const PUT_RESERVATION     = 'reservation/PUT_RESERVATION';
export const DELETE_RESERVATION     = 'reservation/DELETE_RESERVATION';
export const GET_RESERVATION_LIST     = 'reservation/GET_RESERVATION_LIST';
export const GET_MEMBER_RESERVATION     = 'reservation/GET_MEMBER_RESERVATION';


const actions = createActions({
    [GET_RESERVATION]: () => {},
    [POST_REGISTER]: () => {},
    [GET_RESERVATION_ID]: () => {},
    [PUT_RESERVATION]: () => {},
    [DELETE_RESERVATION]: () => {},
    [GET_RESERVATION_LIST]: () => {},
    [GET_MEMBER_RESERVATION]: () => {},
});

/* 리듀서 */
const reservationReducer = handleActions(
    {
        [GET_RESERVATION]: (state, { payload }) => {
            
            return payload;
        },
        [POST_REGISTER]: (state, { payload }) => {
            
            return payload;
        },
        [GET_RESERVATION_ID]: (state, { payload }) => {
            
            return payload;
        },
        [PUT_RESERVATION]: (state, { payload }) => {
            
            return payload;
        },
        [DELETE_RESERVATION]: (state, { payload }) => {
            
            return payload;
        },
        [GET_RESERVATION_LIST]: (state, { payload }) => {
            
            return payload;
        },
        [GET_MEMBER_RESERVATION]: (state, { payload }) => {
            
            return payload;
        },

    },
    initialState
);

export default reservationReducer;