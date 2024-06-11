import { GET_STORE_LIST_ALL } from "../modules/CheckModule";
import { DELETE_MENU, GET_MENU, GET_MENU_LIST, POST_REGISTER, PUT_MENU } from "../modules/MenuModule";


export const callGetMenuListAPI = ({currentPage}) => {
    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/menu?offset=${currentPage}`;
    }else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/menu`;
    }
    
    console.log('[MenuAPICalls] requestURL : ', requestURL);


    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
            }
        })
        .then(response => response.json());

        console.log('[MenuAPICalls] callGetMenuListAPI RESULT : ', result);
        dispatch({ type: GET_MENU_LIST,  payload: result.data });
    };
}

export const callGetMenuListAllAPI = () => {


    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/menu/all`;

    console.log('[MenuAPICalls] requestURL : ', requestURL);


    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
            }
        })
        .then(response => response.json());
        
        console.log('[MenuAPICalls] callGetMenuListAllAPI RESULT : ', result);
        dispatch({ type: GET_STORE_LIST_ALL,  payload: result.data });
    };
}


export const callGetMenuAPI = ({menuCode}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/menu/${menuCode}`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            })
            .then(response => response.json());
            
            console.log('[MenuAPICalls] callGetMenuAPI RESULT : ', result);

            dispatch({ type: GET_MENU,  payload: result });
            
    
    };
}

export const callGetMenuByStoreNameAPI = ({menuName}) => {
    const encodedStorename = encodeURIComponent(menuName)
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/menu/menuName/${encodedStorename}`;

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
                    result = { message: '사용 가능한 메뉴명입니다' };
                }
                
                console.log('[MenuAPICalls] callGetMenuAPI RESULT : ', result);
    
                dispatch({ type: GET_MENU,  payload: result });

        }catch (error){
            console.error('API call failed: ', error);
        }

            
    
    };
}

export const callRegistMenuAPI = ({form}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/menu/regist`;


    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify({
                menuName: form.menuName,
                menuLocation: form.menuLocation,
                openTime: form.openTime,
                closeTime: form.closeTime,
                closedDay: form.closedDay
            })
        }).then(response => response.json());

        console.log('[MenuAPICalls] callRegistMenuAPI RESULT : ', result);

        dispatch({ type: POST_REGISTER, payload: result});

    }
    
}

export const callUpdateMenuAPI = ({form}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/menu/modify`;


    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify({
                menuCode: form.menuCode,
                menuName: form.menuName,
                menuLocation: form.menuLocation,
                openTime: form.openTime,
                closeTime: form.closeTime,
                closedDay: form.closedDay
            })
        }).then(response => response.json());

        console.log('[MenuAPICalls] callUpdateMenuAPI RESULT : ', result);

        dispatch({ type: PUT_MENU, payload: result});

    }
    
}

export const callDeleteMenuAPI = ({menuName}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/menu/delete`;


    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify({
                menuName: menuName
            })
        }).then(response => response.json());

        console.log('[MenuAPICalls] callDeleteMenuAPI RESULT : ', result);

        dispatch({ type: DELETE_MENU, payload: result});

    }
    
}


