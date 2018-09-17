import React, { Component } from 'react';
import { Container, Content, Card, CardItem, Thumbnail,Right, Text, Icon, Left, Body } from 'native-base';
import { TabNavigator } from 'react-navigation';
import { View, StyleSheet,  TextInput, TouchableOpacity ,AsyncStorage } from 'react-native';
import {FlatList,ActivityIndicator,Image,StatusBar} from 'react-native';

import { ImagePicker } from 'expo';

import { KeyboardAvoidingView } from 'react-native';
import {DotsLoader,TextLoader} from 'react-native-indicator';
import {Actions} from 'react-native-router-flux';
import { Button } from 'react-native-elements';
 
export default class News extends Component {
    constructor(props){
        super(props)
        this.state ={
            NewsDatas:[],
            isLoading:true,
            user_id:'',
            token:'',
            group:''
        }
    }
 
    
    renderItem = ({item}) => {
  
        return(
            <View>
        <Card style={{flex: 0}}>
                <TouchableOpacity onPress={() => _detail._newsdetail(item.id)}>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: item.image}} />
                <Body>
            <Text style={{fontWeight: 'bold', fontSize:18}}>{item.title}</Text>
                 
                  <Text note>Submited By Admin</Text>
                </Body>
              </Left>
            </CardItem>
            
            </TouchableOpacity>
                  
          </Card>
                  

       </View>
        )
             
    }
    getData(){
      
    setTimeout(() => {
     this.getData();
      this.setState({
        data: 'Hello WallStreet'
      })
    }, 7000)
          this.allNewsfromData();
  }
allNewsfromData = () => {
    const url  ='http://divitech.codejunkie.pk/news'
        fetch(url)
        .then((response)=>response.json())
        .then((responseJson) => {
       
            this.setState({
                NewsDatas:responseJson.data,
                isLoading:false
            })
        })
        .catch((error) =>{
     console.log(error)
        })
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
        this.getData();
_detail = this;
        this.allNewsfromData();
    }

_newsdetail(id) {
     
        Actions.detailnews({id: id});
    }
      static navigationOptions = {

     
   
            
    
        tabBarIcon:({tintColor})=> {
            return <Icon name="md-paper" style={{color:tintColor}} />
        }
    }
    _complain ()  {
        Actions.addnewsform();
    }
render(){
        return(
           
            this.state.isLoading
            ?
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
       
   <Text style={{fontSize:16,marginBottom:10,color:'#3D9BF5'}}>Please wait... </Text>
            <DotsLoader  color={'#3d9bf5'}/>
            
            </View>
          :
  
       <Container style={{flex:1}}>
                  <StatusBar barStyle = "dark-content" hidden = {false}/>
            
                <Content  >
            <View style={{marginVertical:20}}>
           <Button
  title="Submit News"

onPress={() => this._complain()}
  titleStyle={{ fontWeight: "700" }}
  buttonStyle={{
    backgroundColor: "#3D9BF5",
    width: '100%',
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5
  }}
  containerStyle={{ marginTop: 20 }}
/>
</View>
            
             
            <FlatList
  data={this.state.NewsDatas}
  renderItem={this.renderItem}
            keyExtractor={(item,index)=>index}
        
/>
            
                </Content>
           
        </Container>
        );
    }
}
