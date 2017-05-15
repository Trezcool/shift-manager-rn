import * as types from '../actions/types';

const initialState = {
  email: '',
  password: '',
  error: '',
  isLogin: true,
  loading: false,
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.EMAIL_CHANGED:
      return {...state, email: action.payload};
    case types.PASSWORD_CHANGED:
      return {...state, password: action.payload};
    case types.TOGGLE_SCREENS:
      return {...state, ...initialState, isLogin: !state.isLogin};
    case types.AUTH_REQ_STARTED:
      return {...state, error: '', loading: true};
    case types.LOGIN_SUCCESS:
      return {...state, ...initialState, user: action.payload};
    case types.SIGN_UP_SUCCESS:
    case types.LOGOUT_SUCCESS:
      return {...state, ...initialState};
    case types.AUTH_REQ_FAILED:
      return {...state, error: action.payload, loading: false, password: ''};
    default:
      return state
  }
}
