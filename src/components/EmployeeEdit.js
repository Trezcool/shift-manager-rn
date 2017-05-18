import _ from 'lodash';
import React, { Component } from 'react';
import { View } from 'react-native';
import Communications from 'react-native-communications';
import { Actions, ActionConst } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { EmployeeEditActions } from '../actions/EmployeeActions';
import { Button, CardSection, Confirm, Spinner } from './common';
import EmployeeForm from './EmployeeForm';

const mapStateToProps = ({ employeeForm }) => {
  const { name, phone, shift, loading } = employeeForm;
  return { name, phone, shift, loading }
};

class EmployeeEdit extends Component {
  state = {
    modalVisible: false,
  };

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

  onTextButtonPressed = () => {
    // text schedule to employee
    const { name, phone, shift } = this.props.employee;
    const msg = `Hey ${name}, your upcoming shift is on ${shift}.\nSee you!\n\nCEO Trezcool.`;
    Communications.text(phone, msg);
  };

  onDeleteButtonPressed = () => {
    const { employee, employeeDelete } = this.props;
    employeeDelete(employee.uid);
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
            title="Text Schedule"
            onPress={this.onTextButtonPressed}
            style={{flex: 1}}
          />
        </CardSection>

        <CardSection lastChild>
          <Button
            title="Fire Employee"
            onPress={() => this.setState({modalVisible: true})}
            style={{flex: 1, backgroundColor: 'transparent'}}
            titleStyle={{color: '#2980B9'}}
          />
        </CardSection>

        <Confirm
          visible={this.state.modalVisible}
          onAccept={this.onDeleteButtonPressed}
          onDecline={() => this.setState({modalVisible: false})}
        >
          Are you sure you want to fire this employee?
        </Confirm>
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
