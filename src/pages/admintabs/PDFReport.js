import React, { Component } from 'react';
import {Container, Text ,Content,Icon} from 'native-base';
import { TabNavigator } from 'react-navigation';
export default class PDFReport extends Component {
     static navigationOptions = {
        tabBarIcon:({tintColor})=> {
            return <Icon name="ios-document" style={{color:tintColor}} />
        }
    }
    render(){
        return(
        <Container>
           
                <Content>
             <Text>
             Complains PDFReport
              </Text>
                </Content>
          
        </Container>
        );
    }
}
