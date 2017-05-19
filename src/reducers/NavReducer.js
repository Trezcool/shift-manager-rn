import { NavigationActions } from 'react-navigation';

import { AppNavigator } from '../navigators/AppNavigator';
import * as types from '../actions/types';

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Login'));

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return AppNavigator.router.getStateForAction(
        NavigationActions.back(),
        state
      );
    case types.LOGOUT_SUCCESS:
      return AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Login'}),
        state
      );
    default:
      return AppNavigator.router.getStateForAction(action, state);
  }
}
