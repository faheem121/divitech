import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native'; 
import { Button, Icon } from 'native-base'; 
// import Icon from 'expo';

import {Actions } from 'react-native-router-flux';
 
export default class ImageView extends React.Component {
    imageSelected(){
        Actions.user();
    }
  render() {
    return ( 
        <View style={{flex:1}} > 
            <Image 
            source={{uri:this.props.imageUri}}
            resizeMode="cover"
            style={{flex:1, width:'100%',height:'100%'}} />
            <View style={{ flexDirection:'row', justifyContent:'space-around'}}>
            <Button style={{flex:1, }} full onPress={() => retake()} >
                <Icon name="md-reverse-camera" style={{color:"white"}} />
                <Text style={{color:'white'}}> retake</Text>
            </Button>
            <Button style={{flex:1}} full info onPress={ this.imageSelected} >
                <Text style={{color:'white'}}> Continue</Text>
                <Icon name="md-checkbox" style={{color:"white"}} />
            </Button>
            </View>
        </View>
    );
  }
}
 retake = ()=>{
     Actions.pop();
     setTimeout(()=>{
        Actions.refresh({
            formCam:'http://thednetworks.com/wp-content/uploads/2012/01/picture_not_available_400-300.png'
            
        })
     }, 0);

 }
const styles = StyleSheet.create({
 
})