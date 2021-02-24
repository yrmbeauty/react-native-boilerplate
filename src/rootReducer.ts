import { combineReducers } from 'redux';
import transferReducer from './fundsTransfer/transferReducer';
import userReducer from './user/userReducer';

const rootReducer = combineReducers({
  user: userReducer,
  transfer: transferReducer
});

export type rootReducerType = ReturnType<typeof rootReducer>;

export default rootReducer