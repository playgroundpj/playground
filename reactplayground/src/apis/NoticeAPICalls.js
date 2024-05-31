import { GET_NOTICES, POST_NOTICE } from '../modules/NoticeModule';
import axios from 'axios'
import { createAction } from 'redux-actions';

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
export const createNoticeAPI = (formData) => async (dispatch) => {
    try {
        const response = await axios.post('/api/v1/board/notice', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        dispatch(createAction(POST_NOTICE)(response.data));
    } catch (error) {
        console.error('Error creating notice:', error);
    }
};