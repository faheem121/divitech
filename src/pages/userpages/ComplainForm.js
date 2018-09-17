import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  TouchableOpacity,
  AsyncStorage
} from 'react-native'; 
import {LineDotsLoader} from 'react-native-indicator';

import {Actions} from  'react-native-router-flux';
import { 
  Icon,
  Button,
  Input,
  Form, 
  Content,
  Item, 
  Picker,
  Container
} from 'native-base';


export default class ComplainForm extends Component   {
 
  constructor(){
    super();
    
    this.state={
        complainDescription:'',
        imageUri:'', 
        submitBtnDisabled:true,
        complainType : '',
        user_id:'',
        isLoading:false,
        token:'',
        group:'',
        imageSelected:null
        }
  };

  clearFormData(){
    this.setState({
      complainDescription:'',
      imageUri:'', 
      submitBtnDisabled:true,
      complainType : '',
      user_id:'',
      isLoading:false,
      token:'',
      group:'',
      imageSelected:null
    });
  }
    componentWillReceiveProps(props){
      // console.log("ComplainForm: ");
      if(props.imageUri != '' && props.imageUri != null){
        this.setState({ imageUri: props.imageUri });  
        this.setState({ imageSelected: true });   
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
        Action.login()
      }
    })
  }

  gotoCamera = ()=>{
    Actions.camera();
  }

  finalsubmitComplain = ( complain ) => {

    let collection = new FormData();
    collection.append('status', 0);
    collection.append('complain_type', complain.complain_type);
    collection.append('description', complain.complain_description); 
    collection.append('user_id', this.state.user_id);
    if(complain.complain_image){

      collection.append('image',{
        uri:complain.complain_image,
        name:'image.jpg',
        type:"image/jpeg"
      }); 
    }
    
    const config = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      },
      body: collection
    };

    var url = 'http://divitech.codejunkie.pk/complain/';
    console.log("before sending data: ")  
    console.log(collection)
    console.log("   ")
    console.log("after sending data: ");

    fetch(url, config)
      .then(responseData => {
        this.setState({
          isLoading:false
        })
        alert('Complain Successfully Submited!');

        this.clearFormData();
        AsyncStorage.setItem('canAddComplain', "false");
        console.log(responseData);
      })
      .catch(err => {
        console.log("error sending complain to server: ");
        console.log(err);
      }); 
  } 

  submitComplain = (   ) => {
    this.setState({
        isLoading:true
    })
    //validating form data before sending it to submit function
    //check if both the complain description and complain type are set in the form then alert and enable submit button
    let complain_desc = "";
    let complain_type = "";
    let complain_img_uri = "";

    if(this.state.complainDescription != '' && this.state.complainType != ''){
      complain_desc = this.state.complainDescription;
      complain_type = this.state.complainType; 
      this.state.submitBtnDisabled = false;
    }
    complain_img_uri = this.state.imageUri;
    let complain = {};
    complain = {
      'complain_description': complain_desc,
      'complain_type': complain_type,
      'complain_image': complain_img_uri
    }
    this.finalsubmitComplain(complain);	
  }

  descriptionAdded(complain_desc){
    this.setState({ complainDescription: complain_desc });
    if(this.state.complainDescription != '' && this.state.complainType != ''){
      complain_desc = this.state.complainDescription;
      complain_type = this.state.complainType; 
      this.state.submitBtnDisabled = false;
    }

  }
  
  onPickerValueChange=(value, index)=>{
    this.state.submitBtnDisabled = false;
    if (value !== 0) {
      this.setState(
        {
          "complainType": value
        },
        () => {
          // here is our callback that will be fired after state change.
          if(this.state.complainDescription != '' && this.state.complainType != ''){
              let complain_desc = this.state.complainDescription;
              let complain_type = this.state.complainType; 
              this.state.submitBtnDisabled = false;
          }
        }
      );
    }
  }
  
  render(){
 		return( 
      this.state.isLoading
      ?
        <View style={{flex:1,justifyContent:'center',alignItems:'center', paddingHorizontal:20}}>
        <Text style={{fontSize:16,marginBottom:10,color:'#3D9BF5'}}>Submitting Complain... </Text>     
            <LineDotsLoader dotsNumber={4} color={'#3d9bf5'}/>
        </View>
      :
        <Container style={{flex:1, width:'100%', paddingHorizontal:10}} >
          <Content>
            <Form style={{ flex:1, flexDirection:'column', justifyContent:'space-around' }}>
              <Item  style={{flex:1, marginTop:'4%', marginRight:15}}>
                <Input
                  style={styles.inputBoxd}
                  multiline={true}
                  placeholder="Complain Description Here"
                  underlineColorAndroid='rgba(0,0,0,0)'
                  onChangeText={(complainDescription) => this.descriptionAdded(complainDescription)}
                  value={this.state.complainDescription}
                  />
              </Item>
              <Item picker style={{
                  flex:1,
                  marginLeft:Platform.OS == 'android' ? 10: null,
                  marginRight:Platform.OS == 'android' ? 10: null,
                   borderWidth:Platform.OS == 'android' ? 0.5:0.5,
                  borderRadius:Platform.OS == 'android' ? 5:5,
                  alignSelf:'center',
                  marginVertical:'8%',
                  padding:0,
                  borderBottomColor:'transparent' }}>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="ios-arrow-down-outline" />}
                  style={{ flex:1,  borderColor:'grey',  borderWidth:3.5, borderRadius:5 }}
                  placeholder="Select Complain"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  underlineColorAndroid="transparent"
                  selectedValue={this.state.complainType}
                  onValueChange={this.onPickerValueChange.bind(this)}
                  >
                    <Picker.Item label="Complain Type" value="0" />
                    <Picker.Item label="Security" value="Security" />
                    <Picker.Item label="Staff behaviour" value="Staff behaviour" />
                    <Picker.Item label="Electrical" value="Electrical" />
                    <Picker.Item label="IT" value="IT" />
                    <Picker.Item label="Lifts" value="Lifts" />
                    <Picker.Item label="HVAC" value="HVAC" />
                    <Picker.Item label="Housekeeping" value="Housekeeping" />
                    <Picker.Item label="Parking" value="Parking" />
                    <Picker.Item label="Leasing" value="Leasing" />
                    <Picker.Item label="Recovery" value="Recovery" />
                    <Picker.Item label="Gas" value="Gas" />
                    <Picker.Item label="Marketing" value="Marketing" />
                </Picker>   
              </Item>
            {
                !this.state.imageSelected
              ?
              <Button primary block style = {{alignSelf:'center', marginTop:'8%', marginBottom:'2%', paddingLeft:15,  width:'90%'     }} onPress={this.gotoCamera}>
                <Text style={{color:"white"}} >Add Photo</Text>
                  <Icon style={{color:"white"}} name='camera' /> 
              </Button>
              :
              <Button success block style = {{alignSelf:'center', marginTop:50, marginBottom:'2%', paddingLeft:15,  width:'90%'     }} >
                <Text style={{color:"white"}} >Image selected</Text>
                </Button>
            }
            <Button
            block
            info
            style = {{alignSelf:'center', paddingLeft:15,  width:'90%'  }}
            onPress = {this.submitComplain}
            disabled={this.state.submitBtnDisabled}
            >
            <Text style={{color:"white"}} >Submit Data</Text>
          </Button>
          </Form>
          </Content>
        </Container>
			)
	}
}

const styles = StyleSheet.create({
  container : {
    backgroundColor:"#a3a7bb",
    flex: 1, 
    flexDirection:'column',
    alignItems:'center',
    alignContent:'center',
    justifyContent :'space-evenly'  
  },
  inputBoxd: {
    flex:1,
    borderColor: 'blue',
    borderWidth: 0.5,
    height:100,
    backgroundColor:'#ffffff',
    borderRadius: 5, 
    fontSize:16,
    color:'#3b323f', 
  },
});