import {createSelectorHook, createDispatchHook} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import rootReducer, {rootReducerType} from './rootReducer';
import {AllActions} from './allActionsType';
import thunk from 'redux-thunk';
import { getInitialUser } from './user/userActions';

const store = createStore(rootReducer, applyMiddleware(thunk));

export const useDispatch = createDispatchHook<rootReducerType, AllActions>();
export const useSelector = createSelectorHook<rootReducerType>();
export type AppDispatch = typeof store.dispatch;

if (!store.getState().user.user) {
  store.dispatch(getInitialUser() as any);
}

export default store;
