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
 
    showGallery = async ()=>{
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing:true,
            aspect: [4,3]
        });
        
        if(!result.cancelled){
            
            this.setState({image: result.uri}) ; 
        } 
        console.log(this.state.image);
    }
    imageSelected(){
        Actions.user();
    }
    render() {
    return (  

            <View style={{flex:1, alignItems:'center', alignContent:'center', alignSelf:'center', justifyContent:'center'}}>
            <Text  onPress={this.showGallery} style={{padding:10, color:"white", fontSize:18, backgroundColor:"skyblue"}}>Select and Image</Text>
                {/* <Button info block title="Pick image"  /> */}
                {this.state.image ?(
                    <View >
                        <Image source={{ uri: this.state.image}} style={{marginTop:10, marginBottom:20, width:300, height:230}} />
                        <Button style={{ height:50}} full info   onPress={this.imageSelected}>
                            <Text style={{color:'white'}}> Continue</Text>
                            <Icon name="md-checkbox" style={{color:"white"}} />
                        </Button>
                    </View>
    
                ) :null}
            </View> 
    );
  }
}
  
const styles = StyleSheet.create({
 
})