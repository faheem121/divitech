import React, { Component } from 'react';
import {Container, Text ,Content,Icon} from 'native-base';
import { TabNavigator } from 'react-navigation';
export default class Pending extends Component {
    static navigationOptions = {
        tabBarIcon:({tintColor})=> {
            return <Icon name="ios-sync" style={{color:tintColor}} />
        }
    }
    render(){
        return(
        <Container>
           
                <Content>
             <Text>
             Complains Pending
             </Text>
                </Content>
           
        </Container>
        );
    }
}
