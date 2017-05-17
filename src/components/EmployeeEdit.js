import _ from 'lodash';
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { EmployeeEditActions } from '../actions/EmployeeActions';
import { Button, CardSection, Spinner } from './common';
import EmployeeForm from './EmployeeForm';

const mapStateToProps = ({ employeeForm }) => {
  const { name, phone, shift, error, loading } = employeeForm;
  return { name, phone, shift, error, loading }
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
    employeeUpdate(employee.uid, data);
  };

  onDeleteButtonPressed = () => {
    // const { name, phone, shift, employeeUpdate } = this.props;
    // employeeUpdate({name, phone, shift});
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
            title="Delete"
            onPress={this.onDeleteButtonPressed}
            style={{flex: 1, backgroundColor: 'transparent'}}
            titleStyle={{color: '#2980B9'}}
          />
        </CardSection>
      </View>
    )
  };

  render() {
    const { name, phone, shift, error } = this.props;

    return (
      <EmployeeForm name={name} phone={phone} shift={shift} error={error}>
        {this.renderButton()}
      </EmployeeForm>
    );
  }
}

export default connect(mapStateToProps, EmployeeEditActions)(EmployeeEdit);
