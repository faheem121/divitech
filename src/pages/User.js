import React, { Component } from 'react';
import { Text } from 'native-base';
import { TabNavigator } from 'react-navigation';
import  NewsFeeds  from './usertabs/NewsFeeds';
import  Complain  from './usertabs/Complain';
import  Status from './usertabs/Status';

export default class User extends Component {

  constructor(props){
    super(); 
    this.state = {
      imageUri:'',
      statusId: null,
    } 
  }
  
  componentWillReceiveProps(props){  
    this.props.imageUri = props.imageUri; 
    this.props.statusId = props.statusID;
    this.setState({statusId: props.statusID});
    this.setState({imageUri:props.imageUri});
  }

  static navigationOptions = {
     title:"Client Panel"
  }

  render(){
      return(
        <MainNavigator screenProps={{imageUri: this.state.imageUri}}>
            <Text style={{color:'#000'}}>
            This is User News Feeds Screen
            </Text>
        </MainNavigator>
      );
  }
}
const MainNavigator = TabNavigator({
  Complain:{
    screen:Complain
  },
  NewsFeeds:{
    screen:NewsFeeds
  },
  Status:{
      screen:Status
  },
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