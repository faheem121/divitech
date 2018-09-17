import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
   Image 
} from 'react-native'; 

export default class LogoHome extends Component<{}> {
	render(){
		return(
		<View>
				<Image  style={{flex:1,width:100, height: 80}}
          			source={require('../images/logo.png')}/>
          		<Text style={styles.logoText}>Welcome to DiviTech.</Text>	
  			</View>   
			)
	}
}

const styles = StyleSheet.create({

  logoText : {
     flex:1,
  	marginVertical: 15,
  	fontSize:24,
  	color:'green'
  }
});