import { GET_NOTICES } from '../modules/NoticeModule';

export const callNoticeAPI = ({currentPage, category = 'All'}) => {

    const categoryQuery = category ? `&noticeCategory=${category}` : '';
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/board/notice?page=${currentPage}${categoryQuery}`;
    
    console.log("Requesting URL:", requestURL);
    
    return async (dispatch) => {

        try{
                const response  = await fetch(requestURL, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "*/*" 
                    }
                });
                
                const result = await response.json();
                console.log('API 응답 : ', result);

            if (response.ok) {
                console.log('[callNoticeAPI] RESULT : ', result);
                dispatch({ type: GET_NOTICES, payload: result.data });
            } else {
                console.error('Error fetching notices : ', result.error);
            }
        } catch (error) {
            console.error('Error fetching notices : ', error);
        }
    };
};
