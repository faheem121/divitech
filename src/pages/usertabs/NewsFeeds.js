import React, { Component } from 'react';
import {Container, Text ,Content,Icon} from 'native-base';
import { TabNavigator } from 'react-navigation';
export default class NewsFeeds extends Component {
      static navigationOptions = {
        tabBarIcon:({tintColor})=> {
            return <Icon name="md-paper" style={{color:tintColor}} />
        }
    }
    render(){
        return(
        <Container>
            <Content> 
            <Text>
                
             User NewsFeeds
               
            </Text>
             </Content>
        </Container>
        );
    }
}
