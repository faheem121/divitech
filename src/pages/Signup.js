import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar ,
  TouchableOpacity
} from 'react-native';

import Logo from '../components/Logo';
import SignupForm from '../components/SignupForm';

import {Actions} from 'react-native-router-flux';

export default class Signup extends Component<{}> {

  goBack() {
      Actions.pop();
  }

	render() {
		return(
			<View style={{    backgroundColor:'#ffffff',
    flex: 1,
    alignItems:'center',
    justifyContent :'center'}}>
				<Logo/>
			
                    <SignupForm place="Admin Email"/> 
				<View style={{flexGrow: 1,
    alignItems:'flex-end',
    justifyContent :'center',
    paddingVertical:16,
    flexDirection:'row'}}>

					<TouchableOpacity style={styles.signupButton} onPress={this.goBack}><Text style={styles.buttonText}> Login as User</Text></TouchableOpacity>
				</View>
			</View>	
			)
	}
}

const styles = StyleSheet.create({
 

  signupText: {
  	color:'rgba(255,255,255,0.6)',
  	fontSize:16
  },
    buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  },
  signupButton: {
   width:300,
     backgroundColor:'#3D9BF5',
     borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 13
  }
});
