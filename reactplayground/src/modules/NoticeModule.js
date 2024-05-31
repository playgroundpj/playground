import { createActions, handleActions } from 'redux-actions'; // redux-actions 라이브러리에서 필요한 함수들을 임포트합니다.

/* 초기값 */
const initialState = {
    data: [],
    pageInfo: {}
};
/* 액션 */
// 액션 타입을 정의합니다.
export const GET_NOTICE     = 'notice/GET_NOTICE';
export const GET_NOTICES    = 'notice/GET_NOTICES';
export const POST_NOTICE    = 'notice/POST_NOTICE';
export const PUT_NOTICE     = 'notice/PUT_NOTICE';

// 액션을 생성합니다.
const actions = createActions({
    [GET_NOTICE]: () => {},  // GET_NOTICE 액션 생성자
    [GET_NOTICES]: (payload) => payload, // GET_NOTICES 액션 생성자
    [POST_NOTICE]: (payload) => payload, // POST_NOTICE 액션 생성자
    [PUT_NOTICE]: () => {}   // PUT_NOTICE 액션 생성자
});

/* 리듀서 */
// 리듀서를 정의합니다. 액션 타입에 따라 상태를 업데이트합니다.
const noticeReducer = handleActions(
    {
        [GET_NOTICE]: (state, { payload }) => {
            return { ...state, data : payload };
        },
        [GET_NOTICES]: (state, { payload }) => {
            console.log('리듀서의 payload : ', payload);
            return { ...state, data : payload.data, pageInfo : payload.pageInfo };
        },
        [POST_NOTICE]: (state, { payload }) => {
            return { ...state, data : [payload, ...state.data] };
        },
        [PUT_NOTICE]: (state, { payload }) => {
            return { ...state, data : payload };
        }
    },
    initialState // 초기 상태를 설정합니다.
);

export default noticeReducer; // noticeReducer를 기본 익스포트합니다.
