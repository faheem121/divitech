import React, { Component } from 'react';
import {Container,  Text ,Content,  
     Header, Left, Right, Body, Icon} from 'native-base';
import { View, Platform, AsyncStorage,
     TouchableOpacity, TouchableWithoutFeedback,Keyboard} from 'react-native';
import { Actions } from 'react-native-router-flux';

import {LineDotsLoader} from 'react-native-indicator';

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
            imageUri:'',
            loadingText:'Processing... Please wait',
            canAddComplain:"false",
            // checkingComplain:false
        } 
    }  

    
    getData(){ 
            try{
                AsyncStorage.getItem('canAddComplain').then((value)=> {
                    if(value === "true"){
                        this.setState({
                            canAddComplain:"true" 
                        });  
                    }else{
                        this.setState({
                            canAddComplain:"false",
                            loadingText:"Kindly wait for previous complain to be processed, Thank You !"
                        }); 
                    } 
                }); 
            }catch(e){
                throw e;
            } 
    }
    
    componentDidUpdate(){
        this.getData();
    }
    componentDidMount() {
        this.getData();  
        _out = this;
    }

     _logout() {
        AsyncStorage.removeItem('auth_data');
        Actions.login();
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
            this.state.canAddComplain !=="true"
            ?
            <View style={{flex:1,justifyContent:'center',alignItems:'center', paddingLeft:40, paddingRight:10}}>
                <Text style={{fontSize:16,marginBottom:10,color:'#3D9BF5'}}>{this.state.loadingText}</Text>
                <LineDotsLoader dotsNumber={4} color={'#3d9bf5'}/>
            </View>
          : 
            <DismissKeyboard>
                <Container style={{ marginTop: 23 }} > 
                    <Content>
                        <Header style={{flex:1, backgroundColor:'white', marginBottom:15, flexDirection:'row', alignContent:'center', justifyContent:'space-evenly'}}>
                            <Left   >      
                            </Left> 
                            <Body style={{  alignSelf:'center'}} >
                                <Text style={{ alignSelf:'center'}}>User Panel</Text>
                            </Body>
                            <Right  >  
                                <TouchableOpacity onPress={() => _out._logout() }>
                                    <Icon
                                        name = {Platform.OS === 'ios' ? 'ios-power' : 'md-power'}
                                        style={{paddingRight:10,color:'red'}}
                                    />
                                </TouchableOpacity>
                            </Right>
                        </Header>
                        <ComplainForm imageUri={this.state.imageUri}/> 
                    </Content>
                </Container>	
            </DismissKeyboard>  
        );
    }
}