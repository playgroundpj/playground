import { DELETE_BOARDGAME, GET_BOARDGAME, GET_BOARDGAME_LIST, POST_REGISTER, PUT_BOARDGAME } from "../modules/BoardgameModule";
import { GET_STORE_LIST_ALL } from "../modules/CheckModule";
import { DELETE_NOTICE } from "../modules/NoticeModule";

export const callGetBoardgameListAPI = ({ currentPage }) => {
    let requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/boardgame`;

    if (currentPage !== undefined && currentPage !== null) {
        requestURL += `?offset=${currentPage}`;
    }

    return async (dispatch, getState) => {
        try {
            const response = await fetch(requestURL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                }
            });

            const result = await response.json();
            console.log('[BoardgameAPICalls] callGetBoardgameListAPI RESULT : ', result);
            dispatch({ type: GET_BOARDGAME_LIST, payload: result.data });
        } catch (error) {
            console.error('[BoardgameAPICalls] callGetBoardgameListAPI ERROR : ', error.message);
        }
    };
}

export const callGetBoardgameListAllAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/boardgame/all`;

    return async (dispatch, getState) => {
        try {
            const response = await fetch(requestURL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                }
            });

            const result = await response.json();
            console.log('[BoardgameAPICalls] callGetBoardgameListAllAPI RESULT : ', result);
            dispatch({ type: GET_STORE_LIST_ALL, payload: result.data });
        } catch (error) {
            console.error('[BoardgameAPICalls] callGetBoardgameListAllAPI ERROR : ', error.message);
        }
    };
}

export const callGetBoardgameAPI = ({ boardgameCode }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/boardgame/${boardgameCode}`;

    return async (dispatch, getState) => {
        try {
            const response = await fetch(requestURL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*"
                }
            });

            const result = await response.json();
            console.log('[BoardgameAPICalls] callGetBoardgameAPI RESULT : ', result);
            dispatch({ type: GET_BOARDGAME, payload: result });
        } catch (error) {
            console.error('[BoardgameAPICalls] callGetBoardgameAPI ERROR : ', error.message);
        }
    };
}

export const callGetBoardgameByNameAPI = ({ boardgameName }) => {
    const encodedBoardgameName = encodeURIComponent(boardgameName);
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/boardgame/boardgameName/${encodedBoardgameName}`;

    return async (dispatch, getState) => {
        try {
            const response = await fetch(requestURL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*"
                }
            });

            const result = response.ok ? await response.json() : { message: '사용 가능한 게임명입니다' };
            console.log('[BoardgameAPICalls] callGetBoardgameByNameAPI RESULT : ', result);
            dispatch({ type: GET_BOARDGAME, payload: result });
        } catch (error) {
            console.error('[BoardgameAPICalls] callGetBoardgameByNameAPI ERROR : ', error.message);
        }
    };
}


export const callGetBoardgameByCodeAPIWithoutUrl = ({ boardgameCode }) => {
    const encodedBoardgameCodeWithoutUrl = encodeURIComponent(boardgameCode);
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/boardgame/boardgameCodeWithouUrl/${encodedBoardgameCodeWithoutUrl}`;

    return async (dispatch, getState) => {
        try {
            const response = await fetch(requestURL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*"
                }
            });

            const result = response.ok ? await response.json() : { message: '사용 가능한 게임명입니다' };
            console.log('[BoardgameAPICalls] callGetBoardgameByNameAPIWithoutUrl RESULT : ', result);
            dispatch({ type: GET_BOARDGAME, payload: result });
        } catch (error) {
            console.error('[BoardgameAPICalls] callGetBoardgameByNameAPIWithoutUrl ERROR : ', error.message);
        }
    };
}


export const callRegistBoardgameAPI = ({ form }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/boardgame/regist`;

    return async (dispatch, getState) => {
        try {
            const response = await fetch(requestURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*"
                },
                body: JSON.stringify(form)
            });

            const result = await response.json();
            console.log('[BoardgameAPICalls] callRegistBoardgameAPI RESULT : ', result);
            dispatch({ type: POST_REGISTER, payload: result });
        } catch (error) {
            console.error('[BoardgameAPICalls] callRegistBoardgameAPI ERROR : ', error.message);
        }
    };
}

export const callUpdateBoardgameAPI = ({ form }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/boardgame/modify`;

    return async (dispatch, getState) => {
        try {
            const token = window.localStorage.getItem("accessToken");
            if (!token) {
                throw new Error('No token found');
            }

            const response = await fetch(requestURL, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(form)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Error ${response.status}: ${errorData.message}`);
            }

            const responseData = await response.json();
            console.log('[BoardgameAPICalls] callUpdateBoardgameAPI SUCCESS : ', responseData);
            dispatch({ type: PUT_BOARDGAME, payload: responseData });
        } catch (error) {
            console.error('[BoardgameAPICalls] callUpdateBoardgameAPI ERROR : ', error.message);
        }
    };
}

export const callDeleteBoardgameAPI = ({ boardgameCode }) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/boardgame/${boardgameCode}`;

    return async (dispatch, getState) => {
        try {
            const response = await fetch(requestURL, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete boardgame');
            }

            const result = await response.json();
            console.log('[BoardgameAPICalls] callDeleteBoardgameAPI RESULT : ', result);
            dispatch({ type: DELETE_NOTICE, payload: boardgameCode });
        } catch (error) {
            console.error('[BoardgameAPICalls] callDeleteBoardgameAPI ERROR : ', error.message);
        }
    };
}
