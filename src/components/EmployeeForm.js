import React, { Component } from 'react';
import { Picker, StyleSheet, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';


import { employeeFormUpdate } from '../actions/EmployeeActions';
import { Card, CardSection, Input } from './common';

class EmployeeForm extends Component {
  render() {
    const { name, phone, shift, employeeFormUpdate, error, children } = this.props;
    const shiftDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    return (
      <Animatable.View animation="fadeInDown">
        <Card>
          <CardSection>
            <Input
              label="Name"
              placeholder="John Doe"
              value={name}
              clearButtonMode="while-editing"
              onChangeText={value => employeeFormUpdate({prop: 'name', value})}
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
              onChangeText={value => employeeFormUpdate({prop: 'phone', value})}
              returnKeyType="next"
              // blurOnSubmit={false}
              // onSubmitEditing={() => this.passwordInput.focus()}  // FIXME: `focus` no longer exist :(
            />
          </CardSection>

          <CardSection style={{flexDirection: 'column'}}  lastChild>
            <Text style={styles.pickerLabel}>Shift</Text>
            <Picker
              selectedValue={shift}
              onValueChange={value => employeeFormUpdate({prop: 'shift', value})}
              // style={{flex: 1}}
            >
              {shiftDays.map((day) => <Picker.Item key={day} label={day} value={day} />)}
            </Picker>
          </CardSection>

          <Text style={styles.error}>
            {error}
          </Text>
          {children}
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

export default connect(null, {employeeFormUpdate})(EmployeeForm);
