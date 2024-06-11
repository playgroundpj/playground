import { GET_NOTICES, POST_NOTICE, DELETE_NOTICE, GET_NOTICE, PUT_NOTICE } from '../modules/NoticeModule';

// 게시글 목록 조회
export const callNoticeAPI = ({ currentPage, category = 'All' }) => {

    const categoryQuery = category ? `&noticeCategory=${category}` : '';

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/board/notice?page=${currentPage}${categoryQuery}`;

    return async (dispatch) => {
        try {
            const response = await fetch(requestURL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*"
                }
            });
            const result = await response.json();
            if (response.ok) {
                dispatch({ type: GET_NOTICES, payload: result.data });
            } else {
                console.error('Error fetching notices : ', result.error);
            }
        } catch (error) {
            console.error('Error fetching notices : ', error);
        }
    };
};

// 게시글 등록 (관리자로그인)
export const createNoticeAPI = (noticeData) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/board/notice`;
    return async (dispatch) => {
        try {
            const response = await fetch(requestURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*"
                },
                body: JSON.stringify(noticeData)
            });
            const result = await response.json();
            if (response.ok) {
                dispatch({ type: POST_NOTICE, payload: result });
                return result; // 등록 후 결과 반환
            } else {
                console.error('Error creating notice : ', result.error);
            }
        } catch (error) {
            console.error('Error creating notice : ', error);
        }
    };
};

// 게시글 수정 (관리자로그인)
export const updateNoticeAPI = ({form}) => {

    console.log('[NoticeAPICalls] updateNoticeAPI Call');
    
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/board/notice/modify`;

    return async (dispatch) => {

        const result = await fetch(requestURL, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "*/*"
            },
            body: JSON.stringify({
                noticeTitle: form.noticeTitle,
                noticeCode: form.noticeCode,
                noticeContent: form.noticeContent
            })
        }).then(response => response.json());

        console.log('[updateNoticeAPI] updateNoticeAPI RESULT : ', result);

        dispatch({ type: PUT_NOTICE, payload: result});

    }
    
}



// 게시글 삭제
export const deleteNoticeAPI = ({noticeCode}) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/board/notice/${noticeCode}`;

    return async (dispatch) => {
        try {
            const response = await fetch(requestURL, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Authorization": "Bearer " + window.localStorage.getItem("accessToken")
                }
            });

            if (response.ok) {
                console.log('[deleteNoticeAPI] SUCCESS');
                dispatch({ type: DELETE_NOTICE, payload: noticeCode });
                dispatch(callNoticeAPI({ currentPage: 1, category: 'All' }));
            } else {
                const result = await response.json();
                console.error('Error deleting notice : ', result.error);
            }
        } catch (error) {
            console.error('Error deleting notice : ', error);
        }
    };
};




// 게시글 상세 조회
export const callNoticeDetailAPI = (noticeCode) => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/board/notice/${noticeCode}`;

    console.log("Requesting URL:", requestURL);

    return async (dispatch) => {
        try {
            const response = await fetch(requestURL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*"
                }
            });

            const result = await response.json();
            console.log('API 응답 : ', result);

            if (response.ok) {
                console.log('[callNoticeDetailAPI] RESULT : ', result);
                dispatch({ type: GET_NOTICE, payload: result.data });
            } else {
                console.error('Error fetching notice detail : ', result.error);
            }
        } catch (error) {
            console.error('Error fetching notice detail : ', error);
        }
    };
};

