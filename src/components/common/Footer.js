import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

class Footer extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Animatable.Text
          animation={this.props.animation}
          iterationCount={this.props.iterationCount}
          direction={this.props.direction}
          style={styles.title}
        >
          {this.props.title}
        </Animatable.Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  title: {
    color: '#adb9c2',
    fontSize: 22,
    fontFamily: 'tangerine-bold',
  }
});

export { Footer };
