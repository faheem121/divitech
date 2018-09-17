import React, { Component } from 'react';
import { AsyncStorage,Image,View,ActivityIndicator} from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail,Right, Text, Button, Icon, Left, Body } from 'native-base';
import {LineDotsLoader} from 'react-native-indicator';
import { StyleSheet } from 'react-native';
import PDFReader from 'rn-pdf-reader-js'; 
import { Constants } from 'expo';
export default class PDFFil extends Component {
     constructor(props){
        super(props)
        this.state ={
        url:'',
        month:'',
        year:'',
        group:'',
        token:'',
        user_id:''
        }
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
                        Actions.login()
                    }
                    
                })
                console.log(this.props.report)       
               if(this.props.report === '7'){
                     AsyncStorage.getItem('auth_data').then((value)=> {
                    if(value !== null){
                         var value = JSON.parse(value)
                         var user = value[0].user_id.toString(); 
                  const file = user+'.pdf';
                 
                  const u = 'https://divitech.codejunkie.pk/storage/app/uploads/pdf/weekly/'+file;
                   this.setState({
                       url:u
                   })
                   console.log('check good')
                    alert('Weekly Report of last 7 Days has been successfully sent to your email');
                           
                    }else{
                        Actions.login()
                    }
                    
                })
                   
           
               }else if (this.props.report === '30'){
                    AsyncStorage.getItem('auth_data').then((value)=> {
                    if(value !== null){
                         var value = JSON.parse(value)
                  const file = value[0].user_id+'.pdf';
                 
                  const u = 'http://divitech.codejunkie.pk/storage/app/uploads/pdf/monthly/'+file;
                   this.setState({
                       url:u
                   })
                        alert('Monthly Report of last 30 Days has been successfully sent to your email');     
                    }else{
                        Actions.login()
                    }
                    
                })
                  
           
               }else if (this.props.report === '365'){
                     AsyncStorage.getItem('auth_data').then((value)=> {
                    if(value !== null){
                         var value = JSON.parse(value)
                  const file = value[0].user_id+'.pdf';
                 
                  const u = 'http://divitech.codejunkie.pk/storage/app/uploads/pdf/yearly/'+file;
                   this.setState({
                       url:u
                   })
                    alert('Yearly Report of last 365 Days has been successfully sent to your email');
                           
                    }else{
                        Action.login()
                    }
                    
                })
                    
           
               }else{
                   console.log('no')
               }
           console.log(this.state.url)
    }

    render(){

        return(
             this.state.url
            ?
             <View style={styles.container}>
        <PDFReader
          source={{uri :  this.state.url+'' }}
        />
      </View>
          :
      <View style={styles.container}>
        
      </View>
        );
    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
});

  
