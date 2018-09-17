import React, { Component } from 'react';
import {Container,Thumbnail, Text,View,Card,CardItem,Left,Right,Body,Button ,Content,Icon} from 'native-base';
import { TabNavigator } from 'react-navigation';
import { Image,ActivityIndicator,StyleSheet,AsyncStorage,TouchableOpacity } from 'react-native';
import * as Progress from 'react-native-progress';
import {LineDotsLoader} from 'react-native-indicator';
import {Actions} from 'react-native-router-flux';
export default class PDFReport extends Component {
       static navigationOptions = ({ navigation }) => ({ 

        tabBarIcon:({tintColor})=> {
            return <Icon name="ios-document" style={{color:tintColor}} />
        }
    })
       


       
       constructor(){
        super()
        this.state ={
            CompleteData:[],
            isLoading:true,
            weekLoading:false,
            monthLoading:false,
            yearLoading:false,
            user_id:'',
            token:'',
            group:'',totalcomplain:'',pendingcomplain:'',completedcomplain:'',inreviewcomplains:'',inprogresscomplain:''
        }
    }

    getData(){
      
    setTimeout(() => {
     this.getData();
      this.setState({
        data: 'Hello WallStreet'
      })
    }, 7000)
          //this.allCompletedComplains();
  }
 
    allCompletedComplains = () => {
        const url  ='http://divitech.codejunkie.pk/complain'
        fetch(url)
        .then((response)=>response.json())
        .then((responseJson) => {
            var jsondecode = JSON.stringify(responseJson.data);
            var json = JSON.parse(jsondecode);
       var totalComplains = json.length;
      function isPending(json) {
  return json.status === 0;
}
            var Pending = json.filter(isPending).length;
            
            
       function isCompleted(json) {
  return json.status === 4;
}
            var Completed = json.filter(isCompleted).length;
      function isProgress1(json) {
  return json.status === 1;
}
            var Progress1 = json.filter(isProgress1).length;
            function isProgress2(json) {
  return json.status === 2;
}
            var Progress2 = json.filter(isProgress2).length;
      function isInreview(json) {
  return json.status === 3;
}
            var Inreview = json.filter(isInreview).length;
    
       
            this.setState({
            totalcomplain:totalComplains,
pendingcomplain:Pending,
completedcomplain:Completed,
inreviewcomplains:Inreview,
inprogresscomplain:Progress1+Progress2,
                isLoading:false,
                
            })
        })
        .catch((error) =>{
     console.log(error)
        })
    }
    
     _weekly() {
            this.setState({
              weekLoading:true
        })
         

       const config = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
       
      }
    };
const url = 'http://divitech.codejunkie.pk/complain/generate/7/'+this.state.user_id;
    fetch( url, config)
      .then(responseData => {
     
       
     
        this.setState({
             weekLoading:false
        })
         Actions.pdf({report: '7'});
      })
      .catch(err => {
        console.log(err);
      });
            
            
            
     } 
    
    _monthly() {
            this.setState({
              monthLoading:true
        })
      

       const config = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
       
      }
    };
const url = 'http://divitech.codejunkie.pk/complain/generate/30/'+this.state.user_id;
    fetch( url, config)
      .then(responseData => {
     
       
     
        this.setState({
             monthLoading:false
        })
         Actions.pdf({report: '30'});
      })
      .catch(err => {
        console.log(err);
      });
            
   
     } 

    _yearly() {
            this.setState({
              yearLoading:true
        })
           


       const config = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
       
      }
    };
const url = 'http://divitech.codejunkie.pk/complain/generate/90/'+this.state.user_id;
    fetch( url, config)
      .then(responseData => {
     
       
     
        this.setState({
             yearLoading:false
        })
        Actions.pdf({report: '365'});
      })
      .catch(err => {
        console.log(err);
      });
              
         
     }
    
    componentDidMount(){
           _miss = this;
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
        this.allCompletedComplains();
        
    }
      static navigationOptions = {
              
 
    
        tabBarIcon:({tintColor})=> {
            return <Icon name="ios-document" style={{color:tintColor}} />
        }
    }

    render(){
        return(
            this.state.isLoading
            ?
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
         <Text style={{fontSize:16,marginBottom:10,color:'#3D9BF5'}}>Please wait... </Text>
            <LineDotsLoader dotsNumber={5} color={'#3d9bf5'}/>
            
            </View>
          :
        <Container>
           
                <Content>
       
            
            
             <Card>
            <CardItem style={{flex:1}}>
             
        
                <Body style={{justifyContent:'center',alignItems:'center'}}>
                  <Text style={{fontSize:26,fontWeight: 'bold',color:'#3b323f' ,justifyContent:'center',alignItems:'center'}} >Complains Report</Text>
                
                </Body>
              
            </CardItem>
           
            
            <CardItem style={{flex:1}}>
              <Left>
               <Text style={{fontSize:20, color:'#a3a7bb',fontWeight: 'bold'}}>
            Weekly Report
               </Text>
              </Left>
               <Right>
               <TouchableOpacity  onPress={() => _miss._weekly()} style={styles.button}>
            {this.state.weekLoading
            ?
           
         
                <ActivityIndicator style={{justifyContent:'center',alignItems:'center'}} size="small" color="#ffffff" animating />
           
          : (  <Text style={styles.buttonText}>Mail & View</Text> 
          )}
            
            
            
             
           </TouchableOpacity>
             
              </Right>
            
              
            </CardItem>
            <CardItem style={{flex:1}}>
              <Left>
               <Text style={{fontSize:20, color:'#a3a7bb',fontWeight: 'bold'}}>
            Monthy Report
               </Text>
              </Left>
               <Right>
               <TouchableOpacity  onPress={() => _miss._monthly()} style={styles.button}>
                   
                   
                   
              {this.state.monthLoading
            ?
           
         
                <ActivityIndicator style={{justifyContent:'center',alignItems:'center'}} size="small" color="#ffffff" animating />
           
          : (  <Text style={styles.buttonText}>Mail & View</Text> 
          )}
           </TouchableOpacity>
             
              </Right>
            
              
            </CardItem>
            <CardItem style={{flex:1}}>
              <Left>
               <Text style={{fontSize:20, color:'#a3a7bb',fontWeight: 'bold'}}>
            Yearly Report
               </Text>
              </Left>
               <Right>
               <TouchableOpacity  onPress={() => _miss._yearly()} style={styles.button}>
            {this.state.yearLoading
            ?
           
         
                <ActivityIndicator style={{justifyContent:'center',alignItems:'center'}} size="small" color="#ffffff" animating />
           
          : (  <Text style={styles.buttonText}>Mail & View</Text> 
          )} 
           </TouchableOpacity>
             
              </Right>
            
              
            </CardItem>
           
            
                    
          </Card>
            
           
                </Content>
          
        </Container>
        );
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