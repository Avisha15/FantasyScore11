import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import appReducer from './rootReducer';

const middleware = applyMiddleware(thunk);

export default createStore(appReducer, middleware);
