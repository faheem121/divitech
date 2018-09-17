import React, { Component } from 'react';
import { FlatList,Image,View,ActivityIndicator} from 'react-native';
import {LineDotsLoader} from 'react-native-indicator';
import { Container, Content, Card, CardItem, Thumbnail,Right, Text, Button, Icon, Left, Body } from 'native-base';
export default class NewsDetail extends Component {
     constructor(props){
        super(props)
        this.state ={
            NewsDetails:[],
            country: '',
            isLoading:true
        }
    }
     
   
    
    componentDidMount(){
        const url  ='http://divitech.codejunkie.pk/news/'+this.props.id
        fetch(url)
        .then((response)=>response.json())
        .then((responseJson) => {
       
            this.setState({
                NewsDetails:responseJson.data,
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
            <Text>{this.state.NewsDetails.title}</Text>
                 
                  <Text note>Submited By Admin</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image source={{uri:this.state.NewsDetails.image}} style={{height: 200, width: 200, flex: 1}}/>
                <Text>
              {this.state.NewsDetails.description}
                </Text>
              </Body>
            </CardItem>
            
          </Card>
        </Content>
      </Container>
            
                
      
        );
    }
}

  
  
