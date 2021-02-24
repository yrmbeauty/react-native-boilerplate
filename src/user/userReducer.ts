import {User} from '../../api/authentication';
import {UserActions} from './userActions';

export type UserState = {
  user: User | null;
  error: string | null;
  isLoading: boolean;
};

const initialState: UserState = {
  user: null,
  error: null,
  isLoading: false,
};

function userReducer(
  state: UserState = initialState,
  action: UserActions,
): UserState {
  switch (action.type) {
    case 'LOGIN_SUCCES':
      return {
        ...state,
        user: action.user,
        isLoading: false,
      };
    case 'REMOVE_USER':
      return initialState;
    case 'LOGIN_START':
      return {
        ...state,
        isLoading: true,
      }
    case 'LOGIN_ERROR':
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    default:
      return state;
  }
}

export default userReducer;
