import React, { Component } from 'react';
import {Container,  Text ,Content,Icon} from 'native-base';
import { View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback,Keyboard} from 'react-native';
import { TabNavigator } from 'react-navigation';

import {Actions} from 'react-native-router-flux';

import ComplainForm from '../userpages/ComplainForm';

const DismissKeyboard = ({children}) =>(
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
  
export default class Complain extends Component {
    constructor(props){
        super();
        this.state = {
            imageUri:''
        } 
    } 

    componentWillReceiveProps(props){
        this.state.imageUri = props.screenProps.imageUri;
        this.setState({imageUri: props.screenProps.imageUri});
    }
    static navigationOptions = {
        tabBarIcon:({tintColor})=> {
            return <Icon name="ios-add" style={{color:tintColor}} />
        }
    }
    render(){
        return(
            <DismissKeyboard>
                <View style={styles.container}> 
                    <Text style={{alignSelf:"center", fontSize:20, fontWeight:'bold', paddingVertical:10}} >
                        {this.props.imageUri?this.props.imageUri:'Add Complain Details'}
                    </Text>
                    <Text style={{alignSelf:"center", fontSize:12, fontWeight:'bold', paddingVertical:10}} >
                        {this.props.imageUri?this.props.imageUri:''}
                    </Text>
                    <ComplainForm imageUri={this.state.imageUri}/> 
                </View>	
            </DismissKeyboard>  
        );
    }
}
const styles = StyleSheet.create({
    container : { 
      flex: 1,
      alignItems:'center',
      justifyContent :'center'
    },
    signupTextCont : {
        flexGrow: 1,
      alignItems:'flex-end',
      justifyContent :'center',
      paddingVertical:16,
      flexDirection:'row'
    },
    signupText: {
        color:'rgba(255,255,255,0.6)',
        fontSize:16
    },
    signupButton: {
        color:'#ffffff',
        fontSize:16,
        fontWeight:'500'
    }
  });
  