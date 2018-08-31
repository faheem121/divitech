import React, { Component } from 'react';
import {Container, Text ,Content,Icon} from 'native-base';
import { TabNavigator } from 'react-navigation';
import  News  from './admintabs/News';
import  Completed  from './admintabs/Completed';
import  Pending from './admintabs/Pending';
import  InReview  from './admintabs/InReview';
import  PDFReport  from './admintabs/PDFReport';
export default class AddNews extends Component {
        static navigationOptions = {
      title:"Admin Panel"
    }
    render(){
        return(
        <MainNavigator>
            <Text style={{color:'#000'}}>
            This is Add News Screen
            </Text>
        </MainNavigator>
        );
    }
} 
const MainNavigator = TabNavigator({
   News:{
       screen:News
   },
    Pending:{
        screen:Pending
    },
    Completed:{
        screen:Completed
    },
    InReview:{
        screen:InReview
    },
    PDFReport:{
        screen:PDFReport
    }
},{
    animationEnabled:true,
    swipeEnabled:true,
    tabBarPosition:'bottom',
    tabBarOptions:{
        showIcon:true,
        showLabel:true
    
    },
}
);