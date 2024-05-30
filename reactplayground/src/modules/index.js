import { combineReducers } from 'redux';
import memberReducer from './MemberModule';
import loadingReducer from './loadingModule';
import checkReducer from './CheckModule';

const rootReducer = combineReducers({
    memberReducer,
    loading: loadingReducer,
    checkReducer
});

export default rootReducer;
