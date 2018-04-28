import { combineReducers } from 'redux';
import routerReducer from './routerReducer';

//this containe all our reducers (function that give us data (states of the application))
export default combineReducers({
  routes: routerReducer
});
