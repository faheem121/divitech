import React, { Component } from 'react';
import { Text } from 'native-base';
import { TabNavigator } from 'react-navigation';
import  NewsFeeds  from './usertabs/NewsFeeds';
import  Complain  from './usertabs/Complain';
import  Status from './usertabs/Status';

export default class AddComplain extends Component {
    constructor(props){
        super();
        this.state = {
            imageUri:''
        }
        
        
    }

    componentWillReceiveProps(props){
        this.setState({imageUri:props.imageUri});
    
      }
    
        static navigationOptions = {
      title:"Client Panel"
    }
    render(){
        return(
        <MainNavigator>
            <Text style={{color:'#000'}}>
            This is User News Feeds Screen
            </Text>
        </MainNavigator>
        );
    }
}
const MainNavigator = TabNavigator({
   NewsFeeds:{
       screen:NewsFeeds
   },
    Complain:{
        screen:Complain
    },
    Status:{
        screen:Status
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