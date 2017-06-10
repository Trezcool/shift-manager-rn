import React from 'react';
import { StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';

import EmployeeCreate from '../components/EmployeeCreate';
import EmployeeEdit from '../components/EmployeeEdit';
import EmployeeList from '../components/EmployeeList';
import LoginForm from '../components/LoginForm';

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 2,
    borderColor: '#2980B9',
    shadowColor: '#2E86C1',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.4,
    elevation: 2,
    position: 'relative',
  },
  title: {
    fontSize: 30,
    fontFamily: 'tangerine-bold',
  }
});

const RouteConfigs = {
  Login: {
    screen: LoginForm,
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
  cardStyle: { backgroundColor: 'transparent' },
  navigationOptions: {
    headerStyle: styles.header,
    headerTitleStyle: styles.title,
    headerTintColor: '#2980B9',
  }
};

const AppNavigator = StackNavigator(RouteConfigs, NavigatorConfig);
export default AppNavigator;
