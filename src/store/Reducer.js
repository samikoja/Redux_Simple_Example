import { combineReducers } from 'redux';
import entitiesReducer from './Entities';

export default combineReducers({
  entities: entitiesReducer,
})