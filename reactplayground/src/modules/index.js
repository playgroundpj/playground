import { combineReducers } from 'redux';
import memberReducer from './MemberModule';
import loadingReducer from './loadingModule';
import checkReducer from './CheckModule';
import noticeReducer from './NoticeModule';
import reviewReducer from './ReviewModule';

const rootReducer = combineReducers({
    memberReducer,
    loading: loadingReducer,
    checkReducer,
    noticeReducer,
    reviewReducer
});

export default rootReducer;
