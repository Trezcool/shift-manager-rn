import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import firebase from 'firebase';
import Sentry from 'sentry-expo';

import reducers from './src/reducers';
import AppNavigator from './src/navigators/AppNavigator';
import { AppBackground, Spinner } from './src/components/common';
import { cacheFonts, cacheImages } from './src/utils';

export default class App extends Component {
  state = {
    store: null,
    appIsReady: false,
  };

  componentWillMount() {
    //noinspection JSIgnoredPromiseFromCall
    this._loadAssetsAsync();
    this._configureFirebase();
    this._createStore();
  }

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require('./src/assets/icons/app.png'),
      require('./src/assets/icons/loading.png'),
      require('./src/assets/img/background.jpg'),
    ]);
    const fontAssets = cacheFonts([
      {'josefin-slab-bold': require('./src/assets/fonts/JosefinSlab-Bold.ttf')},
      {'josefin-slab-thin': require('./src/assets/fonts/JosefinSlab-Thin.ttf')},
      {'open-sans-bold': require('./src/assets/fonts/OpenSans-Bold.ttf')},
      {'open-sans-italic': require('./src/assets/fonts/OpenSans-Italic.ttf')},
      {'open-sans-regular': require('./src/assets/fonts/OpenSans-Regular.ttf')},
      {'tangerine-bold': require('./src/assets/fonts/Tangerine_Bold.ttf')},
      {'tangerine-regular': require('./src/assets/fonts/Tangerine_Regular.ttf')},
    ]);

    await Promise.all([...imageAssets, ...fontAssets]);
    this.setState({appIsReady: true});
  }

  _configureFirebase = () => {
    const firebaseConf = {
      apiKey: "AIzaSyDw5LHLlRU8eKZLAVbajlMkdB-fOgZBob0",
      authDomain: "manager-ff790.firebaseapp.com",
      databaseURL: "https://manager-ff790.firebaseio.com",
      projectId: "manager-ff790",
      storageBucket: "manager-ff790.appspot.com",
      messagingSenderId: "654233458722"
    };
    firebase.initializeApp(firebaseConf);
  };

  _createStore = () => {
    const firebaseAuth = firebase.auth();
    const firebaseDB = firebase.database();
    const store = createStore(reducers, applyMiddleware(thunk.withExtraArgument({firebaseAuth, firebaseDB})));
    this.setState({store});
  };

  renderView = () => {
    return this.state.appIsReady ? (
      <View style={styles.container}>
        <AppNavigator />
      </View>
    ) : <Spinner color="#2980B9" />;
  };

  render() {
    return (
      <Provider store={this.state.store}>
        <AppBackground>
          {this.renderView()}
        </AppBackground>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

Sentry.config('https://1e9c442a83dc4b68a72ab6206efc07e3@sentry.io/178178').install();
