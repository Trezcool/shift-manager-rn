import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';

import * as AuthActions from '../actions/AuthActions';
import { Button, Card, CardSection, Input, Link, Spinner } from './common';
import { navigateReset } from '../utils';

const mapStateToProps = ({ auth }) => {
  const { email, password, error, isLogin, loading, user } = auth;
  return { email, password, error, isLogin, loading, user }
};

class LoginForm extends Component {
  componentWillReceiveProps(nextProps) {
    this.onAuthComplete(nextProps);
  }

  onSubmit = () => {
    const { email, password, logInOrSignUp } = this.props;

    if (email && password) {
      logInOrSignUp({email, password});
    }
  };

  onAuthComplete = props => {
    const { navigation, logout } = this.props;
    if (props.user) {
      const actions = [NavigationActions.navigate({routeName: 'EmployeeList', params: { logout }})];
      navigateReset(navigation, 0, actions);
    }
  };

  renderButton = () => {
    const { email, password, isLogin, loading, toggleScreens } = this.props;

    if (loading) {
      return (
        <CardSection lastChild>
          <Spinner color="#2980B9"/>
        </CardSection>
      )
    }

    return (
      <View>
        <CardSection lastChild>
          <Button
            title={isLogin && 'Log In' || 'Sign Up'}
            disabled={!(email && password)}
            onPress={this.onSubmit}
            style={{flex: 1}}
          />
        </CardSection>
        <CardSection lastChild>
          <Link
            title={isLogin && 'Or sign up' || 'Or log in'}
            onPress={() => toggleScreens()}
          />
        </CardSection>
      </View>
    )
  };

  render() {
    const { email, emailChanged, password, passwordChanged, error } = this.props;

    return (
      <Animatable.View animation="fadeInDown">
        <Card>
          <CardSection>
            <Input
              label="Email"
              placeholder="email@example.com"
              value={email}
              autoCapitalize="none"
              clearButtonMode="while-editing"
              keyboardType="email-address"
              onChangeText={(email) => emailChanged(email)}
              returnKeyType="next"
              // blurOnSubmit={false}
              // onSubmitEditing={() => this.passwordInput.focus()}  // FIXME: `focus` no longer exist :(
            />
          </CardSection>
          <CardSection>
            <Input
              // ref={(input) => { this.passwordInput = input; }}
              label="Password"
              placeholder="password"
              value={password}
              onChangeText={(password) => passwordChanged(password)}
              secureTextEntry
              returnKeyType="go"
              clearButtonMode="while-editing"
              enablesReturnKeyAutomatically
              onSubmitEditing={this.onSubmit}
            />
          </CardSection>

          <Text style={styles.error}>
            {error}
          </Text>
          {this.renderButton()}
        </Card>
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  error: {
    paddingLeft: 20,
    paddingRight: 20,
    color: 'red',
    alignSelf: 'center',
    fontFamily: 'open-sans-regular',
  }
});

export default connect(mapStateToProps, AuthActions)(LoginForm)
