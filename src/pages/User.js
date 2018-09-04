import React, { Component } from 'react';
import { Text } from 'native-base';
import { TabNavigator } from 'react-navigation';
import  NewsFeeds  from './usertabs/NewsFeeds';
import  Complain  from './usertabs/Complain';
import  Status from './usertabs/Status';

export default class User extends Component<{}> {

  constructor(props){
    super(); 
    this.state = {
      imageUri:''
    } 
  }
  
  componentWillReceiveProps(props){ 
    this.props.imageUri = props.imageUri; 
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



//faheem bhai's

// import React, { Component } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   StatusBar 
// } from 'react-native';
 
// import {StackNavigator} from 'react-navigation';
// import AddComplain from './UserAddComplain';

// const Navigator = StackNavigator({
//    AddComplain:{
//         screen:AddComplain,

//             }
    
// });
// export default class User extends Component<{}> {

//   constructor(props){
//     super(); 
//     this.state = {
//       imageUri:''
//     }
    
    
//   }
//   componentWillReceiveProps(props){
//     let imageUri = props.imageUri;
//       this.props.navigation.navigate(
//         'AddComplain',
//         { imageUri}
//       )
//     this.props.imageUri = props.imageUri;
//     this.setState({imageUri:props.imageUri});

//   }

// 	render() {
//     return(
//     <Navigator />
//     );
// 	}

// }