import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';

import { logout } from '../actions/AuthActions';

class EmployeeList extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Employee 1</Text>
        <Text>Employee 2</Text>
        <Text>Employee 3</Text>
        <Text>Employee 4</Text>
        <Text>Employee 5</Text>
        <Text>Employee 6</Text>
        <Text>Employee 7</Text>
        <Text>Employee 8</Text>
        <Text>Employee 9</Text>
        <Text>Employee 10</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  }
});

export default connect(null, {logout})(EmployeeList);
