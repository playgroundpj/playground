import { createActions, handleActions } from 'redux-actions'; // redux-actions 라이브러리에서 필요한 함수들을 임포트합니다.

/* 초기값 */
const initialState = {
    data: [],
    pageInfo: {}
};

/* 액션 */
// 액션 타입을 정의합니다.
export const GET_NOTICE = 'notice/GET_NOTICE';
export const GET_NOTICES = 'notice/GET_NOTICES';
export const POST_NOTICE = 'notice/POST_NOTICE';
export const PUT_NOTICE = 'notice/PUT_NOTICE';
export const DELETE_NOTICE = 'notice/DELETE_NOTICE';

// 액션을 생성합니다.
export const { getNotice, getNotices, postNotice, putNotice, updateNotice, deleteNotice } = createActions({
    [GET_NOTICE]: (payload) => payload,
    [GET_NOTICES]: (payload) => payload,
    [POST_NOTICE]: (payload) => payload,
    [PUT_NOTICE]: (payload) => payload,
    [DELETE_NOTICE]: (payload) => payload
});

/* 리듀서 */
// 리듀서를 정의합니다. 액션 타입에 따라 상태를 업데이트합니다.
const noticeReducer = handleActions(
    {
        [GET_NOTICE]: (state, { payload }) => {
            return { ...state, noticeDetail: payload };
        },
        [GET_NOTICES]: (state, { payload }) => {
            console.log('리듀서의 payload : ', payload);
            return { ...state, data: payload.data, pageInfo: payload.pageInfo };
        },
        [POST_NOTICE]: (state, { payload }) => {
            return { ...state, data: [payload, ...state.data] };
        },
        [PUT_NOTICE]: (state, { payload }) => {
            return {
                ...state,
                data: state.data.map(notice =>
                    notice.noticeCode === payload.noticeCode ? payload : notice
                )
            };
        },      
        [DELETE_NOTICE]: (state, { payload }) => {
            return {
                ...state,
                data: state.data.filter(notice => notice.noticeCode !== payload)
            };
        }
    },
    initialState // 초기 상태를 설정합니다.
);

export default noticeReducer; // noticeReducer를 기본 익스포트합니다.
