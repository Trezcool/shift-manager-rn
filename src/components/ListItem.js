import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { ListItem as RNEListItem } from 'react-native-elements';

class ListItem extends Component {
  onRowPressed = () => {
    const { employee: { item }, navigation } = this.props;
    navigation.navigate('EmployeeEdit', { employee: item })
  };

  render() {
    const { employee: { item } } = this.props;

    return (
      <RNEListItem
        roundAvatar
        title={item.name}
        subtitle={item.phone}
        avatar={require('../../src/assets/img/anon.png')}
        onPress={this.onRowPressed}
        underlayColor="#E6E8EA"
        fontFamily="open-sans-regular"
        titleStyle={styles.title}
        containerStyle={styles.container}
      />
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    paddingLeft: 15,
  },
  container: {
    borderBottomWidth: 0,
  }
});

export default ListItem
