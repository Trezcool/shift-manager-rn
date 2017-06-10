import _ from 'lodash';
import React, { Component } from 'react';
import { ListView, StyleSheet, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

import { employeesFetch } from '../actions/EmployeeActions';
import { Button2, Spinner } from './common';
import ListItem from './ListItem';

const mapStateToProps = state => {
  // transform employees state obj into list
  let { employees, loading } = state.employees;
  employees = _.map(employees, (employee, uid) => ({...employee, uid}));
  return { employees, loading }
};

class EmployeeList extends Component {
  //noinspection JSUnusedGlobalSymbols
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: 'Employees',
    headerLeft:
      <Button2 onPress={() => navigation.state.params.logout(navigation)} style={styles.headerButton}>
        <Icon name="sign-out" style={[styles.icon, styles.iconLeft]} />
      </Button2>,
    headerRight:
      <Button2 onPress={() => navigation.navigate('EmployeeCreate')} style={styles.headerButton}>
        <Icon name="user-plus" style={styles.icon} />
      </Button2>,
  });

  componentWillMount() {
    this.props.employeesFetch();
    this.createDataSource(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps)
  }

  createDataSource({ employees }) {
    //noinspection JSUnusedGlobalSymbols
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.uid !== r2.uid});
    this.dataSource = ds.cloneWithRows(employees);
  }

  renderRow = employee => {
    return <ListItem employee={employee} navigation={this.props.navigation} />
  };

  render() {
    return this.props.loading ? <View style={{flex: 1}}><Spinner color="#2980B9"/></View> : (
      <Animatable.View animation="slideInUp" style={styles.container}>
        <ListView
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={this.renderRow}
          style={styles.container}
        />
      </Animatable.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerButton: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  icon: {
    alignSelf: 'center',
    fontWeight: '600',
    paddingTop: 8,
    paddingBottom: 8,
    marginRight: 10,
    color: '#2980B9',
    fontSize: 24,
  },
  iconLeft: {
    transform: [{rotate: '180deg'}],
  }
});

export default connect(mapStateToProps, {employeesFetch})(EmployeeList);
