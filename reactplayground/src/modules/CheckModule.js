import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_MEMBER_NICKNAME     = 'member/GET_MEMBER_NICKNAME';


const actions = createActions({
    [GET_MEMBER_NICKNAME]: () => {},
});

/* 리듀서 */
const checkReducer = handleActions(
    {
        [GET_MEMBER_NICKNAME]: (state, { payload }) => {
            
            return payload;
        },

    },
    initialState
);

export default checkReducer;