import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = [];

/* 액션 */
export const GET_BOARDGAME     = 'boardgame/GET_BOARDGAME';
export const POST_REGISTER  = 'boardgame/POST_REGISTER';
export const GET_BOARDGAME_ID     = 'auth/GET_BOARDGAME';
export const PUT_BOARDGAME     = 'boardgame/PUT_BOARDGAME';
export const DELETE_BOARDGAME     = 'boardgame/DELETE_BOARDGAME';
export const GET_BOARDGAME_LIST     = 'boardgame/GET_BOARDGAME_LIST';


const actions = createActions({
    [GET_BOARDGAME]: () => {},
    [POST_REGISTER]: () => {},
    [GET_BOARDGAME_ID]: () => {},
    [PUT_BOARDGAME]: () => {},
    [DELETE_BOARDGAME]: () => {},
    [GET_BOARDGAME_LIST]: () => {},
});

/* 리듀서 */
const boardgameReducer = handleActions(
    {
        [GET_BOARDGAME]: (state, { payload }) => {
            
            return payload;
        },
        [POST_REGISTER]: (state, { payload }) => {
            
            return payload;
        },
        [GET_BOARDGAME_ID]: (state, { payload }) => {
            
            return payload;
        },
        [PUT_BOARDGAME]: (state, { payload }) => {
            
            return payload;
        },
        [DELETE_BOARDGAME]: (state, { payload }) => {
            
            return payload;
        },
        [GET_BOARDGAME_LIST]: (state, { payload }) => {
            
            return payload;
        },

    },
    initialState
);

export default boardgameReducer;