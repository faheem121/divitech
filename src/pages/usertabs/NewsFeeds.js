import React, { Component } from 'react';
import {
    Container,
    Text,
    Card,
    Thumbnail,
    Body,
    CardItem,
    Content,
    Icon,
    Left,
    Header,
    Right,
    Item
} from 'native-base';

import {
    FlatList,
    ActivityIndicator,
    View,
    Platform,
    RefreshControl,
    AsyncStorage,
    TouchableOpacity
} from 'react-native';

import { Actions } from 'react-native-router-flux'; 

export default class NewsFeeds extends Component {

    constructor(){
        super()
        this.state ={
            NewsDatas:[],
            isLoading:true,
            newsID:null,
            refreshing: false
        }
    }   

    _logout() {
        AsyncStorage.removeItem('auth_data');
         Actions.login() 
        
     }

    getData(){
        console.log("NEWSFEED HTTP:")
        const url  ='http://divitech.codejunkie.pk/news';
        fetch(url)
        .then((response)=>response.json())
        .then((responseJson) => {
            this.setState({refreshing:false});
            responseJson.data.forEach(element => {
                    if(element.image === ''){
                    element.image = 'http://www.humanityngo.org/wp-content/uploads/2018/03/noimage.png';
                }
            });
                this.setState({ 
                NewsDatas:responseJson.data,
                isLoading:false
            });
        })
        .catch((error) => {
            console.log(error)
        });
    }

    componentDidMount(){
        _out = this;
        _news = this;
        this.getData();
    }
    
    _details(id){
        Actions.news({data:id});
    }

    static navigationOptions = { 
        tabBarIcon:({tintColor})=> {
            return <Icon name="paper" style={{color:tintColor}} />
        }
    }

    _onRefresh = () => { 
        this.setState({refreshing:true});
        this.getData();
    }

    // receive news item and display
    renderItem = ({item}) => {
        return(
            <View >
                <Card style={{flex: 0}}>
                    <TouchableOpacity onPress={() => _news._details(item.id)}>
                        <CardItem>
                            <Left>
                                <Thumbnail source={{uri: item.image}} />
                                <Body>
                                    <Text style={{fontWeight: 'bold', fontSize:18}}>{item.title}</Text>
                                    <Text note>Submited By Admin</Text>
                                </Body>
                            </Left>
                        </CardItem>
                    </TouchableOpacity> 
                </Card>
            </View>
        );
    }


    render(){
        return(
            this.state.isLoading
            ?
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator size="large" color="#330066" animating />
            </View>
             :
            <Container style={{flex:1, marginTop: Platform.OS === 'ios' ? 23 :23}}>
            
                <Content refreshControl={ <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)} /> } >
                    <Header style={{flex:1, backgroundColor:'white', marginBottom:5, flexDirection:'row', alignContent:'center', justifyContent:'space-evenly'}}>
                        <Left   >
                
                        </Left> 
                        <Body style={{ paddingLeft:60, alignSelf:'center'}} >
                            <Text style={{ alignSelf:'center'}}>User Panel</Text>
                        </Body>
                        <Right  >  
                            <TouchableOpacity onPress={() => _out._logout() }>
                                <Icon
                                    name = {Platform.OS === 'ios' ? 'ios-power' : 'md-power'}
                                    style={{paddingRight:10,color:'red'}}
                                />
                            </TouchableOpacity>
                        </Right>
                    </Header>
                    <FlatList
                        data={this.state.NewsDatas}
                        renderItem={this.renderItem}
                        keyExtractor={(item,index)=>index}
                    />
                </Content>
            </Container>
        );
    }
}