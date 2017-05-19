import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Font } from 'expo';
import firebase from 'firebase';

import reducers from './src/reducers';
import AppNavigator from './src/navigators/AppNavigator';
import { Spinner } from './src/components/common';

export default class App extends Component {
  state = {
    store: null,
    fontsLoaded: false,
  };

  componentWillMount() {
    // configure firebase
    const firebaseConf = {
      apiKey: "AIzaSyDw5LHLlRU8eKZLAVbajlMkdB-fOgZBob0",
      authDomain: "manager-ff790.firebaseapp.com",
      databaseURL: "https://manager-ff790.firebaseio.com",
      projectId: "manager-ff790",
      storageBucket: "manager-ff790.appspot.com",
      messagingSenderId: "654233458722"
    };
    firebase.initializeApp(firebaseConf);
    // create app store
    const firebaseAuth = firebase.auth();
    const firebaseDB = firebase.database();
    const store = createStore(reducers, applyMiddleware(thunk.withExtraArgument({firebaseAuth, firebaseDB})));
    this.setState({store})
  }

  async componentDidMount() {
    await Font.loadAsync({
      'josefin-slab-bold': require('./src/assets/fonts/JosefinSlab-Bold.ttf'),
      'josefin-slab-thin': require('./src/assets/fonts/JosefinSlab-Thin.ttf'),
      'open-sans-bold': require('./src/assets/fonts/OpenSans-Bold.ttf'),
      'open-sans-italic': require('./src/assets/fonts/OpenSans-Italic.ttf'),
      'open-sans-regular': require('./src/assets/fonts/OpenSans-Regular.ttf'),
      'tangerine-bold': require('./src/assets/fonts/Tangerine_Bold.ttf'),
      'tangerine-regular': require('./src/assets/fonts/Tangerine_Regular.ttf'),
    });
    this.setState({fontsLoaded: true});
  }

  renderView = () => {
    return this.state.fontsLoaded ? (
      <View style={styles.container}>
        <AppNavigator />
      </View>
    ) : <Spinner color="#2980B9" />;
  };

  render() {
    return (
      <Provider store={this.state.store}>
        {this.renderView()}
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAECEE',
  },
});
