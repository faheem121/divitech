import React, { Component } from 'react';
import {Router, Stack, Scene, refreshOnBack} from 'react-native-router-flux';
import {AsyncStorage} from 'react-native';

import Login from './pages/Login';
import Signup from './pages/Signup';
import HomePage from './pages/Home';
import User from './pages/User';
import AddNewsForm from './pages/admintabs/AddNews';
import PDFFil from './pages/admintabs/PDF';
import ComplainDetail from './pages/admintabs/complaindetail/ComplainDetail';
import NewsDetail from './pages/admintabs/complaindetail/NewsDetail';
import LogoHome  from './components/LogoHome';

import UserCameraView  from './pages/userpages/Camera';
import UserImageView  from './pages/userpages/ImageView';
import UserGalleryView from './pages/userpages/GalleryView';
import UserNewsDetail from './pages/userpages/NewsDetails';
import UserStatusDetail from './pages/userpages/StatusDetail';


export default class Routes extends Component<{}> {
    constructor(){
        super()
        this.state = {
            user:false,
            admin:false,
            isLoading:false
        }
    }
    componentDidMount(){
        AsyncStorage.getItem('auth_data').then((value)=> {
            if(value !== null){
                var value = JSON.parse(value);
                if(value[0].group === 'Admin'){
                    this.setState({
                        admin:true,
                        user:false,
                        isLoading:false
                    })
                }else if (value[0].group === 'User'){
                    this.setState({
                        admin:false,
                        user:true,
                        isLoading:false
                    })
                }else{
                    this.setState({
                        admin:false,
                        user:false,
                        isLoading:true
                    })
                }
            }else{
                this.setState({
                    admin:false,
                    user:false,
                    isLoading:true
                })
            }
        })
    }

    render() {
		return(
            this.state.admin
            ?
            <Router>
			    <Stack key="root" >
                    <Scene key="home" hideNavBar={true} gesturesEnabled={false} component={HomePage} title="Home" initial={true} />
              <Scene key="user" hideNavBar={true} component={User} title="User" onBack={refreshOnBack} gesturesEnabled={false}  />
                    <Scene key="login" hideNavBar={true} component={Login} title="Login"   />
                    <Scene key="signup" hideNavBar={true} component={Signup} title="Register"/>
                    <Scene key="addnewsform" hideNavBar={false} component={AddNewsForm} title="Add News Form"/>
                    <Scene key="pdf" hideNavBar={false} component={PDFFil} title="Report"/>
                    <Scene key="detailcomplain" hideNavBar={false} component={ComplainDetail} title="Complain Detail"/>
                    <Scene key="detailnews" hideNavBar={false} component={NewsDetail} title="News Detail"/>

                    {/* <Scene key="camera" hideNavBar={true } component={UserCameraView} title="Camera" /> */}
                    {/* <Scene key="image" hideNavBar={false } component={UserImageView} title="Image"/> */}
                    {/* <Scene key="gallery" hideNavBar={false } component={UserGalleryView} title="Gallery"/> */}
                    <Scene key="news" hideNavBar={false } component={UserNewsDetail} title="News"/>
                    <Scene key="status" hideNavBar={true } component={UserStatusDetail} title="Status"/>
               </Stack>
			 </Router>
            :
             (this.state.user )
            ?
             <Router>
			    <Stack key="root"  >
                    <Scene key="home" hideNavBar={true} gesturesEnabled={false} component={HomePage} title="Home" />
                    <Scene key="user" hideNavBar={true} component={User} title="User" onBack={refreshOnBack} gesturesEnabled={false} initial={true} />
                    <Scene key="login" hideNavBar={true} component={Login} title="Login"   />
                    <Scene key="signup" hideNavBar={true} component={Signup} title="Register"/>

                     <Scene key="addnewsform" hideNavBar={false} component={AddNewsForm} title="Add News Form"/>
                    <Scene key="pdf" hideNavBar={false} component={PDFFil} title="Report"/>
                    <Scene key="detailcomplain" hideNavBar={false} component={ComplainDetail} title="Complain Detail"/>
                    <Scene key="detailnews" hideNavBar={false} component={NewsDetail} title="News Detail"/>
                    <Scene key="camera" hideNavBar={true } component={UserCameraView} title="Camera" />
                    <Scene key="image" hideNavBar={false } component={UserImageView} title="Image"/>
                    <Scene key="gallery" hideNavBar={false } component={UserGalleryView} title="Gallery"/>
                    <Scene key="news" hideNavBar={false } component={UserNewsDetail} title="News"/>
                    <Scene key="status" hideNavBar={true } component={UserStatusDetail} title="Status"/>
			    </Stack>
			 </Router>
           :(this.state.isLoading)
           ?
            <Router>
			    <Stack key="root" >
                    <Scene key="home" hideNavBar={true} gesturesEnabled={false} component={HomePage} title="Home"  />
                    <Scene key="user" hideNavBar={true} component={User} title="User" gesturesEnabled={false} />
                    <Scene key="login" hideNavBar={true} component={Login} title="Login"    initial={true}/>
                    <Scene key="signup" hideNavBar={true} component={Signup} title="Register"/>
                      <Scene key="addnewsform" hideNavBar={false} component={AddNewsForm} title="Add News Form"/>
                    <Scene key="pdf" hideNavBar={false} component={PDFFil} title="Report"/>
                    <Scene key="detailcomplain" hideNavBar={false} component={ComplainDetail} title="Complain Detail"/>
                    <Scene key="detailnews" hideNavBar={false} component={NewsDetail} title="News Detail"/>
                        {/* <Scene key="camera" hideNavBar={true } component={CameraView} title="Camera" /> */}
                    {/* <Scene key="image" hideNavBar={false } component={UserImageView} title="Image"/> */}
                    {/* <Scene key="gallery" hideNavBar={false } component={UserGalleryView} title="Gallery"/> */}
                    {/* <Scene key="news" hideNavBar={false } component={UserNewsDetail} title="News"/> */}
                    <Scene key="status" hideNavBar={true } component={UserStatusDetail} title="Status"/>
			    </Stack>
			 </Router>
            :
            <Router>
              <Stack key="root" >
             <Scene key="logo" hideNavBar={true} component={LogoHome} title="Logo"    initial={true}/>
              </Stack>
            </Router>
        )
	}
}
