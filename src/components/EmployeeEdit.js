import _ from 'lodash';
import React, { Component } from 'react';
import { View } from 'react-native';
import Communications from 'react-native-communications';
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

  constructor(props) {
    super(props);
    this.employee = props.navigation.state.params.employee
  }

  componentWillMount() {
    const { employeeEditFormInit} = this.props;
    employeeEditFormInit(this.employee)
  };

  onSaveButtonPressed = () => {
    const { name, phone, shift, employeeUpdate, navigation } = this.props;
    // clean empty entries
    const data = _.omitBy({name, phone, shift}, _.isEmpty);

    // only update if values changed
    let conditions = [];
    _.map(data, (val, key) => conditions.push(data[key] === this.employee[key]));

    if (!conditions.every(c => c === true)) {
      employeeUpdate(this.employee.uid, data, navigation);
    } else {  // if nothing changed, go back to employee list screen
      navigation.goBack(null);
    }
  };

  onTextButtonPressed = () => {
    // text schedule to employee
    const { name, phone, shift } = this.employee;
    const msg = `Hey ${name}, your upcoming shift is on ${shift}.\nSee you!\n\nCEO Trezcool.`;
    Communications.text(phone, msg);
  };

  onDeleteButtonPressed = () => {
    const { employeeDelete, navigation } = this.props;
    employeeDelete(this.employee.uid, navigation);
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
