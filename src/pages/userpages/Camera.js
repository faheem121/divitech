import React, { Component } from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Vibration
} from 'react-native';

import { Ionicons, Entypo } from '@expo/vector-icons';
import { Thumbnail, Container, Right, Button, Body, Title, Header, Icon, Left  } from 'native-base';
import {Camera,  Permissions, ImagePicker  } from 'expo';
import { Actions } from 'react-native-router-flux'; 

class CameraView extends Component {
 
    constructor(props){
        super(props);
        this.state = {
            hasCameraPermission : null, 
            camera:Camera,
            camType:Camera.Constants.Type.back,
            formCam:'http://thednetworks.com/wp-content/uploads/2012/01/picture_not_available_400-300.png'
        }
    }
    async componentWillMount(){
       const {status} = await Permissions.askAsync(Permissions.CAMERA);
       this.setState({hasCameraPermission : status == 'granted'})
   }

    componentWillReceiveProps(props){
        this.setState({formCam: props.formCam})
    }
 
    async takePicture() {
        if(this.camera){ 
            let photo = await this.camera.takePictureAsync();
            Vibration.vibrate();
            this.setState({
                formCam: photo.uri 
            });
            Actions.image({
                imageUri: this.state.formCam
            });
        } 
    } 

    switchCam(){
        this.setState({
            camType: this.state.camType === Camera.Constants.Type.back 
            ? Camera.Constants.Type.front
            : Camera.Constants.Type.back 
        });
    }

    viewPhoto(){
        Actions.image({
            imageUri: this.state.formCam
        });
    }

    pickImage =  () => {
        Actions.gallery();
    }

    render(){
        const {hasCameraPermission } = this.state;
        if(hasCameraPermission === null){
            return <View />
        }else if(hasCameraPermission == false ){
            return <Text> No Access  to Camera </Text>
        }else{
            return  (
                <Container>
                <Header>
                  <Left>
                    <Button transparent onPress = {() => Actions.pop()}>
                      <Icon name='arrow-back' />
                    <Title>Back</Title>
                    </Button>
                  </Left> 
                  <Right>
                      <Button info style={{height:30}} onPress={this.pickImage}>
                        <Icon name="images" style={{color:'white', top:10, height:50}} />
                      </Button>
                  </Right> 
                </Header>
                <View style={{flex:1}} >
                    <Camera
                     ref={ ref => {this.camera = ref; }}
                     style={{flex:1, justifyContent:'center', alignContent:'center'}}
                     type={this.state.camType} >
                        <View style={{position:'absolute', justifyContent:'space-evenly', height:100,width:'100%', bottom:0, flexDirection:'row'}}>
                            <View style={{ justifyContent:'center', alignItems:'center'}}>
                                <Ionicons onPress={()=>this.switchCam()} name="ios-reverse-camera-outline" size={36} color={'white'} />
                            </View>
                            <View style={{ justifyContent:'center', alignItems:'center'}}>
                                <Entypo onPress={()=>this.takePicture()} name="circle" size={50} color={'white'} />
                            </View>
                            <View style={{ justifyContent:'center', alignItems:'center'}}>
                                <TouchableOpacity onPress={()=>this.viewPhoto()} >
                                <Thumbnail source ={{uri: this.state.formCam}} small />
                                </TouchableOpacity>
                            </View>
                        </View>                   
                    </Camera>
                </View>
            </Container>
            );
        }
    } 
}

export default CameraView;

const styles = StyleSheet.create({

});