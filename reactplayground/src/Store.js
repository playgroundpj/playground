import rootReducer from './modules';
import { composeWithDevTools} from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools} from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import rootReducer from './modules';


const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(ReduxThunk))
);

export default store;