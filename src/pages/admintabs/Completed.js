import React, { Component } from 'react';
import {Container, Text ,Content,Icon} from 'native-base';
import { TabNavigator } from 'react-navigation';
export default class Completed extends Component {
      static navigationOptions = {
        tabBarIcon:({tintColor})=> {
            return <Icon name="ios-checkmark-circle" style={{color:tintColor}} />
        }
    }
    render(){
        return(
        <Container>
            <Content> 
            <Text>
                
             Complains Completed
               
            </Text>
             </Content>
        </Container>
        );
    }
}
