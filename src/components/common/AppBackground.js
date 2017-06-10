import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import { BlurView } from 'expo';

export class AppBackground extends Component {
  render() {
    return(
      <Image
        source={require('../../assets/img/background.jpg')}
        style={styles.container}
        resizeMode="cover"
      >
        <BlurView
          tint="light"
          intensity={55}
          style={StyleSheet.absoluteFill}
        >
          {this.props.children}
        </BlurView>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: 'transparent',
  },
});
