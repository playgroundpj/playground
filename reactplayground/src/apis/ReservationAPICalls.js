import { GET_RESERVATION_LIST_ALL } from "../modules/CheckModule";
import { DELETE_RESERVATION, GET_RESERVATION, GET_RESERVATION_LIST, POST_REGISTER, PUT_RESERVATION } from "../modules/ReservationModule";

export const callGetreservationListAPI = () => {

    const   requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/reservation`;
    
    console.log('[reservationAPICalls] requestURL : ', requestURL);


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

        console.log('[reservationAPICalls] callGetreservationListAPI RESULT : ', result);
        dispatch({ type: GET_RESERVATION_LIST,  payload: result.data });
    };
}


export const callGetreservationAPI = ({reservationCode}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/reservation/${reservationCode}`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken") 

            },
            })
            .then(response => response.json());
            
            console.log('[reservationAPICalls] callGetreservationAPI RESULT : ', result);

            dispatch({ type: GET_RESERVATION,  payload: result });
            
    
    };
}

export const callGetReservationByMemberCodeAPI = ({memberCode}) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/reservation/member/${memberCode}`;

    console.log('[reservationAPICalls] requestURL : ', requestURL);

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*",
                "Authorization": "Bearer " + window.localStorage.getItem("accessToken") 

            },
            })
            .then(response => response.json());

            console.log('[reservationAPICalls] callGetreservationAPI RESULT : ', result);

            dispatch({ type: GET_RESERVATION,  payload: result });

    };
}

