import React from 'react';
import { Button as RNButton, StyleSheet } from 'react-native';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';

import { logout } from '../actions/AuthActions';
import EmployeeCreate from '../components/EmployeeCreate';
import EmployeeEdit from '../components/EmployeeEdit';
import EmployeeList from '../components/EmployeeList';
import LoginForm from '../components/LoginForm';

const styles = StyleSheet.create({
  header: {

  },
  headerBackTitle: {
    color: '#2980B9',
  },
  title: {
    fontSize: 30,
    color: '#2980B9',
    fontFamily: 'tangerine-bold',
  }
});

const RouteConfigs = {
  Login: {
    screen: LoginForm,
    navigationOptions: {
      title: 'Log In',
    }
  },
  EmployeeList: {
    screen: EmployeeList,
    navigationOptions: ({ navigation, logout }) => ({
      title: 'Employees',
      headerLeft: <RNButton title="Log Out" onPress={() => logout(navigation)} color={'#2980B9'} />,
      headerRight: <RNButton title="Add" onPress={() => navigation.navigate('EmployeeCreate')} color={'#2980B9'} />,
    })
  },
  EmployeeCreate: {
    screen: EmployeeCreate,
    navigationOptions: {
      title: 'Create Employee',
    }
  },
  EmployeeEdit: {
    screen: EmployeeEdit,
    navigationOptions: ({ navigation }) => ({
      title: navigation.state.params.employee.name,
    })
  },
};

const NavigatorConfig = {
  initialRouteName: 'Login',
  // mode: 'modal', // default: `card`
  navigationOptions: {
    headerStyle: styles.header,
    headerTitleStyle: styles.title,
    headerBackTitleStyle: styles.headerBackTitle,
    headerTintColor: 'blue',
  }
};

export const AppNavigator = StackNavigator(RouteConfigs, NavigatorConfig);

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

const mapStateToProps = ({ nav }) => ({ nav });

export default connect(mapStateToProps, { logout })(AppWithNavigationState);
