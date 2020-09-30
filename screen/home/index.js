import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import UserMenu from './usermenu'

const Stack = createStackNavigator();


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.userlist
  }

  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen 
          name="UserList">
        {(props) => (
          <UserMenu 
            {...props} 
            userlist={this.props.userlist}
            deleteUser={this.props.deleteUser} />
        )}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }
}

const styles = StyleSheet.create({

});

export default Home;
