import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity ,AsyncStorage
} from 'react-native';
import { KeyboardAvoidingView } from 'react-native';

import {Actions} from 'react-native-router-flux';
export default class Form extends Component<{}> {
constructor()
    {
        super();
        this.state = {
            email:'',
            password: ''
        }
    }
   updateValue(text,field) 
    {
       if(field == 'email'){
           this.setState({
               email:text,
           })
       }
        else if(field == 'password'){
            this.setState({
                password:text,
                
            })
        }
    }
    
      submit()
    {
        let collection={}
        collection.email=this.state.email,
        collection.password=this.state.password
      
      
         
        var url = 'http://divitech.codejunkie.pk/api/login';
      

        fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(collection), // data can be `string` or {object}!
        headers:{
        'Content-Type': 'application/json'
                }
        }).then(res => res.json())
        
      
        .then(response => {
        if (response.error) {
          alert(response.error)
        } else {
         var id=  response.user.id.toString();
            AsyncStorage.multiSet([
                    ["token", response.token],
                    ["id", id] 
            ])
        //alert(`Success! You are Login Now.`)
          // Redirect to home screen

          Actions.user()
            } 
      })
        .catch(error => console.error('Error:', error));
    }
    
	render(){
		return(
			<KeyboardAvoidingView style={{flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center'}} behavior="padding" enabled>
          <TextInput style={styles.inputBox} 
            onChangeText={(text) => this.updateValue(text,'email')}
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder={this.props.place}
              placeholderTextColor = "#fff"
              selectionColor="#fff"
              keyboardType="email-address"
              onSubmitEditing={()=> this.password.focus()}
              />
          <TextInput style={styles.inputBox} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              onChangeText={(text) => this.updateValue(text,'password')}
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor = "#fff"
              ref={(input) => this.password = input}
              />  
           <TouchableOpacity onPress= {()=>this.submit()} style={styles.button}>
             <Text style={styles.buttonText}>Login</Text> 
           </TouchableOpacity>     
  		</KeyboardAvoidingView>
			)
	}
}

const styles = StyleSheet.create({


  inputBox: {
    width:300,
      height:45,
    backgroundColor:'#a3a7bb',
    borderRadius: 25,
    paddingHorizontal:16,
    fontSize:16,
    color:'#3b323f',
    marginVertical: 10
  },
  button: {
    width:300,
    backgroundColor:'#3D9BF5',
     borderRadius: 25,
      marginVertical: 10,
      paddingVertical: 13
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  }
  
});