import { GET_BOARDGAMES, GET_BOARDGAME, ADD_BOARDGAME, UPDATE_BOARDGAME, DELETE_BOARDGAME } from '../modules/BoardGameModule';
import { startLoading, stopLoading } from './../components/common/actions';

const API_BASE_URL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/boardgames`;

export const callGetBoardGamesAPI = () => {
    return async (dispatch) => {
        dispatch(startLoading());
        try {
            const response = await fetch(API_BASE_URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*"
                }
            });
            const result = await response.json();
            console.log('[BoardGameAPICalls] callGetBoardGamesAPI RESULT : ', result);
            dispatch({ type: GET_BOARDGAMES, payload: result });
        } catch (error) {
            console.error('API call failed:', error);
        } finally {
            dispatch(stopLoading());
        }
    };
};

export const callGetBoardGameAPI = (id) => {
    return async (dispatch) => {
        dispatch(startLoading());
        try {
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*"
                }
            });
            const result = await response.json();
            console.log('[BoardGameAPICalls] callGetBoardGameAPI RESULT : ', result);
            dispatch({ type: GET_BOARDGAME, payload: result });
        } catch (error) {
            console.error('API call failed:', error);
        } finally {
            dispatch(stopLoading());
        }
    };
};

export const callAddBoardGameAPI = (form) => {
    return async (dispatch) => {
        dispatch(startLoading());
        try {
            const response = await fetch(API_BASE_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*"
                },
                body: JSON.stringify(form)
            });
            const result = await response.json();
            console.log('[BoardGameAPICalls] callAddBoardGameAPI RESULT : ', result);
            dispatch({ type: ADD_BOARDGAME, payload: result });
        } catch (error) {
            console.error('API call failed:', error);
        } finally {
            dispatch(stopLoading());
        }
    };
};

export const callUpdateBoardGameAPI = (id, form) => {
    return async (dispatch) => {
        dispatch(startLoading());
        try {
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*"
                },
                body: JSON.stringify(form)
            });
            const result = await response.json();
            console.log('[BoardGameAPICalls] callUpdateBoardGameAPI RESULT : ', result);
            dispatch({ type: UPDATE_BOARDGAME, payload: result });
        } catch (error) {
            console.error('API call failed:', error);
        } finally {
            dispatch(stopLoading());
        }
    };
};

export const callDeleteBoardGameAPI = (id) => {
    return async (dispatch) => {
        dispatch(startLoading());
        try {
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*"
                }
            });
            const result = await response.json();
            console.log('[BoardGameAPICalls] callDeleteBoardGameAPI RESULT : ', result);
            dispatch({ type: DELETE_BOARDGAME, payload: id });
        } catch (error) {
            console.error('API call failed:', error);
        } finally {
            dispatch(stopLoading());
        }
    };
};
