import React, { Component } from 'react';
import {Container, Text ,Content,Icon} from 'native-base';
import { TabNavigator } from 'react-navigation';
export default class InReview extends Component {
     static navigationOptions = {
        tabBarIcon:({tintColor})=> {
            return <Icon name="ios-eye" style={{color:tintColor}} />
        }
    }
    render(){
        return(
        <Container>
            <Content>
            <Text>
                
             Complains InReview
               
            </Text>
             </Content>
        </Container>
        );
    }
}
