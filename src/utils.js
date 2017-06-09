import { NavigationActions } from 'react-navigation';

export const navigateReset = (navigation, index, actions) => {
  navigation.dispatch(NavigationActions.reset({ index, actions }));
};
