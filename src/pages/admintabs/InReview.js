import React, { Component } from 'react';
import {Container ,Card,
CardItem,
Left,
Body,
Right ,Content,Icon} from 'native-base';
import {FlatList,Platform,Alert,StyleSheet,Text,View,ActivityIndicator,Image,TouchableOpacity,AsyncStorage} from 'react-native';
import { TabNavigator } from 'react-navigation';
import {LineDotsLoader} from 'react-native-indicator';
import {Actions} from 'react-native-router-flux';
export default class InReview extends Component {
    constructor(props){
        super(props)

        this.state ={
            ReviewData:[],
            isLoading:true, refreshing:false, data: 'hi',
            user_id:'',
            token:'',
            group:''
        }
    }
    getData(){
      
    setTimeout(() => {
     this.getData();
      this.setState({
        data: 'Hello WallStreet'
      })
    }, 7000)
          this.allInReviewComplains();
  }
    renderItem = ({item}) => {
                if(item.status == 1 ){
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
                   <TouchableOpacity onPress={() => _second._todepart(item.id)} style={styles.button}>
             <Text style={styles.buttonText}>To Department</Text> 
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
   else if(item.status == 3 ){
        return(
                   <View style={{ flex:1,marginBottom:8}}>
             <Card style={{flex: 0}}>
            <TouchableOpacity onPress={() => this._complain(item.id)}>
            <CardItem>
              <Left>
            
                <Body>
            <Text style={{fontWeight: 'bold', fontSize:20}}>{item.user.name}</Text>
                  <Text note>Complain Type : {item.complain_type}</Text>
                  <Text note>{item.user.phone}</Text>
                </Body>
                 
              </Left>
            </CardItem>
            
           
                   </TouchableOpacity>
                   <CardItem>
                   <Left>
        
             <Text style={styles.textstatus}>Wait for Confirmation by Client</Text> 
        
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
             }else if(item.status == 2 ){
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
                   <TouchableOpacity onPress={() => _third._assigned(item.id)}style={styles.button}>
             <Text style={styles.buttonText}>Assign</Text> 
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
    
      _todepart(id){
           Alert.alert(
  'Send to Department',
  'Are You Sure?',
  [
    {text: 'Yes', onPress: () => {
    
            this.setState({
             isLoading:true
        })
          var formData = new FormData();
     
// Fields in the post
formData.append("status",2); 

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
         
           this.setState({
           refreshing:true
       }, ()=> {
         this.allInReviewComplains();
       })
             this.setState({
             isLoading:false
        })

        //console.log(responseData);
      })
      .catch(err => {
        console.log(err);
      });
            }},
    {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},

  ],
  { cancelable: false }
)   }


_complain(id) {
     
        Actions.detailcomplain({id: id});
    }
        _assigned(id){
                       Alert.alert(
  'Assign to Worker',
  'Are You Sure?',
  [
    {text: 'Yes', onPress: () => {
            
            
              this.setState({
             isLoading:true
        })
 var formData = new FormData();
     
// Fields in the post
formData.append("status",3); 

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
         this.allInReviewComplains();
       })
             this.setState({
             isLoading:false
        })
             this.forceUpdate();
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


 allInReviewComplains = () => {
             const url  ='http://divitech.codejunkie.pk/complain'
        fetch(url)
        .then((response)=>response.json())
        .then((responseJson) => {
       
            this.setState({
                ReviewData:responseJson.data,
                isLoading:false,
                refreshing:false
            })
        })
        .catch((error) =>{
     console.log(error)
        })
 }
    
    componentDidMount(){
        _second = this;
        _third = this;
         _miss= this;
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
        this.allInReviewComplains(); 
        _load = this;
    }
     static navigationOptions = {
        tabBarIcon:({tintColor})=> {
            return <Icon name="ios-eye" style={{color:tintColor}} />
        }
    }
     _handleRefresh () {
  
       
       this.setState({
           refreshing:true
       }, ()=> {
           this.allInReviewComplains(); 
        
       })
       
   };
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
  data={this.state.ReviewData}
  renderItem={this.renderItem}
            keyExtractor={(item,index)=>index}
        refreshing={this.state.refreshing}
onRefresh={_load._handleRefresh}

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