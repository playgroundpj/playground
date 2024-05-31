import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_MEMBER     = 'member/GET_MEMBER';
export const POST_LOGIN     = 'member/POST_LOGIN';
export const POST_REGISTER  = 'member/POST_REGISTER';
export const GET_NUMBER  = 'member/GET_NUMBER';
export const GET_MEMBER_ID     = 'auth/GET_MEMBER';
export const PUT_MEMBER     = 'member/PUT_MEMBER';
export const DELETE_MEMBER     = 'member/DELETE_MEMBER';
export const GET_MEMBER_NUMBER     = 'member/GET_MEMBER_NUMBER';
export const POST_FIND_PASSWORD     = 'member/POST_FIND_PASSWORD';


const actions = createActions({
    [GET_MEMBER]: () => {},
    [POST_LOGIN]: () => {},
    [POST_REGISTER]: () => {},
    [GET_NUMBER]: () => {},
    [GET_MEMBER_ID]: () => {},
    [PUT_MEMBER]: () => {},
    [DELETE_MEMBER]: () => {},
    [GET_MEMBER_NUMBER]: () => {},
    [POST_FIND_PASSWORD]: () => {},
});

/* 리듀서 */
const memberReducer = handleActions(
    {
        [GET_MEMBER]: (state, { payload }) => {
            
            return payload;
        },
        [POST_LOGIN]: (state, { payload }) => {
            
            return payload;
        },
        [POST_REGISTER]: (state, { payload }) => {
            
            return payload;
        },
        [GET_NUMBER]: (state, { payload }) => {
            
            return payload;
        },
        [GET_MEMBER_ID]: (state, { payload }) => {
            
            return payload;
        },
        [PUT_MEMBER]: (state, { payload }) => {
            
            return payload;
        },
        [DELETE_MEMBER]: (state, { payload }) => {
            
            return payload;
        },
        [GET_MEMBER_NUMBER]: (state, { payload }) => {
            
            return payload;
        },
        [POST_FIND_PASSWORD]: (state, { payload }) => {
            
            return payload;
        },

    },
    initialState
);

export default memberReducer;