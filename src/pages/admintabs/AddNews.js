import React, { Component } from 'react';
import {Container, Text ,Content,Icon} from 'native-base';
import { TabNavigator } from 'react-navigation';
import { Image, View, StyleSheet, ActivityIndicator, TextInput, TouchableOpacity ,AsyncStorage } from 'react-native';
import {LineDotsLoader} from 'react-native-indicator';
import { ImagePicker } from 'expo';

import { KeyboardAvoidingView } from 'react-native';

import {Actions} from 'react-native-router-flux';
import { Button } from 'react-native-elements';

export default class AddNewsForm extends Component<{}> {



    state = {
    image: null,
  };

    constructor()
    {
        super();
        this.state = {
            title:'',
            description: '',
            user_id:'',
            token:'',
            group:'',
            isLoading:false
        }
    }
    
    updateValue(text,field) 
    {
       if(field == 'title'){
           this.setState({
               title:text,
           })
       }
        else if(field == 'description'){
            this.setState({
                description:text,
                
            })
        }
    }
        
    componentDidMount(){
      
            AsyncStorage.getItem('auth_data').then((value)=> {
                    if(value !== null){
                         var value = JSON.parse(value)
                 this.setState({
                     user_id:value[0].user_id,
                     token:value[0].token,
                     group:value[0].group,
                 })
                      
                    }else{
                        Actions.login()
                    }
                    
                })
   
  
    }
   submit()
    {
      this.setState({
          isLoading:true
      })
        
        
      
var formData = new FormData();
     
// Fields in the post
formData.append("title",this.state.title);
formData.append("description",this.state.description);
 
  if (this.state.image) {
    // Create the form data object

    formData.append('image', {
      uri: this.state.image.uri,
      name: 'selfie.jpg',
      type: this.state.image.type
    });
}
    // Create the config object for the POST
    // You typically have an OAuth2 token that you use for authentication
    const config = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data;'
       
      },
      body: formData
    };

    fetch('http://divitech.codejunkie.pk/news', config)
      .then(responseData => {
         alert('News Successfully Submited!')
        
        this.setState({
            isLoading:false
        })
         Actions.home();
        //console.log(responseData);
      })
      .catch(err => {
        console.log(err);
      });
  
// pictureSource is object containing image data.



      }
    logout = async () => {
        alert('you are Loggedout ')
    } 
      static navigationOptions = {

        tabBarIcon:({tintColor})=> {
            return <Icon name="ios-add" style={{color:tintColor}} />
        }
    }

    render(){
        let { image } = this.state;
        return(
             this.state.isLoading
            ?
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
       <Text style={{fontSize:16,marginBottom:10,color:'#3D9BF5'}}>Submitting News... </Text>
            
            <LineDotsLoader dotsNumber={4} color={'#3d9bf5'}/>
            </View>
          :
            
        <Container >
           
                <Content>
             <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            
            <Text style={styles.logoText}>Submit a News</Text>	
            
            <KeyboardAvoidingView style={{flexGrow: 1,
    justifyContent:'center',
    alignItems: 'center'}} behavior="padding" enabled>
          <TextInput style={styles.inputBox} 
            onChangeText={(text) => this.updateValue(text,'title')}
              underlineColorAndroid='rgba(0,0,0,0)' 
              placeholder="Title"
              placeholderTextColor = "#3b323f" 
              selectionColor="#3b323f"
              onSubmitEditing={()=> this.description.focus()}
              />
          <TextInput style={styles.inputBoxd} 
              underlineColorAndroid='rgba(0,0,0,0)' 
              onChangeText={(text) => this.updateValue(text,'description')}
              placeholder="Description"
              multiline={true}
              placeholderTextColor = "#3b323f"
              ref={(input) => this.description = input}
              />  
              
  		</KeyboardAvoidingView>
        <TouchableOpacity style={{ backgroundColor:'#3D9BF5',marginVertical: 20,width: 300,height:55, borderRadius: 5 ,alignItems: 'center', justifyContent: 'center'}}
     
          onPress={this._pickImage}
            >
         <Text style={{color:'#ffffff'}}>Select a Photo</Text>
        
        </TouchableOpacity>
         {image &&
          <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />
            }
        <TouchableOpacity onPress= {()=>this.submit()} style={{ backgroundColor:'#3D9BF5',marginVertical: 20,width: 300,height:55, borderRadius: 5 ,alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color:'#ffffff'}}>Submit</Text>
      </TouchableOpacity>
       
      </View>
                </Content>
            
        </Container>
        );
    }
     
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
    
    });

    console.warn(result);

    if (!result.cancelled) {
       
      this.setState({ image: result });
    }
  };
}

const styles = StyleSheet.create({


  inputBox: {
    width:300,
      height:45,
    backgroundColor:'#ffffff',
    borderRadius: 5,
      borderColor: 'blue',
      borderWidth: 0.5,
    paddingHorizontal:16,
    fontSize:16,
    color:'#3b323f',
    marginVertical: 5
  },inputBoxd: {
    width:300,
        borderColor: 'blue',
      borderWidth: 0.5,
      height:100,
    backgroundColor:'#ffffff',
    borderRadius: 5,
    paddingHorizontal:16,
    fontSize:16,
    color:'#3b323f',
    marginVertical:5
  },
    
  logoText : {
  	marginVertical: 30,
  	fontSize:30,
  	color:'#3b323f'
  }
  
});