import React from 'react';
import { StyleSheet, Image,  Text, View } from 'react-native'; 
import { Button, Icon} from 'native-base'; 
import {ImagePicker, Permissions} from 'expo';

import {Actions } from 'react-native-router-flux';
 
export default class GalleryView extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            image:'',
            hasCameraRollPermission:null
        }
    }
  
    async componentWillMount(){
        
        const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        
        this.setState({hasCameraRollPermission : status == 'granted'})
    }
 
    _showGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing:false,
            aspect: [4,3]
        });
        
        if(!result.cancelled){
            console.log("result not cancelled");
            this.setState({image: result.uri}) ; 
        } 
    }



    render() {
    return (  
        <View style={{flex:1, alignItems:'center', alignContent:'center', alignSelf:'center', justifyContent:'center'}}>
        <Text  onPress={this._showGallery.bind(this)} style={{padding:10, color:"white", fontSize:18, backgroundColor:"skyblue"}}>Select and Image</Text>
            {/* <Button info block title="Pick image"  /> */}
            {this.state.image ?(
                <View >
                    <Image source={{ uri: this.state.image}} style={{marginTop:10, marginBottom:20, width:300, height:230}} />
                    <Button style={{ height:50}} full info   onPress={ this._imageSelected.bind(this)}>
                        <Text style={{color:'white'}}> Continue text</Text>
                        <Icon name="md-checkbox" style={{color:"white"}} />
                    </Button>
                </View>

            ) :null}
        </View> 
    );
  }
  _imageSelected = () =>{ 
      Actions.user({imageUri:this.state.image});
  }
}
  
const styles = StyleSheet.create({
 
})