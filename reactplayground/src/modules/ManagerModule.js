import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_MANAGER     = 'member/GET_MANAGER';
export const POST_MANAGER     = 'member/POST_MANAGER';
export const PUT_MANAGER     = 'member/PUT_MANAGER';
export const DELETE_MEANAGER     = 'member/DELETE_MEMBER';


const actions = createActions({
    [GET_MANAGER]: () => {},
    [POST_MANAGER]: () => {},
    [PUT_MANAGER]: () => {},
    [DELETE_MEANAGER]: () => {},
});

/* 리듀서 */
const managerReducer = handleActions(
    {
        [GET_MANAGER]: (state, { payload }) => {
            
            return payload;
        },
        [POST_MANAGER]: (state, { payload }) => {
            
            return payload;
        },
        [PUT_MANAGER]: (state, { payload }) => {
            
            return payload;
        },
        [DELETE_MEANAGER]: (state, { payload }) => {
            
            return payload;
        },

    },
    initialState
);

export default managerReducer;