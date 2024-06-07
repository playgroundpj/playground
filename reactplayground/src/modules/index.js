import { combineReducers } from 'redux';
import memberReducer from './MemberModule';
import loadingReducer from './loadingModule';
import checkReducer from './CheckModule';
import noticeReducer from './NoticeModule';
import reviewReducer from './ReviewModule';
import shopReducer from './ShopModule';
import managerReducer from './ManagerModule';
import boardgameReducer from './BoardgameModule';
import menuReducer from './MenuModule';

const rootReducer = combineReducers({
    memberReducer,
    loading: loadingReducer,
    checkReducer,
    noticeReducer,
    reviewReducer,
    shopReducer,
    managerReducer,
    boardgameReducer,
    menuReducer
});

export default rootReducer;
