import React from 'react';
import { StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';

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
  navigationOptions: {
    headerStyle: styles.header,
    headerTitleStyle: styles.title,
    headerBackTitleStyle: styles.headerBackTitle,
    headerTintColor: 'blue',
  }
};

const AppNavigator = StackNavigator(RouteConfigs, NavigatorConfig);
export default AppNavigator;
