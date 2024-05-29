import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = {
    isLoading: false,
};

/* 액션 */
export const START_LOADING = 'loading/START_LOADING';
export const STOP_LOADING = 'loading/STOP_LOADING';

const actions = createActions({
    [START_LOADING]: () => {},
    [STOP_LOADING]: () => {}
});

/* 리듀서 */
const loadingReducer = handleActions(
    {
        [START_LOADING]: (state) => ({
            ...state,
            isLoading: true
        }),
        [STOP_LOADING]: (state) => ({
            ...state,
            isLoading: false
        })
    },
    initialState
);

export default loadingReducer;
