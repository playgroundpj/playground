import { GET_NOTICES, POST_NOTICE, UPDATE_NOTICE, DELETE_NOTICE } from '../modules/NoticeModule';

// 게시글 목록 조회
export const callNoticeAPI = ({ currentPage, category = 'All' }) => {

    const categoryQuery = category ? `&noticeCategory=${category}` : '';

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/board/notice?page=${currentPage}${categoryQuery}`;

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
            console.log('API 응답 : ', result);

            if (response.ok) {
                console.log('[createNoticeAPI] RESULT : ', result);
                dispatch({ type: POST_NOTICE, payload: result });
            } else {
                console.error('Error creating notice : ', result.error);
            }
        } catch (error) {
            console.error('Error creating notice : ', error);
        }
    };
};

// 게시글 수정
export const updateNoticeAPI = (noticeCode, noticeData) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/board/notice/${noticeCode}`;

    return async (dispatch) => {
        try {
            const response = await fetch(requestURL, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*"
                },
                body: JSON.stringify(noticeData)
            });

            const result = await response.json();
            console.log('API 응답 : ', result);

            if (response.ok) {
                console.log('[updateNoticeAPI] RESULT : ', result);
                dispatch({ type: UPDATE_NOTICE, payload: result });
            } else {
                console.error('Error updating notice : ', result.error);
            }
        } catch (error) {
            console.error('Error updating notice : ', error);
        }
    };
};

// 게시글 삭제
export const deleteNoticeAPI = (noticeCode) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/board/notice/${noticeCode}`;

    return async (dispatch) => {
        try {
            const response = await fetch(requestURL, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*"
                }
            });

            if (response.ok) {
                console.log('[deleteNoticeAPI] SUCCESS');
                dispatch({ type: DELETE_NOTICE, payload: noticeCode });
            } else {
                const result = await response.json();
                console.error('Error deleting notice : ', result.error);
            }
        } catch (error) {
            console.error('Error deleting notice : ', error);
        }
    };
};