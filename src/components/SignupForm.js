import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity ,AsyncStorage,ActivityIndicator,Image
} from 'react-native';

import { Permissions, Notifications } from 'expo';
import { KeyboardAvoidingView } from 'react-native';

import {Actions} from 'react-native-router-flux';
export default class SignupForm extends Component<{}> {
constructor()
    {
        super();
        this.state = {
            email:'',
            password: '',
            pushtoken:'',
              isLoading:false,
            user_id:''
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
    componentDidMount(){
            AsyncStorage.getItem('auth_data').then((value)=> {
                   if(value !== null){
                       var value = JSON.parse(value)
           
                       if(value[0].group === 'Admin'){
                       Actions.home()
                       }else if (value[0].group === 'User'){
                        
                          Actions.user() 
                       }else{
                           AsyncStorage.removeItem('auth_data')
                       }
                    }
                })
    }
    
      submit()
    {
        this.setState({
              isLoading:true
        })
        let collection={}
        collection.email=this.state.email,
        collection.password=this.state.password
      
      
         
        var url = 'http://divitech.codejunkie.pk/api/login';
      

        fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(collection), // data can be `string` or {object}!
        headers:{
        Accept: 'application/json',
        'Content-Type': 'application/json'
                }
        }).then(res => res.json())
        
      
        .then(response => {
        if (response.error) {
          alert(response.error)
          this.setState({
                      isLoading:false,
                })
        } else {
            this.setState({
                user_id:response.user.id.toString()
            })
            
                     if(response.user.group == 'Admin'){
                 const arrayData =[];
         const AuthData = {
             user_id : response.user.id.toString(),
             token: response.token,
             group:response.user.group
         }

  arrayData.push(AuthData);
            try{ 
                AsyncStorage.getItem('auth_data').then((value)=> {
                    if(value !== null){
                        this.setState({
                              isLoading:false
                        })
                        Actions.home();
                    }else{
                        AsyncStorage.setItem('auth_data', JSON.stringify(arrayData));
                        
                        
                            //here update token
          this.setState({
            isLoading:false
        })
                        //end update token
                        //Actions.home();
                        this.registerForPushNotifications();
                       //alert(response.user.id.toString())
                        }
                    
                })
            }
            catch(err) {
                console.log(err)
                }

            
            }else if(response.user.group == 'User'){
            
              alert('You Are Not a Admin Please Signin from User Side!')
               this.setState({
                              isLoading:false
                        })
              Actions.login()
            }else{
                alert('There is an User Role Problem Kindly contact to DiviTech Organization!')
            }
     
           
            } 
      })
        .catch(error => console.error('Error:', error));
    }
  async registerForPushNotifications(){
    
    
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);

    if (status !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (status !== 'granted') {
        return;
      }
    }

   let push_token = await Notifications.getExpoPushTokenAsync();
  

    this.setState({
      pushtoken:push_token,
    });
                        
                        
                        
                   
     let data = {
         push_code:this.state.pushtoken}
// Fields in the post

 const formD = JSON.stringify(data)

    // Create the config object for the POST
    // You typically have an OAuth2 token that you use for authentication
    const config = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
       'Content-Type': 'application/json'
       
      },
      body: formD
    };

    fetch('http://divitech.codejunkie.pk/api/v1/users/update/'+this.state.user_id, config)
      .then(responseData => {
     
       
        this.setState({
            isLoading:false
        })
      
        Actions.home();
      
      })
      .catch(err => {
        console.log(err);
      });
              
    
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
            {this.state.isLoading
            ?
           
         
                <ActivityIndicator style={{justifyContent:'center',alignItems:'center'}} size="small" color="#ffffff" animating />
           
          : (  <Text style={styles.buttonText}>
                 Login  </Text>
          )}
                 
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