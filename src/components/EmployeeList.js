import _ from 'lodash';
import React, { Component } from 'react';
import { ListView, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import { employeesFetch } from '../actions/EmployeeActions';
import { Spinner } from './common';
import ListItem from './ListItem';

const mapStateToProps = state => {
  // transform employees state obj into list
  let { employees, loading } = state.employees;
  employees = _.map(employees, (employee, uid) => ({...employee, uid}));
  return { employees, loading }
};

class EmployeeList extends Component {
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
    return <ListItem employee={employee} />
  };

  render() {
    return this.props.loading ? <View style={{flex: 1}}><Spinner color="#2980B9"/></View> : (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
        style={styles.container}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {

  }
});

export default connect(mapStateToProps, {employeesFetch})(EmployeeList);
