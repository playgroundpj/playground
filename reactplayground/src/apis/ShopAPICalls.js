import { GET_SHOP, GET_SHOP_LIST } from "../modules/ShopModule";

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

