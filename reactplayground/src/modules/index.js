import { combineReducers } from 'redux';
import memberReducer from './MemberModule';
import loadingReducer from './loadingModule';
import checkReducer from './CheckModule';
import noticeReducer from './NoticeModule';

const rootReducer = combineReducers({
    memberReducer,
    loading: loadingReducer,
    checkReducer,
    noticeReducer
});

export default rootReducer;
