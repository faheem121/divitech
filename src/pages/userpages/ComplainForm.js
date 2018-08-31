import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Picker, 
  TouchableOpacity 
} from 'react-native'; 

import {Actions} from  'react-native-router-flux';
import { Icon, Button, Container} from 'native-base';


export default class Form extends Component   {
 
  constructor(){
    super();
    
    this.state={
        text: '', 
      PickerValue : ''
    }
  };

  clided = (pickedvalue) =>{ 
    // alert(pickedvalue);
  }

  gotoCamera = ()=>{
    Actions.camera();
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
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
              />
            </View>

          <Picker 
            onTouchStart={this.clided()}
            selectedValue={this.state.PickerValue}
            style={{ flex:2, height: 10, width: 150, 
            alignSelf:'center',  }}
            onValueChange={(itemValue, itemIndex) => this.clided(itemValue)}>
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
              <Button block info style = {{alignSelf:'center', paddingLeft:15, marginBottom:10, width:'90%'  }}>
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