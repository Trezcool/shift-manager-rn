import { NavigationActions } from 'react-navigation';
import { Asset, Font } from 'expo';

// Navigation helpers
export const navigateReset = (navigation, index, actions) => {
  navigation.dispatch(NavigationActions.reset({ index, actions }));
};

// Cache helpers
export const cacheImages = (images) => {
  return images.map(image => Asset.fromModule(image).downloadAsync());
};

export const cacheFonts = (fonts) => {
  return fonts.map(font => Font.loadAsync(font));
};