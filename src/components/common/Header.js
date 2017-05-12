import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

class Header extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{this.props.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EAECEE',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    paddingTop: 15,
    borderBottomWidth: 2,
    borderColor: '#2980B9',
    shadowColor: '#2E86C1',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.6,
    elevation: 2,
    position: 'relative',
  },
  title: {
    fontSize: 27,
    color: '#2980B9',
    fontFamily: 'tangerine-bold',
  }
});

export { Header };
