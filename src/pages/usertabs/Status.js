import React, { Component } from 'react';
import {
    Container,
    Card,
    CardItem,
    Left,
    Body,
    Content,
    Icon, 
    Button,
    Header,
    Right,
    Thumbnail
} from 'native-base';

import {
    FlatList,
    Text,
    View,
    Alert,
    Platform,
    RefreshControl,
    AsyncStorage,
    TouchableOpacity
    } from 'react-native';

 import {Actions } from 'react-native-router-flux';

 import {LineDotsLoader} from 'react-native-indicator';


export default class UserStatus extends Component<{}> {

    constructor(){
        super()
        this.state ={
            btnstatus:null,
            status:0,
            CompleteData:[],
            isLoading:true, 
            user_id:null, 
            runLoop:true,
            noComplains:true,
            refreshing:false,
            token:'',
            group:''
        }
    }

    static navigationOptions = {
        tabBarIcon:({tintColor})=> {
            return <Icon name="ios-list-box-outline" style={{color:tintColor}} />
        }
    }

    fetchDatafromBackend(){
        try{
            let url = "http://divitech.codejunkie.pk/api/v1/users/complain/"+this.state.user_id;
            fetch(url)
            .then((response) => response.json())
            .then((resp) => { 
                this.setState({refreshing: false});
                if(resp.data.length === 1 && resp.data[0] === 0){ 
                    AsyncStorage.setItem('canAddComplain', "true");
                    this.setState({noComplains:true});
                }else{
                    console.log("fetching data IN STATUS 5: ");
                    this.setState({ CompleteData:  resp.data });
                    console.log(this.state.CompleteData);
                    if(this.state.CompleteData.length > 0){
                        this.state.noComplains = false;
                    }
                    this.setState({ isLoading:  false }); 
                    for( i=0; i < resp.data.length; i++){

                        if(resp.data[i].status != 4){
                            AsyncStorage.setItem('canAddComplain',"false");
                            break;
                        }else if(resp.data[i].status === 4){
                            AsyncStorage.setItem('canAddComplain',"true");
                        }
                    }
                }
             })
            .catch((error) => {
                console.log("Error in fetchdata STATUS: ")
                console.log(error)} 
            );    
        }catch(error){
            console.log("IN CATCH: ", error);
        }
    }
 
 
    _logout() {
        AsyncStorage.removeItem('auth_data');
        Actions.login()    
    } 
 
    componentDidMount(){
        _out = this;
       _status = this;
       AsyncStorage.getItem('auth_data').then((value)=> {
            if(value !== null){
                var value = JSON.parse(value)
                this.setState({
                    user_id:value[0].user_id,
                    token:value[0].token,
                    group:value[0].group,
                });
                this.fetchDatafromBackend();
            }else{
                Action.login()
            } 
        });
    }//end of componentDidMount

    _completeComplain(id, index){ 
         Alert.alert(
            'Are you sure?',
            'Complete the complain',
            [
              {text: 'No', onPress: () =>{
                console.log("cancelled");
              }, style: 'cancel'},
              {text: 'Yes', onPress: () => 
                { 
                    AsyncStorage.setItem('canAddComplain', "true");

                    this.state.status = 4;
                    console.log(this.state.CompleteData[index]);
                    Actions.status({complete:true, data:id});
                }
              }   
            ],
            { cancelable: false }
          );
    }

    _details(id){ 
        Actions.status({data:id});
    }

    _onRefresh = () => { 
        this.setState({refreshing:true});
        this.fetchDatafromBackend();
    }

    renderItem = ({item,index}) => { 
        this.state.btnstatus = item.status;
        return(
            this.state.isLoading
            ?
            <View style={{flex:1,justifyContent:'center',alignItems:'center', paddingLeft:40, paddingRight:10}}>
                <Text style={{fontSize:16,marginBottom:10,color:'#3D9BF5'}}>What while data is loading...</Text>
                <LineDotsLoader dotsNumber={4} color={'#3d9bf5'}/>
            </View>
            :
            <View  >
                <Card style={{flex: 0}}>
                    <TouchableOpacity onPress={() => null} > 
                        <CardItem style={{flexDirection:'column', marginBottom:0, alignItems:'flex-end',  paddingBottom:0}}> 
                            <Left style={{flexDirection:'row' }}>
                                <Thumbnail source={{uri: item.image}} large square />
                                <Body>
                                    <Text numberOfLines={3} style={{fontWeight:'normal', fontSize:12}}>
                                        {item.description}

                                    </Text>
                                </Body> 
                            </Left>
                            <View style={{flex:1, flexDirection:'row', justifyContent:'flex-start', alignContent:'flex-start', alignItems:'flex-start'}}>
                                <Text style={{fontWeight:'normal', fontSize:10, color:'#424242', alignSelf:'flex-start', paddingVertical:5}}>
                                    {item.created_at}
                                </Text>
                            </View>
                        </CardItem>
                        <CardItem style={{flex:1, flexDirection:'row', justifyContent:'space-between',marginTop:0, paddingTop:5 }}>
                            <Button info  style={{paddingHorizontal:10, paddingVertical:5,  height:30}} onPress={() => _status._details(item.id)}><Text style={{color:'white'}} >See Details </Text></Button>

                            {
                                item.status === 0 ? 
                                <Button warning style={{paddingHorizontal:10, width:'50%', alignContent:'center',justifyContent:'center', paddingVertical:5, marginTop:0, height:30}} onPress={()=>{alert('Complain has been submitted! Please wait ')}} ><Text  style={{color:'white'}}>Complain Submitted</Text></Button>
                            : null }
                            {
                                item.status === 1 ? 
                                <Button info style={{paddingHorizontal:10, width:'50%', alignContent:'center',justifyContent:'center', paddingVertical:5, marginTop:0, height:30}} onPress={()=>{alert('Complain is in progress please wait ')}} ><Text  style={{color:'white'}}>Complain In Progress</Text></Button>
                            : null }
                            {
                                item.status === 2 ? 
                                <Button info style={{paddingHorizontal:10, width:'50%', alignContent:'center',justifyContent:'center', paddingVertical:5, marginTop:0, height:30}} onPress={()=>{alert('Complain is in progress please wait ')}} ><Text  style={{color:'white'}}>Complain In Progress</Text></Button>
                            : null }
                            {
                                item.status === 4
                                    ?
                                <Button success style={{paddingHorizontal:10, width:'50%', alignContent:'center',justifyContent:'center', paddingVertical:5, marginTop:0, height:30}} onPress={()=>{alert('This complain has been completed')}} ><Text  style={{color:'white'}}>Completed</Text></Button>
                                : null
                            }
                            {
                                item.status === 3 ? 
                                <Button primary style={{paddingHorizontal:10, width:'50%', alignContent:'center',justifyContent:'center', paddingVertical:5, marginTop:0, height:30}} onPress={()=> _status._completeComplain(item.id,index)} ><Text  style={{color:'white'}}>Complete</Text></Button>
                            : null }
                            
                        </CardItem>
                    </TouchableOpacity>
                </Card>
            </View>
        );    
    }

    render(){
        return( 
          
            <Container style={{ marginTop: 23 }}>
                <Content refreshControl={ <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh.bind(this)} /> }
>
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
                        data={this.state.CompleteData}
                        extraData={this.state}
                        renderItem={(item,index) => this.renderItem(item,index)}
                        keyExtractor={(item,index) => index}
                      />
                </Content>
            </Container>
        );
    }
}