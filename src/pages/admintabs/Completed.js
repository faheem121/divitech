import React, { Component } from 'react';
import {Container ,Card,
CardItem,
Left,
Body,
Right ,Content,Icon} from 'native-base';
import {FlatList,StyleSheet,Text,View,ActivityIndicator,Image,TouchableOpacity,AsyncStorage} from 'react-native';
import { TabNavigator } from 'react-navigation';
import {LineDotsLoader} from 'react-native-indicator';
import {Actions} from 'react-native-router-flux';
export default class Completed extends Component {
      constructor(){
        super()
        this.state ={
            CompleteData:[],
            isLoading:true,
            user_id:'',
            token:'',
            group:''
        }
    }
     
    renderItem = ({item}) => {
   if(item.status == 4 ){
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
            
             <Text style={styles.textstatus}>Completed </Text> 
         
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
    getData(){
      
    setTimeout(() => {
     this.getData();
      this.setState({
        data: 'Hello WallStreet'
      })
    }, 7000)
          this.allCompletedComplains();
  }
 
    allCompletedComplains = () => {
        const url  ='http://divitech.codejunkie.pk/complain'
        fetch(url)
        .then((response)=>response.json())
        .then((responseJson) => {
       
            this.setState({
                CompleteData:responseJson.data,
                isLoading:false
            })
        })
        .catch((error) =>{
     console.log(error)
        })
    }
    _complain(id) {
     
        Actions.detailcomplain({id: id});
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
                        Actions.login()
                    }
                    
                })
     
        this.allCompletedComplains();
        
    }

      static navigationOptions = {
              
 
    
        tabBarIcon:({tintColor})=> {
            return <Icon name="ios-checkmark-circle" style={{color:tintColor}} />
        }
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
  data={this.state.CompleteData}
  renderItem={this.renderItem}
            keyExtractor={(item,index)=>index}
        
/>
            
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
  },
    textstatus:{
         width:'90%',
    backgroundColor:'#a3a7bb',
borderRadius:10,
      marginVertical: 10,
      paddingVertical: 13,
 fontSize:16,
    fontWeight:'500',
    color:'#ffffff',
    textAlign:'center'
    }
  
});