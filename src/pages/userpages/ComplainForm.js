import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Picker,
} from 'react-native'; 

import {Actions} from  'react-native-router-flux';
import { Icon, Button, Container} from 'native-base';


export default class Form extends Component   {
 
  constructor(){
      super();
      
      this.state={
          complainDescription:'',
          imageUri:'', 
          submitBtnDisabled:true,
          complainType : ''
        }
};
    componentWillReceiveProps(props){

	  // console.log("ComplainForm: ");
	  if(props.imageUri != '' && props.imageUri != null){

		  this.setState({ imageUri: props.imageUri });  
		  this.setState({ submitBtnDisabled:false });
		}
    }

  clided = (cmpln_type) =>{  
  }

  gotoCamera = ()=>{
    Actions.camera();
  }

  finalsubmitComplain = ( complain ) => {

    
	let collection = new FormData();

	collection.append('status', 0);
	collection.append('complain_type', complain.complain_type);
	collection.append('description', complain.complain_description);
	collection.append('reminded_at', "1221");
  collection.append('completed_at', "sdsdds");
  
	collection.append('image',{
    uri:complain.complain_image,
    name:'image.jpg',
    type:"image/jpeg"
  }); 

 
  const config = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data;'
    },
    body: collection
  };

  var url = 'http://divitech.codejunkie.pk/complain/';
  console.log("before sending data: ")  
  console.log(collection)
  console.log("   ")
  console.log("after sending data: ")

  fetch(url, config)
    .then(responseData => {
        alert('News Successfully Submited!')
      console.log(responseData);
    })
    .catch(err => {
      console.log(err);
    });


  }

  

  submitComplain = (   ) => {
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
  }
  
  onPickerValueChange=(value, index)=>{
    this.setState(
      {
        "complainType": value
      },
      () => {
        // here is our callback that will be fired after state change.
        if(this.state.complainDescription != '' && this.state.complainType != ''){
            let complain_desc = this.state.complainDescription;
            let complain_type = this.state.complainType; 
         }
       }
    );
  }
	render(){
 		return( 
        <Container style={{width:'100%'}}>
          <View 
              style={{
                marginTop:10,
                flexDirection:'row',
                shadowColor:'black',
                shadowOpacity:0.2,
                alignSelf:'center',
                elevation:1,
              }}
            >
            <TextInput
                style={{height: 40, width:"90%", borderColor: 'gray', borderWidth: 1}}
                multiline={true}
                placeholder="Complain Description Here"
                onChangeText={(complainDescription) => this.descriptionAdded(complainDescription)}
                value={this.state.complainDescription}
              />
            </View>

          <Picker 
            selectedValue={this.state.complainType}
            style={{ flex:2, height: 10, width: 180, 
            alignSelf:'center',  }}
            onValueChange={this.onPickerValueChange}>
            <Picker.Item label="Select Complain" value="select" />
            <Picker.Item label="Electrical" value="Electrical" />
            <Picker.Item label="IT" value="IT" />
            <Picker.Item label="HVAC" value="HVAC" />
            <Picker.Item label="Lifts" value="Lifts" />
            <Picker.Item label="Gas" value="Gas" />
            <Picker.Item label="Housekeeping" value="Housekeeping" />
            <Picker.Item label="Staff behaviour" value="Staff behaviour" />
            <Picker.Item label="Security" value="Security" />
            <Picker.Item label="Parking" value="Parking" />
            <Picker.Item label="Marketing" value="Marketing" />
            <Picker.Item label="Leasing" value="Leasing" /> 
            <Picker.Item label="Recovery" value="Recovery" /> 
          </Picker>   
              <Button primary style = {{alignSelf:'center', paddingLeft:15, marginBottom:10}} onPress={this.gotoCamera}>
                  <Text style={{color:"white"}} >Add Photo</Text>
                  <Icon style={{color:"white"}} name='camera' />
              </Button>

              {/* submit complain */}
              <Button
                block
                info
                style = {{alignSelf:'center', paddingLeft:15, marginBottom:10, width:'90%'  }}
                onPress = {this.submitComplain}
                disabled={this.state.submitBtnDisabled}
               >
                  <Text style={{color:"white"}} >Submit Data</Text>
               </Button>
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
});