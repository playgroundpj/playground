import { GET_STORE_LIST_ALL } from "../modules/CheckModule";
import { DELETE_BOARDGAME, GET_BOARDGAME, GET_BOARDGAME_LIST, POST_REGISTER, PUT_BOARDGAME } from "../modules/BoardgameModule";

export const callGetBoardgameListAPI = ({currentPage}) => {

    let requestURL;

    if(currentPage !== undefined || currentPage !== null){
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/boardgame?offset=${currentPage}`;
    }else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/boardgame`;
    }
    
    console.log('[BoardgameAPICalls] requestURL : ', requestURL);


    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
            }
        })
        .then(response => response.json());

        console.log('[BoardgameAPICalls] callGetBoardgameListAPI RESULT : ', result);
        dispatch({ type: GET_BOARDGAME_LIST,  payload: result.data });
    };
}

export const callGetBoardgameListAllAPI = () => {


    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/boardgame/all`;

    console.log('[BoardgameAPICalls] requestURL : ', requestURL);


    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
            }
        })
        .then(response => response.json());
        
        console.log('[BoardgameAPICalls] callGetBoardgameListAllAPI RESULT : ', result);
        dispatch({ type: GET_STORE_LIST_ALL,  payload: result.data });
    };
}


export const callGetBoardgameAPI = ({boardgameCode}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/boardgame/${boardgameCode}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            })
            .then(response => response.json());
            
            console.log('[BoardgameAPICalls] callGetBoardgameAPI RESULT : ', result);

            dispatch({ type: GET_BOARDGAME,  payload: result });
            
    
    };
}

export const callGetBoardgameByStoreNameAPI = ({boardgameName}) => {
    const encodedStorename = encodeURIComponent(boardgameName)
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/boardgame/boardgameName/${encodedStorename}`;

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
                
                console.log('[BoardgameAPICalls] callGetBoardgameAPI RESULT : ', result);
    
                dispatch({ type: GET_BOARDGAME,  payload: result });

        }catch (error){
            console.error('API call failed: ', error);
        }

            
    
    };
}

export const callRegistBoardgameAPI = ({form}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/boardgame/regist`;


    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify({
                boardgameName: form.boardgameName,
                boardgameLocation: form.boardgameLocation,
                openTime: form.openTime,
                closeTime: form.closeTime,
                closedDay: form.closedDay
            })
        }).then(response => response.json());

        console.log('[BoardgameAPICalls] callRegistBoardgameAPI RESULT : ', result);

        dispatch({ type: POST_REGISTER, payload: result});

    }
    
}

export const callUpdateBoardgameAPI = ({form}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/boardgame/modify`;


    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify({
                boardgameCode: form.boardgameCode,
                boardgameName: form.boardgameName,
                boardgameLocation: form.boardgameLocation,
                openTime: form.openTime,
                closeTime: form.closeTime,
                closedDay: form.closedDay
            })
        }).then(response => response.json());

        console.log('[BoardgameAPICalls] callUpdateBoardgameAPI RESULT : ', result);

        dispatch({ type: PUT_BOARDGAME, payload: result});

    }
    
}

export const callDeleteBoardgameAPI = ({boardgameName}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/boardgame/delete`;


    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify({
                boardgameName: boardgameName
            })
        }).then(response => response.json());

        console.log('[BoardgameAPICalls] callDeleteBoardgameAPI RESULT : ', result);

        dispatch({ type: DELETE_BOARDGAME, payload: result});

    }
    
}


