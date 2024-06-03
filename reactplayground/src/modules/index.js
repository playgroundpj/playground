import { combineReducers } from 'redux';
import memberReducer from './MemberModule';
import loadingReducer from './loadingModule';
import checkReducer from './CheckModule';
import noticeReducer from './NoticeModule';
import reviewReducer from './ReviewModule';
import boardGameReducer from './BoardGameModule';


const rootReducer = combineReducers({
    memberReducer,
    loading: loadingReducer,
    checkReducer,
    noticeReducer,
    reviewReducer,
    boardGameReducer
});

export default rootReducer;
