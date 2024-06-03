import { createActions, handleActions } from 'redux-actions'; // redux-actions 라이브러리에서 필요한 함수들을 임포트합니다.

/* 초기값 */
const initialState = {
    data: [],
    pageInfo: {}
};

/* 액션 */
// 액션 타입을 정의합니다.
export const GET_REVIEW     = 'review/GET_REVIEW';
export const GET_REVIEWS    = 'review/GET_REVIEWS';
export const POST_REVIEW    = 'review/POST_REVIEW';
export const UPDATE_REVIEW  = 'review/UPDATE_REVIEW';
export const DELETE_REVIEW  = 'review/DELETE_REVIEW';

// 액션을 생성합니다.
export const { getReview, getReviews, postReview, updateReview, deleteReview } = createActions({
    [GET_REVIEW]: () => {},  // GET_REVIEW 액션 생성자
    [GET_REVIEWS]: (payload) => payload, // GET_REVIEWS 액션 생성자
    [POST_REVIEW]: (payload) => payload, // POST_REVIEW 액션 생성자
    [UPDATE_REVIEW]: (payload) => payload, // UPDATE_REVIEW 액션 생성자
    [DELETE_REVIEW]: (payload) => payload  // DELETE_REVIEW 액션 생성자
});

/* 리듀서 */
// 리듀서를 정의합니다. 액션 타입에 따라 상태를 업데이트합니다.
const reviewReducer = handleActions(
    {
        [GET_REVIEW]: (state, { payload }) => {
            return { ...state, data : payload };
        },
        [GET_REVIEWS]: (state, { payload }) => {
            console.log('리듀서의 payload : ', payload);
            return { ...state, data : payload.data, pageInfo : payload.pageInfo };
        },
        [POST_REVIEW]: (state, { payload }) => {
            return { ...state, data : [payload, ...state.data] };
        },
        [UPDATE_REVIEW]: (state, { payload }) => {
            return { 
                ...state, 
                data: state.data.map(Review => 
                    Review.ReviewCode === payload.ReviewCode ? payload : Review
                )
            };
        },
        [DELETE_REVIEW]: (state, { payload }) => {
            return { 
                ...state, 
                data: state.data.filter(Review => Review.ReviewCode !== payload)
            };
        }
    },
    initialState // 초기 상태를 설정합니다.
);

export default reviewReducer; // ReviewReducer를 기본 익스포트합니다.
