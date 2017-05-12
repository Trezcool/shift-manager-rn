import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

class Link extends Component {

  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={this.props.onPress}
      >
        <Text style={styles.title}>{this.props.title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    alignSelf: 'center',
    color: '#2980B9',
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
  },
  container: {
    flex: 1,
  }
});

export { Link };
