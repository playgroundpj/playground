import axios from 'axios';
import { GET_REVIEWS, POST_REVIEW } from '../modules/ReviewModule';

// 리뷰 목록 조회
export const callReviewAPI = ({ currentPage, category = 'All' }) => {
    const categoryQuery = category ? `&storeName=${category}` : '';
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/board/review?page=${currentPage}${categoryQuery}`;

    console.log("Requesting URL:", requestURL);

    return async (dispatch) => {
        try {
            const response = await axios.get(requestURL);
            console.log('API 응답 : ', response.data);

            if (response.status === 200) {
                console.log('[callReviewAPI] RESULT : ', response.data);
                dispatch({ type: GET_REVIEWS, payload: response.data });
            } else {
                console.error('Error fetching reviews : ', response.error);
            }
        } catch (error) {
            console.error('Error fetching reviews : ', error);
        }
    };
};

// 리뷰 등록 (회원로그인)
export const createReviewAPI = (reviewData) => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/v1/board/review`;

    return async (dispatch) => {
        try {
            const response = await axios.post(requestURL, reviewData);
            console.log('API 응답 : ', response.data);

            if (response.status === 201) {
                console.log('[createReviewAPI] RESULT : ', response.data);
                dispatch({ type: POST_REVIEW, payload: response.data });
            } else {
                console.error('Error creating review : ', response.error);
            }
        } catch (error) {
            console.error('Error creating review : ', error);
        }
    };
};
