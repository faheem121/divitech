import React, { Component } from 'react';
import {Container, Text ,Content,Icon} from 'native-base';
import {Platform,TouchableOpacity,AsyncStorage,StatusBar,Button} from 'react-native';
import { TabNavigator } from 'react-navigation';
import  News  from './admintabs/News';
import  Completed  from './admintabs/Completed';
import  Pending from './admintabs/Pending';
import {Actions} from 'react-native-router-flux';
import  InReview  from './admintabs/InReview';
import  PDFReport  from './admintabs/PDFReport';
export default class AddNews extends Component {
     
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
 title:"Admin Panel",
           
}) 

    componentDidMount() {
       _new = this;
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
            This is Add News Screen
            </Text>
        </MainNavigator>
        );
    }
} 
const MainNavigator = TabNavigator({
   News:{
       screen:News,
       tabBarOptions: {
        title: 'News',
    }
     
      
   },
    Pending:{
        screen:Pending,
          tabBarOptions: {
        title: 'Pending',
    }
    },
    InReview:{
        screen:InReview,
          tabBarOptions: {
        title: 'Inreview',
    }
    },
    Completed:{
        screen:Completed,
          tabBarOptions: {
        title: 'Done',
    }
    },
    PDFReport:{
        screen:PDFReport,  tabBarOptions: {
        title: 'Report',
    }
    }
},{
    animationEnabled:true,
    swipeEnabled:true,
    tabBarPosition:'bottom',
    navigationOptions: {
      gesturesEnabled: false
    },
    tabBarOptions:{
        showIcon:true,
        showLabel:true,
     labelStyle: {
    fontSize: 6,
  }
    },
    
}
);
