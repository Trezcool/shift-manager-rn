import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native'
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';

import * as AuthActions from '../actions/AuthActions'
import { Button, Card, CardSection, Input, Link, Spinner } from './common';

const mapStateToProps = (state) => ({
  email: state.auth.email,
  password: state.auth.password,
  error: state.auth.error,
  isLogin: state.auth.isLogin,
  loading: state.auth.loading,
});

class LoginForm extends Component {
  onSubmit = async () => {
    const { email, password, logInOrSignUp } = this.props;

    if (email && password) {
      logInOrSignUp({email, password});
    }
  };

  renderButton = () => {
    const { email, password, isLogin, loading, toggleScreens } = this.props;

    if (loading) {
      return (
        <CardSection lastChild={true}>
          <Spinner color="#2980B9"/>
        </CardSection>
      )
    }

    return (
      <View>
        <CardSection lastChild={true}>
          <Button
            title={isLogin && 'Log In' || 'Sign Up'}
            disabled={!(email && password)}
            onPress={this.onSubmit.bind(this)}
            style={{flex: 1}}
          />
        </CardSection>
        <CardSection lastChild={true}>
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
              onSubmitEditing={this.onSubmit.bind(this)}
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
    padding: 20,
    color: 'red',
    alignSelf: 'center',
    fontFamily: 'open-sans-regular',
  }
});

export default connect(mapStateToProps, AuthActions)(LoginForm)
