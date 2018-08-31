import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar 
} from 'react-native';

import {StackNavigator} from 'react-navigation';
import AddComplain from './UserAddComplain';
const Navigator = StackNavigator({
   AddComplain:{
        screen:AddComplain
            }
    
});
export default class User extends Component<{}> {


	render() {
		return(<Navigator />);
	}
}



