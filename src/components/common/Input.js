import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';

class Input extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{this.props.label}</Text>
        <TextInput
          onChangeText={this.props.onChangeText}
          secureTextEntry={this.props.secureTextEntry}
          autoCorrect={false}
          placeholder={this.props.placeholder}
          value={this.props.value}
          autoCapitalize={this.props.autoCapitalize}
          returnKeyType={this.props.returnKeyType}
          clearButtonMode={this.props.clearButtonMode}
          keyboardType={this.props.keyboardType}
          enablesReturnKeyAutomatically={this.props.enablesReturnKeyAutomatically}
          blurOnSubmit={this.props.blurOnSubmit}
          onSubmitEditing={this.props.onSubmitEditing}
          style={styles.input}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    paddingLeft: 20,
    flex: 1,
    color: '#2980B9',
  },
  input: {
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 16,
    lineHeight: 23,
    flex: 2,
  }
});

export { Input };
