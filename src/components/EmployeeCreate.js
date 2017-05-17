import React, { Component } from 'react';
import { connect } from 'react-redux';

import { EmployeeCreateActions } from '../actions/EmployeeActions';
import { Button, CardSection, Spinner } from './common';
import EmployeeForm from './EmployeeForm';

const mapStateToProps = ({ employeeForm }) => {
  const { name, phone, shift, loading } = employeeForm;
  return { name, phone, shift, loading }
};

class EmployeeCreate extends Component {
  componentWillMount() {
    const { employeeCreateFormReset } = this.props;
    employeeCreateFormReset();
  }

  onButtonPressed = () => {
    const { name, phone, shift, employeeCreate } = this.props;
    employeeCreate({name, phone, shift: shift || 'Monday'});
  };

  renderButton = () => {
    const { name, phone, loading } = this.props;

    if (loading) {
      return (
        <CardSection lastChild>
          <Spinner color="#2980B9"/>
        </CardSection>
      )
    }

    return (
      <CardSection lastChild>
        <Button
          title="Create"
          disabled={!(name && phone)}
          onPress={this.onButtonPressed}
          style={{flex: 1}}
        />
      </CardSection>
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

export default connect(mapStateToProps, EmployeeCreateActions)(EmployeeCreate);
