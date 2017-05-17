import _ from 'lodash';
import React, { Component } from 'react';
import { Alert, View } from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { EmployeeEditActions } from '../actions/EmployeeActions';
import { Button, CardSection, Spinner } from './common';
import EmployeeForm from './EmployeeForm';

const mapStateToProps = ({ employeeForm }) => {
  const { name, phone, shift, loading } = employeeForm;
  return { name, phone, shift, loading }
};

class EmployeeEdit extends Component {
  componentWillMount() {
    const { employee, employeeEditFormInit} = this.props;
    employeeEditFormInit(employee)
  };

  onSaveButtonPressed = () => {
    const { name, phone, shift, employeeUpdate, employee } = this.props;
    // clean empty entries
    const data = _.omitBy({name, phone, shift}, _.isEmpty);

    // only update if values changed
    let conditions = [];
    _.forIn(data, (val, key) => conditions.push(data[key] === employee[key]));

    if (!conditions.every(c => c === true)) {
      employeeUpdate(employee.uid, data);
    } else {  // if nothing changed, go back to employee list screen
      Actions.pop({type: ActionConst.RESET});
    }
  };

  onDeleteButtonPressed = () => {
    const { employee, employeeDelete } = this.props;
    Alert.alert(
      'Fire?',
      'Are you sure you want to fire this employee?',
      [
        {text: 'Cancel', onPress: () => console.log('Deletion action canceled'), style: 'cancel'},
        {text: 'OK', onPress: () => employeeDelete(employee.uid)},
      ]
    );
  };

  renderButton = () => {
    const { loading } = this.props;

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
            title="Save"
            onPress={this.onSaveButtonPressed}
            style={{flex: 1}}
          />
        </CardSection>
        <CardSection lastChild>
          <Button
            title="Fire"
            onPress={this.onDeleteButtonPressed}
            style={{flex: 1, backgroundColor: 'transparent'}}
            titleStyle={{color: '#2980B9'}}
          />
        </CardSection>
      </View>
    )
  };

  render() {
    return (
      <EmployeeForm>
        {this.renderButton()}
      </EmployeeForm>
    );
  }
}

export default connect(mapStateToProps, EmployeeEditActions)(EmployeeEdit);
