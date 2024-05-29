import { combineReducers } from 'redux';
import memberReducer from './MemberModule';
import loadingReducer from './loadingModule';

const rootReducer = combineReducers({
    memberReducer,
    loading: loadingReducer
});

export default rootReducer;
