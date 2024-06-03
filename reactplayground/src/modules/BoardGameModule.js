import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = {
    boardGames: [],
    boardGame: null,
};

/* 액션 */
export const GET_BOARDGAMES = 'boardGame/GET_BOARDGAMES';
export const GET_BOARDGAME = 'boardGame/GET_BOARDGAME';
export const ADD_BOARDGAME = 'boardGame/ADD_BOARDGAME';
export const UPDATE_BOARDGAME = 'boardGame/UPDATE_BOARDGAME';
export const DELETE_BOARDGAME = 'boardGame/DELETE_BOARDGAME';

const actions = createActions({
    [GET_BOARDGAMES]: () => {},
    [GET_BOARDGAME]: () => {},
    [ADD_BOARDGAME]: () => {},
    [UPDATE_BOARDGAME]: () => {},
    [DELETE_BOARDGAME]: () => {},
});

/* 리듀서 */
const boardGameReducer = handleActions(
    {
        [GET_BOARDGAMES]: (state, { payload }) => ({
            ...state,
            boardGames: payload,
        }),
        [GET_BOARDGAME]: (state, { payload }) => ({
            ...state,
            boardGame: payload,
        }),
        [ADD_BOARDGAME]: (state, { payload }) => ({
            ...state,
            boardGames: [...state.boardGames, payload],
        }),
        [UPDATE_BOARDGAME]: (state, { payload }) => ({
            ...state,
            boardGames: state.boardGames.map(game =>
                game.id === payload.id ? payload : game
            ),
        }),
        [DELETE_BOARDGAME]: (state, { payload }) => ({
            ...state,
            boardGames: state.boardGames.filter(game => game.id !== payload),
        }),
    },
    initialState
);

export default boardGameReducer;
