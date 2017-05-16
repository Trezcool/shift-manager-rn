import React from 'react';
import { StyleSheet } from 'react-native';
import { Actions, Router, Scene } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { logout } from './actions/AuthActions';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import LoginForm from './components/LoginForm';

const RouterComponent = (props) => {
  return (
    <Router sceneStyle={{paddingTop: 65, backgroundColor: '#EAECEE'}}>
      <Scene key="auth">
        <Scene key="login" component={LoginForm} title="Log In" titleStyle={styles.title} />
      </Scene>

      <Scene key="main">
        <Scene
          key="employeeList"
          component={EmployeeList}
          title="Employees"
          titleStyle={styles.title}
          onLeft={() => props.logout()}
          leftTitle="Log Out"
          leftButtonTextStyle={styles.asideTitleText}
          onRight={() => Actions.employeeCreate()}
          rightTitle="Add"
          rightButtonTextStyle={styles.asideTitleText}
          initial
        />
        <Scene key="employeeCreate" component={EmployeeForm} title="Create Employee" titleStyle={styles.title} />
      </Scene>
    </Router>
  )
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    color: '#2980B9',
    fontFamily: 'tangerine-bold',
    // borderBottomWidth: 2,
    // borderColor: '#2980B9',

    // shadowColor: '#2E86C1',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.6,
    // elevation: 2,
    // position: 'relative',
  },
  asideTitleText: {
    fontSize: 16,
    color: '#2980B9',
    fontFamily: 'open-sans-regular',
  }
});

export default connect(null, {logout})(RouterComponent);