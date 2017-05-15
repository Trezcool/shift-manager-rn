import React, { Component } from 'react';
import { Picker, StyleSheet, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';

import * as EmployeeActions from '../actions/EmployeeActions';
import { Button, Card, CardSection, Input, Spinner } from './common';

const mapStateToProps = ({ employeeForm }) => {
  const { name, phone, shift, error, loading } = employeeForm;
  return { name, phone, shift, error, loading }
};

class EmployeeForm extends Component {
  onButtonPressed = () => {
    const { name, phone, shift, employeeCreate } = this.props;
    console.log('props', this.props);
    employeeCreate({name, phone, shift: shift || 'Mon'});
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
          onPress={this.onButtonPressed.bind(this)}
          style={{flex: 1}}
        />
      </CardSection>
    )
  };

  render() {
    const { name, phone, shift, error, employeeFormUpdate } = this.props;

    return (
      <Animatable.View animation="fadeInDown">
        <Card>
          <CardSection>
            <Input
              label="Name"
              placeholder="John Doe"
              value={name}
              clearButtonMode="while-editing"
              onChangeText={(value) => employeeFormUpdate({prop: 'name', value})}
              returnKeyType="next"
              // blurOnSubmit={false}
              // onSubmitEditing={() => this.passwordInput.focus()}  // FIXME: `focus` no longer exist :(
            />
          </CardSection>

          <CardSection>
            <Input
              label="Phone"
              placeholder="0780000000"
              value={phone}
              clearButtonMode="while-editing"
              keyboardType="phone-pad"
              onChangeText={(value) => employeeFormUpdate({prop: 'phone', value})}
              returnKeyType="next"
              // blurOnSubmit={false}
              // onSubmitEditing={() => this.passwordInput.focus()}  // FIXME: `focus` no longer exist :(
            />
          </CardSection>

          <CardSection style={{flexDirection: 'column'}}  lastChild>
            <Text style={styles.pickerLabel}>Shift</Text>
            <Picker
              selectedValue={shift}
              onValueChange={(value) => employeeFormUpdate({prop: 'shift', value})}
              // style={{flex: 1}}
            >
              <Picker.Item label="Monday" value="Mon" />
              <Picker.Item label="Tuesday" value="Tue" />
              <Picker.Item label="Wednesday" value="Wed" />
              <Picker.Item label="Thursday" value="Thu" />
              <Picker.Item label="Friday" value="Fri" />
              <Picker.Item label="Saturday" value="Sat" />
              <Picker.Item label="Sunday" value="Sun" />
            </Picker>
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
  pickerLabel: {
    fontSize: 14,
    paddingTop: 10,
    paddingLeft: 20,
    // flex: 1,
    color: '#2980B9',
  },
  error: {
    paddingLeft: 20,
    paddingRight: 20,
    color: 'red',
    alignSelf: 'center',
    fontFamily: 'open-sans-regular',
  }
});

export default connect(mapStateToProps, EmployeeActions)(EmployeeForm);
