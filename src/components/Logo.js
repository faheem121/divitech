import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
   Image 
} from 'react-native';

export default class Logo extends Component<{}> {
	render(){
		return(
			<View style={{  flexGrow: 1,
    justifyContent:'flex-end',
    alignItems: 'center'}}>
				<Image  style={{width:120, height: 90}}
          			source={require('../images/logo.png')}/>
          		<Text style={styles.logoText}>Welcome to DiviTech.</Text>	
  			</View>
			)
	}
}

const styles = StyleSheet.create({

  logoText : {
  	marginVertical: 15,
  	fontSize:18,
  	color:'#3b323f'
  }
});