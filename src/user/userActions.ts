import AsyncStorage from '@react-native-async-storage/async-storage';

import {checkUser, signIn, User} from '../../api/authentication';
import {AppDispatch} from '../store';

export type UserActions =
  | {type: 'LOGIN_SUCCES'; user: User}
  | {type: 'LOGIN_START'}
  | {type: 'REMOVE_USER'}
  | {type: 'LOGIN_ERROR'; error: string};

export const getInitialUser = () => async (
  dispatch: AppDispatch,
): Promise<void> => {
  try {
    dispatch({type: 'LOGIN_START'});

    const token = await AsyncStorage.getItem('token');

    if (token !== null) {
      const user = await checkUser();
      dispatch({type: 'LOGIN_SUCCES', user});
    }
    dispatch({type: 'LOGIN_ERROR', error: ''})
  } catch (err) {
    console.error('Get initial user falls: ', err);
    dispatch({type: 'LOGIN_ERROR', error: 'User is not initialized'})
  }
};

export const getUserLogin = (login: string, password: string) => async (
  dispatch: AppDispatch,
): Promise<void> => {
  try {
    dispatch({type: 'LOGIN_START'});

    const response = await signIn(login, password);

    await AsyncStorage.setItem('token', response.accessToken);

    dispatch({type: 'LOGIN_SUCCES', user: response.user});
  } catch (err) {
    dispatch({
      type: 'LOGIN_ERROR',
      error: err.response.data.errors[0].msg ?? err.message,
    });
  }
};

export const logoutUser = () => async (
  dispatch: AppDispatch,
): Promise<void> => {
  try {
    await AsyncStorage.removeItem('token');

    dispatch({
      type: 'REMOVE_USER',
    });
  } catch (err) {
    console.error('Remove user error: ', err);
  }
};
