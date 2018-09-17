import React, { Component } from 'react';
import {Container ,Card,
CardItem,
Left,
Body,
Right ,Content,Icon} from 'native-base';
import { Alert } from 'react-native'; // Import

import InReview from './InReview';
import {FlatList,StyleSheet,Text,View,ActivityIndicator,Image,TouchableOpacity,AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {LineDotsLoader} from 'react-native-indicator';
const timer = require('react-native-timer');
export default class Pending extends Component {
    constructor(props){
        super(props)
        this.state ={
             showMsg: false,
            dataSource:[],
            isLoading:true,
            refreshing:false,
            user_id:'',
            token:'',
            group:''
        }
    }
 
    renderItem = ({item}) => {
     
              
                 if(item.status == 0 ){
        return(
            <View style={{ flex:1,marginBottom:8}}>
             <Card style={{flex: 0}}>
            <TouchableOpacity onPress={() => this._complain(item.id)}>
            <CardItem>
              <Left>
            
                <Body>
            <Text style={{fontWeight: 'bold', fontSize:20}}>{item.user.name}</Text>
                  <Text note>Complain Type : {item.complain_type}</Text>
                   <Text note>{item.user.phone} </Text>
                </Body>
              </Left>
            </CardItem>
                   </TouchableOpacity>
                   <CardItem>
                   <Left>
                   <TouchableOpacity onPress={() => _first._start(item.id)} style={styles.button}>
             <Text style={styles.buttonText}>Start</Text> 
           </TouchableOpacity>
             </Left>
             <Right>
                 <TouchableOpacity  onPress={() => this._complain(item.id)} style={styles.button}>
             <Text style={styles.buttonText}>Detail</Text> 
           </TouchableOpacity>
             </Right>
            </CardItem>
          </Card>
      
                      
  	
                  </View>
        )
             }
    }
    
 
    allPendingComplains = () => {
         
        const url  ='http://divitech.codejunkie.pk/complain'
        fetch(url)
        .then((response)=>response.json())
        .then((responseJson) => {
       
            this.setState({
                dataSource:responseJson.data,
                isLoading:false,
                refreshing:false
            })
        })
        .catch((error) =>{
            console.log(error)
        })
        
    }
    static navigationOptions = {
        tabBarIcon:({tintColor})=> {
            return <Icon name="ios-sync" style={{color:tintColor}} />
        }
    }
      

getData(){
      
    setTimeout(() => {
     this.getData();
      this.setState({
        data: 'Helt'
      })
    }, 7000)
          this.allPendingComplains();
  }
      
      

        _start(id){
           Alert.alert(
  'Start to proceed',
  'Are You Sure?',
  [
    {text: 'Yes', onPress: () => {
    
       
            this.setState({
                isLoading:true 
            })
            var formData = new FormData();
     
// Fields in the post
formData.append("status",1); 

       const config = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data;'
       
      },
      body: formData
    };
const url = 'http://divitech.codejunkie.pk/complain/'+id+'/update';
    fetch( url, config)
      .then(responseData => {
     
        //console.log(responseData);
        this.setState({
           
           refreshing:true
            
       }, ()=> {
         this.allPendingComplains();
       })
        this.setState({
             isLoading:false
        })
      })
      .catch(err => {
        console.log(err);
      });
    
    
    }},
    {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},

  ],
  { cancelable: false }
)
          
            
        }
            _complain(id) {
     
        Actions.detailcomplain({id: id});
    }
 componentDidMount (){
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
      _miss = this;
      _this = this;
          _third = this;
          _first = this;
          _second = this;
      this.allPendingComplains();
 }
  onRefresh() {
  
       alert('calling')
       this.setState({
           
           refreshing:true
       }, ()=> {
         this.allPendingComplains();
       })
       
   }

    render(){
        return(
            this.state.isLoading
            ?
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:16,marginBottom:10,color:'#3D9BF5'}}>Please wait... </Text>
            <LineDotsLoader dotsNumber={4} color={'#3d9bf5'}/>
            
            </View>
          :
        <Container style={{flex:1}}>
           
                <Content  >
            
            
             
            <FlatList
  data={this.state.dataSource}
  renderItem={this.renderItem}
            keyExtractor={(item,index)=>index}
refreshing={this.state.refreshing}
  onRefresh={() => onRefresh()}
        
/>
            
                </Content>
           
        </Container>
        )
    }
}
const styles = StyleSheet.create({

  button: {
    width:'90%',
    backgroundColor:'#3D9BF5',
borderRadius:10,
      marginVertical: 10,
      paddingVertical: 13
  },
  buttonText: {
    fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
  }
  
});