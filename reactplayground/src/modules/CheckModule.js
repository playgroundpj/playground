import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_MEMBER_NICKNAME     = 'member/GET_MEMBER_NICKNAME';
export const GET_STORE_LIST_ALL     = 'member/GET_STORE_LIST_ALL';


const actions = createActions({
    [GET_MEMBER_NICKNAME]: () => {},
});

/* 리듀서 */
const checkReducer = handleActions(
    {
        [GET_MEMBER_NICKNAME]: (state, { payload }) => {
            
            return payload;
        },
        [GET_STORE_LIST_ALL]: (state, { payload }) => {
            
            return payload;
        },

    },
    initialState
);

export default checkReducer;