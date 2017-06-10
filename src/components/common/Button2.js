import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

class Button2 extends Component {

  render() {
    const { disabled, style, children } = this.props;
    return (
      <TouchableOpacity
        style={[styles.container, style, disabled && styles.disabled]}
        disabled={disabled}
        onPress={this.props.onPress}
      >
        {children}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
  },
  container: {
    alignSelf: 'stretch',
    backgroundColor: '#2980B9',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#2980B9',
    marginLeft: 5,
    marginRight: 5,
  },
  disabled: {
    backgroundColor: 'rgba(41, 128, 185, 0.3)',
    borderColor: 'rgba(41, 128, 185, 0.3)',
  }
});

Button2 = Animatable.createAnimatableComponent(Button2);
export { Button2 };
