import React, { Component } from 'react';
import {Container, Text ,Content,Icon} from 'native-base';
import { TabNavigator } from 'react-navigation';
export default class Status extends Component {
      static navigationOptions = {
        tabBarIcon:({tintColor})=> {
            return <Icon name="ios-list-box-outline" style={{color:tintColor}} />
        }
    }
    render(){
        return(
        <Container>
            <Content> 
            <Text>
                
             Complain Status
               
            </Text>
             </Content>
        </Container>
        );
    }
}
