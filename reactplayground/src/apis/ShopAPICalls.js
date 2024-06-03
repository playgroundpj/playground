import { GET_SHOP, GET_SHOP_LIST } from "../modules/ShopModule";

export const callGetShopListAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/auth/shop`;

    return async (dispatch, getState) => {

        const response = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
            }
        });

        let result;

        if (response.ok) {
            result = await response.json();
        } else {
            result = { message: '에러 발생!' };
        }

        console.log('[ShopAPICalls] callGetShopListAPI RESULT : ', result);

        dispatch({ type: GET_SHOP_LIST, payload: result });

    }
}


export const callGetShopAPI = ({storeCode}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/auth/shop/${storeCode}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            })
            .then(response => response.json());
            
            console.log('[ShopAPICalls] callGetShopAPI RESULT : ', result);

            dispatch({ type: GET_SHOP,  payload: result });
            
    
    };
}

