import { GET_GAMETABLE } from "../modules/ShopModule";
import { GET_STORE_BOARDGAME, GET_STORE_GAMETABLE, GET_STORE_MENU, GET_STORE_RESERVATION } from "../modules/StoreModule";

export const callGetGameTableListAPI = () => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/gametable`;
    
    console.log('[StoreAPICalls] requestURL : ', requestURL);


    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken") 

            }
        })
        .then(response => response.json());

        console.log('[StoreAPICalls] callGetGameTableListAPI RESULT : ', result);

        dispatch({ type: GET_GAMETABLE,  payload: result.data });
    };
}


export const callGetStoreBoardGameListAPI = ({storeCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/storeBoardgame/${storeCode}`;
    
    console.log('[StoreAPICalls] requestURL : ', requestURL);


    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken") 

            }
        })
        .then(response => response.json());

        console.log('[StoreAPICalls] callGetStoreBoardGameListAPI RESULT : ', result);

        dispatch({ type: GET_STORE_BOARDGAME,  payload: result.data });
    };
}


export const callGetStoreGameTableListAPI = ({storeCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/storeGametable/${storeCode}`;
    
    console.log('[StoreAPICalls] requestURL : ', requestURL);


    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken") 

            }
        })
        .then(response => response.json());

        console.log('[StoreAPICalls] callGetStoreGameTableListAPI RESULT : ', result);

        dispatch({ type: GET_STORE_GAMETABLE,  payload: result.data });
    };
}

export const callGetStoreMenuListAPI = ({storeCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/storeMenu/${storeCode}`;
    
    console.log('[StoreAPICalls] requestURL : ', requestURL);


    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken") 

            }
        })
        .then(response => response.json());

        console.log('[StoreAPICalls] callGetStoreMenuListAPI RESULT : ', result);

        dispatch({ type: GET_STORE_MENU,  payload: result.data });
    };
}

export const callGetStoreReservationListAPI = ({storeCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/storeReservation/${storeCode}`;
    
    console.log('[StoreAPICalls] requestURL : ', requestURL);


    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken") 

            }
        })
        .then(response => response.json());

        console.log('[StoreAPICalls] callGetStoreReservationListAPI RESULT : ', result);

        dispatch({ type: GET_STORE_RESERVATION,  payload: result.data });
    };
}