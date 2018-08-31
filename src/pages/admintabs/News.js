import React, { Component } from 'react';
import {Container, Text ,Content,Icon} from 'native-base';
import { TabNavigator } from 'react-navigation';
export default class News extends Component {
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
             Add News
            </Text>
                </Content>
            
        </Container>
        );
    }
}
