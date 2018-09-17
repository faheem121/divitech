import React, { Component } from 'react';
import { FlatList,Image,View,ActivityIndicator} from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail,Right, Text, Button, Icon, Left, Body } from 'native-base';
import {LineDotsLoader} from 'react-native-indicator';
export default class ComplainDetail extends Component {
     constructor(props){
        super(props)
        this.state ={
            ComplainDetails:[],
            country: '',
            isLoading:true
        }
    }
     
   
    
    componentDidMount(){
        const url  ='http://divitech.codejunkie.pk/complain/'+this.props.id
        fetch(url)
        .then((response)=>response.json())
        .then((responseJson) => {
       
            this.setState({
                ComplainDetails:responseJson.data,
                isLoading:false,
                country: 'Pakistan'
            })
        })
        .catch((error) =>{
     console.log(error)
        })
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
          <Card style={{flex: 0}}>
            <CardItem>
              <Left>
               
                <Body>
            <Text>{this.state.ComplainDetails.user.name}</Text>
                  <Text note>Complain Type : {this.state.ComplainDetails.complain_type}   </Text>
            
                  <Text note>{this.state.ComplainDetails.user.city} , {this.state.country}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image source={{uri:this.state.ComplainDetails.image}} style={{height: 200, width: 200, flex: 1}}/>
                <Text>
              {this.state.ComplainDetails.description}
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
               
                 
                  <Text>{this.state.ComplainDetails.user.street_addr}  </Text> 
              
              </Left>
            <Right>
                <Text>{this.state.ComplainDetails.user.phone}  </Text>
                <Text>{this.state.ComplainDetails.user.mobile}  </Text>
              </Right>
            </CardItem>
          </Card> 
        </Content>
      </Container>
            
                
      
        );
    }
}

  
  
