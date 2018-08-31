import React, { Component } from 'react';
import {Container, Text ,Content,Icon} from 'native-base';
import { TabNavigator } from 'react-navigation';
export default class Complain extends Component {
      static navigationOptions = {
        tabBarIcon:({tintColor})=> {
            return <Icon name="ios-add" style={{color:tintColor}} />
        }
    }
    render(){
        return(
        <Container>
            <Content> 
            <Text>
                
             Add Complain
               
            </Text>
             </Content>
        </Container>
        );
    }
}
