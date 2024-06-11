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
import reservationReducer from './ReservationModule';
import storeReducer from './StoreModule';

const rootReducer = combineReducers({
    memberReducer,
    loading: loadingReducer,
    checkReducer,
    noticeReducer,
    reviewReducer,
    shopReducer,
    managerReducer,
    boardgameReducer,
    menuReducer,
    reservationReducer,
    storeReducer
});

export default rootReducer;
