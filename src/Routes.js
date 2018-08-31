import React, { Component } from 'react';
import {Router, Stack, Scene} from 'react-native-router-flux';

import Login from './pages/Login';
import Signup from './pages/Signup';
import HomePage from './pages/Home';
import User from './pages/User';
import  CameraView  from './pages/userpages/Camera';
import ImageView  from './pages/userpages/ImageView';
import GalleryView from './pages/userpages/GalleryView';

export default class Routes extends Component<{}> {
	render() {
		return(
			<Router>
			    <Stack key="root" hideNavBar={true}>
             <Scene key="home" component={HomePage} title="Home" />
			      <Scene key="login" component={Login} title="Login" />
			      <Scene key="user" component={User} title="User" />
			      <Scene key="signup" component={Signup} title="Register"/>
			      <Scene key="camera" component={CameraView} title="Camera" initial={true}/>
			      <Scene key="image" component={ImageView} title="Image"/>
			      <Scene key="gallery" component={GalleryView} title="Gallery"/>
			     
			    </Stack>
			 </Router>
			)
	}
}