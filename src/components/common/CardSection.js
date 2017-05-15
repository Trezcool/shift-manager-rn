import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

class CardSection extends Component {

  render() {
    const { style, lastChild } = this.props;
    return (
      <View style={[styles.container, style && style, !lastChild && styles.customBorderBottom]}>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    borderRadius: 5,
    position: 'relative',
  },
  customBorderBottom: {
    borderBottomWidth: 1,
  }
});

export { CardSection };
