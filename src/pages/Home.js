import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar 
} from 'react-native';

import {StackNavigator} from 'react-navigation';
import AddNews from './AdminAddNews';
const Navigator = StackNavigator({
   AddNews:{
        screen:AddNews
            }
    
});
export default class HomePage extends Component<{}> {


	render() {
		return(<Navigator />);
	}
}



