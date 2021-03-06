import { Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';

import * as types from './types';
import { navigateReset } from '../utils';

//noinspection JSUnusedGlobalSymbols
export const emailChanged = (email) => {
  return {
    type: types.EMAIL_CHANGED,
    payload: email
  }
};

//noinspection JSUnusedGlobalSymbols
export const passwordChanged = (password) => {
  return {
    type: types.PASSWORD_CHANGED,
    payload: password
  }
};

//noinspection JSUnusedGlobalSymbols
export const toggleScreens = () => ({type: types.TOGGLE_SCREENS});

//noinspection JSUnusedGlobalSymbols
export const logInOrSignUp = ({ email, password }) => {
  return async (dispatch, getState, { firebaseAuth }) => {
    try {
      dispatch({type: types.AUTH_REQ_STARTED});
      if (getState().auth.isLogin) {
        // login
        const user = await firebaseAuth.signInWithEmailAndPassword(email, password);
        dispatch({type: types.LOGIN_SUCCESS, payload: user});
      } else {
        // sign up
        await firebaseAuth.createUserWithEmailAndPassword(email, password);
        dispatch({type: types.SIGN_UP_SUCCESS});
        Alert.alert('Success', 'Signed up successfully.\nPlease log in.');
      }
    } catch (e) {
      dispatch({type: types.AUTH_REQ_FAILED, payload: e.message});
    }
  };
};

export const logout = (navigation) => {
  return async (dispatch, getState, { firebaseAuth }) => {
    try {
      // log user out
      dispatch({type: types.AUTH_REQ_STARTED});
      await firebaseAuth.signOut();
      dispatch({type: types.LOGOUT_SUCCESS});
      // go back to login screen
      const actions = [NavigationActions.navigate({routeName: 'Login'})];
      navigateReset(navigation, 0, actions)
    } catch (e) {
      dispatch({type: types.AUTH_REQ_FAILED, payload: e.message});
    }
  };
};
