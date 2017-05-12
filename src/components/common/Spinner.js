import React, { Component } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

class Spinner extends Component {

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size={this.props.size || 'large'}
          color={this.props.color}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { Spinner };
