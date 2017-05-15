import { Alert } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';

import * as types from './types';

//noinspection JSUnusedGlobalSymbols
export const employeeFormUpdate = ({ prop, value }) => {
  return {
    type: types.EMPLOYEE_FORM_UPDATE,
    payload: {prop, value}
  }
};

//noinspection JSUnusedGlobalSymbols
export const employeeCreate = ({ name, phone, shift }) => {
  return async (dispatch, getState, { firebaseAuth, firebaseDB }) => {
    try {
      // create employee
      dispatch({type: types.EMPLOYEE_REQ_STARTED});
      const uid = firebaseAuth.currentUser.uid;
      const ref = firebaseDB.ref(`/users/${uid}/employees`);
      await ref.push({name, phone, shift});
      dispatch({type: types.EMPLOYEE_REQ_SUCCESS});
      // go back to employee list screen
      Actions.pop({type: ActionConst.RESET});
      Alert.alert('Success', 'Employee created successfully.');
    } catch (e) {
      dispatch({type: types.EMPLOYEE_REQ_FAILED, payload: e.message});
    }
  };
};
