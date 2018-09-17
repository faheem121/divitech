import React, { Component } from 'react';
import {Container, Text ,Content,Icon} from 'native-base';
import { TabNavigator } from 'react-navigation';
import { TouchableOpacity,Platform ,AsyncStorage} from 'react-native';
import  NewsFeeds  from './usertabs/NewsFeeds';
import  Complain  from './usertabs/Complain';
import  Status from './usertabs/Status';
import {Actions} from 'react-native-router-flux';

export default class AddComplain extends Component {
    constructor()
    {
        super();
           
    }
  
       static navigationOptions = ({ navigation }) => ({
         
            headerRight:
            <TouchableOpacity onPress={() => _out._logout() }>
            <Icon
            name = {Platform.OS === 'ios' ? 'ios-power' : 'md-power'}
            style={{paddingRight:10,color:'red'}}
            />
                </TouchableOpacity>,
 title:"User Panel"
}) 

    componentDidMount() {
   
       _out = this;
    
   }
    _logout() {
             AsyncStorage.removeItem('auth_data');
        Actions.login() 
       
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