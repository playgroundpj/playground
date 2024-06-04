import { DELETE_SHOP, GET_SHOP, GET_SHOP_LIST, POST_REGISTER, PUT_SHOP } from "../modules/ShopModule";

export const callGetShopListAPI = ({currentPage}) => {

    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/shop?offset=${currentPage}`;
    }else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/shop`;
    }
    
    console.log('[ShopAPICalls] requestURL : ', requestURL);


    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
            }
        })
        .then(response => response.json());
        if(result.status === 200){
            console.log('[ProduceAPICalls] callProductAPI RESULT : ', result);
            dispatch({ type: GET_SHOP_LIST,  payload: result.data });
        } 
    };
}


export const callGetShopAPI = ({storeCode}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/shop/${storeCode}`;

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

export const callGetShopByStoreNameAPI = ({storeName}) => {
    const encodedStorename = encodeURIComponent(storeName)
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/shop/shopName/${encodedStorename}`;

    return async (dispatch, getState) => {

        try{
            const response = await fetch(requestURL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*"
                },
                });

                let result;

                if (response.ok) {
                    result = await response.json();
                } else {
                    result = { message: '사용 가능한 매장명입니다' };
                }
                
                console.log('[ShopAPICalls] callGetShopAPI RESULT : ', result);
    
                dispatch({ type: GET_SHOP,  payload: result });

        }catch (error){
            console.error('API call failed: ', error);
        }

            
    
    };
}

export const callRegistShopAPI = ({form}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/shop/regist`;


    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify({
                storeName: form.storeName,
                storeLocation: form.storeLocation,
                openTime: form.openTime,
                closeTime: form.closeTime,
                closedDay: form.closedDay
            })
        }).then(response => response.json());

        console.log('[ShopAPICalls] callRegistShopAPI RESULT : ', result);

        dispatch({ type: POST_REGISTER, payload: result});

    }
    
}

export const callUpdateShopAPI = ({form}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/shop/modify`;


    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify({
                storeCode: form.storeCode,
                storeName: form.storeName,
                storeLocation: form.storeLocation,
                openTime: form.openTime,
                closeTime: form.closeTime,
                closedDay: form.closedDay
            })
        }).then(response => response.json());

        console.log('[ShopAPICalls] callUpdateShopAPI RESULT : ', result);

        dispatch({ type: PUT_SHOP, payload: result});

    }
    
}

export const callDeleteShopAPI = ({form}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/shop/delete`;


    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: form
        }).then(response => response.json());

        console.log('[ShopAPICalls] callDeleteShopAPI RESULT : ', result);

        dispatch({ type: DELETE_SHOP, payload: result});

    }
    
}


