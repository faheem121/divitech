import React from 'react';
import {
  View,
  StatusBar 
} from 'react-native';
import Routes from './src/Routes';

console.disableYellowBox = true;
export default class App extends React.Component {
  render() {
    return (
  <View style={{flex: 1}}>
        <StatusBar
           backgroundColor="#ffffff"
           barStyle="light-content"
         />
        <Routes/>
      </View>
    );
  }
}


