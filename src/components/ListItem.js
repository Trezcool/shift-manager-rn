import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { ListItem as RNEListItem } from 'react-native-elements';

class ListItem extends Component {
  onRowPressed = () => {
    const { employee, navigation } = this.props;
    navigation.navigate('EmployeeEdit', { employee })
  };

  render() {
    const { employee } = this.props;

    return (
      <RNEListItem
        roundAvatar
        key={employee.uid}
        title={employee.name}
        subtitle={employee.phone}
        avatar={require('../../src/assets/img/anon.png')}
        onPress={this.onRowPressed}
        underlayColor="#EAECEE"
        fontFamily="open-sans-regular"
        titleStyle={styles.title}
      />
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    paddingLeft: 15,
  }
});

export default ListItem
