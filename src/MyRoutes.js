/*eslint-disable*/
import React, { Component } from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import { Layout, Menu, Icon, Modal, Button, notification} from 'antd';
const { Header, Footer, Sider, Content } = Layout;

import App from './App.js';
import NewItem from './NewItem.js';

import * as firebase from 'firebase';

class MyRoutes extends Component {

constructor(props) {
    super(props);
    this.state = {
        visible : false,
        loggedIn: false
    };
    this.handleSiderMenuClick = this.handleSiderMenuClick.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleAuthChange = this.handleAuthChange.bind(this);
    this.renderNewItem = this.renderNewItem.bind(this);
    this.showModalLoginWindowDisplay = this.showModalLoginWindowDisplay.bind(this);
}

handleGoogleLogin(){
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  
}

handleFacebookLogin() {
    let provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithRedirect(provider);
      
}

authRedirectSuccess(result) {
    console.log(result);
    if(result.user != null ) {
        notification.success({
        message: 'Welcome'+result.user.displayName,
        description: 'Have a great Shopping experince'
      });
  }

}

authRedirectFail(reason) {
    console.log(reason);
}

handleAuthChange(user) {
    if(user !==null) {
        this.setState({
            loggedIn: true
        });
    } else {
        this.setState({
            loggedIn: false
        });
    }
}

componentDidMount (){
    firebase.auth().getRedirectResult().then(this.authRedirectSuccess).catch(this.authRedirectFail);
    firebase.auth().onAuthStateChanged(this.handleAuthChange);
}

handleSiderMenuClick(propsPassed) {
    console.log(propsPassed);
    if(propsPassed.key == 3){
        
        if(this.state.loggedIn != true) {
        this.setState({
            visible: true
        });
        } else {
            firebase.auth().signOut();
            
        }

    }
}


handleCancel() {
  this.setState({
    visible: false
  });  
}

showModalLoginWindowDisplay() {
 this.setState({
    visible: true
  });   
}

renderNewItem(props) {
    return (
        <NewItem loggedInProp={this.state.loggedIn} routeProps={props} 
            showModalLoginWindow={this.showModalLoginWindowDisplay}/>
    );
}

 render() {
    let signInText = 'SignIn/Register'; 
    if(this.state.loggedIn == true) {
        signInText = 'Logout'
    }
    return (<BrowserRouter>
        <div>
        
            <Layout >
      <Sider breakpoint="md" collapsedWidth="0" style={{ background: '#fff' }}>
      
    <Menu theme="light" mode="inline" onClick={this.handleSiderMenuClick}
        defaultSelectedKeys={['1']} style={{marginTop: '64px'}}>
      <Menu.Item key="1" disabled>
        <Icon type="user" />
        <span className="nav-text">My Account</span>
      </Menu.Item>
      <Menu.Item key="2">
        <Icon type="to-top" />
        <span className="nav-text">
         <Link to='/new-item'>   Upload Item </Link>
            
         </span>
      </Menu.Item>
    <Menu.Item key="3">
        <Icon type="key" />
        <span className="nav-text">
         {signInText}
            
         </span>
      </Menu.Item>
    </Menu>
      
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', lineHeight: '64px' }}>
        
        
    <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']} style={{float: 'right'}}>
      <Menu.Item key="1" disabled>
        <Icon type="shopping-cart" />
        <span className="nav-text">Cart</span>

      </Menu.Item>
    </Menu>
        </Header>
        <Content style={{margin: '26px'}}>
        
        
            <Route exact path='/new-item' render={this.renderNewItem}/>
            <Route exact path='/' component={App}/>
           </Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
    <Modal title="Login" visible={this.state.visible}
           onCancel={this.handleCancel}
          footer={null} width='300px'
        >
         
         <Button type="primary" onClick={this.handleGoogleLogin}
            style={{width: '100%', background: 'red'}}>
            Login with Google</Button>
         <br/><br/>
         <Button type="primary" onClick={this.handleFacebookLogin}
            style={{width: '100%', background: 'blue'}}>
            Login with Facebook</Button>
        </Modal>   
        </div>
        
        
        
     </BrowserRouter>
     );
     
 }

}


export default MyRoutes;