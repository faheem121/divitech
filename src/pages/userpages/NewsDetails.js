import React, { Component } from 'react';
import { Image,View,ActivityIndicator} from 'react-native';
import { Container, Content, Card, CardItem, Right, Text, Left, Body } from 'native-base';


export default class UserNewsDetail extends Component {

     constructor(props){
        super(props)
        console.log("new details props: ");
        console.log(props);
        this.state ={
            newsDetails:[],
            country: '',
            isLoading:true
        }
    } 
    
    componentDidMount(){ 
        const url  ='http://divitech.codejunkie.pk/news/'+this.props.data
        fetch(url)
        .then((response)=>response.json())
        .then((responseJson) => {
            console.log(responseJson);
            this.setState({
                newsDetails: responseJson.data,
                isLoading: false,
                country: 'Pakistan'
            })
        })
        .catch((error) =>{
            console.log("Caught Error: ");
            console.log(error)
        })
    }

    render(){     
        return(
            this.state.isLoading
            ?
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator size="large" color="#330066" animating />        
                </View>
            :
            <Container>
                <Content>
                    <Card style={{flex: 0, alignItems:'center'}}>
                        <CardItem>
                            <Left>        
                                <Body style={{alignItems:'center'}}>
                                    <Text>{this.state.newsDetails.title}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Image source={{uri:this.state.newsDetails.image}} style={{height: 200, width: 200, flex: 1, alignSelf:'center'}}/>
                                <Text style={{alignSelf:'center',marginTop:10}}>
                                    {this.state.newsDetails.description}
                                </Text>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}