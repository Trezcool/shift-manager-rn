import * as types from './types';

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
export const logInOrSignUp = ({email, password}) => {
  return async (dispatch, getState, {firebaseAuth}) => {
    console.log('firebaseAuth', firebaseAuth);
    try {
      dispatch({type: types.AUTH_REQUEST});
      if (getState().auth.isLogin) {
        await firebaseAuth.signInWithEmailAndPassword(email, password);
        dispatch({type: types.LOGIN_SUCCESS, payload: firebaseAuth.currentUser});
      } else {
        await firebaseAuth.createUserWithEmailAndPassword(email, password);
        dispatch({type: types.SIGN_UP_SUCCESS});
        // Alert.alert('Success', 'Signed up successfully.\nPlease log in.');
      }
    } catch (e) {
      console.log('error', e.message);
      dispatch({type: types.AUTH_REQ_FAILED, payload: e.message});
      // Alert.alert('Error!', e.message);
    }
  };
};

// export const logout = async (dispatch, getState) => {
//
// };
