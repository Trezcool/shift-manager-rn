import React, { Component } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

import { CardSection } from './common';

class ListItem extends Component {
  onRowPressed = () => {
    const { employee, navigation } = this.props;
    navigation.navigate('EmployeeEdit', { employee })
  };

  render() {
    const { employee } = this.props;

    return (
    <TouchableWithoutFeedback onPress={this.onRowPressed}>
      <View>
        <CardSection>
          <Text style={styles.title}>{employee.name}</Text>
        </CardSection>
      </View>
    </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    paddingLeft: 15,
    fontFamily: 'open-sans-regular',
  }
});

export default ListItem
