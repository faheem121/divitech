import React, { Component } from 'react';
import { Image,View,ActivityIndicator, TouchableOpacity} from 'react-native';
import { Container,
     Content,
     Card,
     Header,
     CardItem,
     Text,
     Icon,
     Left,
     Right,
     Body,
     Button
 } from 'native-base';
import { Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class UserStatusDetail extends Component {
    constructor(props){
        super(props) 
        this.state ={
            statusDetails:[],
            country: '',
            isLoading:true,
            completedButtonText:'Complete Complain',
            complainCompltd:false,
            loadingFont:true
        }
    }

    async componentWillMount() {
        await Expo.Font.loadAsync({
          Roboto: require("native-base/Fonts/Roboto.ttf"),
          Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
          Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
        });
        this.setState({ loadingFont: false });
      }
 
    componentDidMount(){  
        console.log("STATUS DETAILS: COMPDIDMOUNT: http");
        
        const url  ='http://divitech.codejunkie.pk/complain/'+this.props.data
         fetch(url)
        .then((response)=>response.json())
        .then((responseJson) => {
            this.setState({
                statusDetails: responseJson.data,
                isLoading: false,
                loadingFont: false,
                country: 'Pakistan'
            });  
        }).then(()=>{
            if(this.props.complete){

                this._completeComplain(this.props.data)
            }
        })
        .catch((error) =>{
            console.log("Caught Error in userStatusDetails Page: ");
            console.log(error)
        })

    }

    _completeComplain(id){ 
        console.log("cOMPLETING COMPLAIN: http")
        if(!this.state.loadingFont){
            var formData = new FormData();
     
            // Fields in the post
            formData.append("status",4); 
    
            const config = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data;'
                },
                body: formData
            };
            const url = 'http://divitech.codejunkie.pk/complain/'+id+'/update';
            fetch( url, config)
            .then(responseData => { 
               this.setState({
                    completedButtonText:"Complain Solved !",
                    complainCompltd:true
                }); 
             })
            .catch(err => {
               console.log(err);
            });
        }
    } 
    goBack = ()=>{
        console.log("status id in statusDetails: ", this.state.statusDetails.id );
        Actions.user({ statusID :this.state.statusDetails.id });

    }

    render(){     
        return(
            this.state.loadingFont 
            ?
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <ActivityIndicator size="large" color="#330066" animating />        
                </View>
            :
            <Container style={{ marginTop: 23 }}>
                <Content>
                <Header style={{flex:1, backgroundColor:'white', marginBottom:5, flexDirection:'row', alignContent:'center', justifyContent:'space-evenly'}}>
                    <Left  style={{flex:1,  flexDirection:'row' }} >
                        <TouchableOpacity onPress={ this.goBack.bind(this) } >                                       
                            <Icon
                                name = {Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-backspace'}
                                style={{paddingLeft:5, width:130, color:'#3D9BF5', paddingRight:10}}
                            /> 
                        </TouchableOpacity>
                    </Left> 
                    <Body style={{ paddingLeft:60, alignSelf:'center'}} >
                    </Body>
                    <Right  >  
                    </Right>
                </Header>
                    <Card style={{flex: 0, alignItems:'center'}}>
                        <CardItem>
                            <Left>        
                                <Body style={{alignItems:'center'}}>
                                    <Text>{this.state.statusDetails.title}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Image source={{uri:this.state.statusDetails.image}} style={{height: 200, width: 300, flex: 1, alignSelf:'center'}}/>
                                <Text style={{alignSelf:'center',marginTop:10, fontSize:13}}>
                                    {this.state.statusDetails.description}
                                </Text>
                                <View style={{ }} >
                                    <Text style={{marginTop:10, fontSize:12, color:'#424242'}}>
                                      Complain Type: {this.state.statusDetails.complain_type}
                                    </Text>
                                    <Text style={{marginTop:10, fontSize:12, color:'#424242'}}>
                                      Created At: {this.state.statusDetails.created_at}
                                    </Text>
                                </View>
                            </Body>
                        </CardItem>
                        <CardItem> 
                            {
                                this.state.statusDetails.status === 3
                                ? <Button success disabled={ this.state.complainCompltd ? true: false } block style={{height:30,width:'100%'}} onPress={() => this._completeComplain(this.state.statusDetails.id)}><Text>{this.state.completedButtonText}</Text></Button>
                                : null
                            }
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}