/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Alert, 
  View,
  Text
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import {
  Login,
  Logout,
  Home
} from './screen'

import AlbumScreen from './screen/album/AlbumScreen';
import PhotoScreen from './screen/album/PhotoScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      userLogin: {
        username: '',
        password: ''
      },
      userlist: [],
      isLogin: false,
    };
  }

  componentDidMount() {
    this.setState({
      userlist: [
        {
          username: "admin", 
          password: "admin", 
          picture : 'https://upload.wikimedia.org/wikipedia/commons/8/83/Iceland-1979445_%28cropped_3%29.jpg'
        },
        {
          username: "dhio", 
          password: "dhio", 
          picture : 'https://images.unsplash.com/photo-1567444585491-205bb3f649df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1853&q=80'
        },
      ]
    })
  }

  dataLoginAccess = (user, pass) => {
    this.setState({
      userLogin: {
        username: user,
        password: pass
      }
    });
  }

  authLogin = () => {
    if (this.state.isLogin) {
      Alert.alert(`Notice`, 'Sampai jumpa lagi!');
      this.setState({
        isLogin: !this.state.isLogin,
        userLogin: '',
      });
    } else {
      this.setState({
        isLogin: !this.state.isLogin,
      });
    }
  };

  editUser = (data, index) => {
    this.setState({
      userEdit: data,
      listIndex: index
    });
    // Alert.alert(`Notice`, `Data user  ${data.username} telah diubah`);
  }

  deleteUser = (data, index) => {
    if(this.state.userLogin.username === data.username){
      Alert.alert(`Notice`, `${data.username} sedang login`)
    } else {
      Alert.alert(`Notice`, `User  ${data.username} telah dihapus`);
      this.state.userlist.splice(index, 1)
    }
  }
  

  render() {  
    return(
      <NavigationContainer style={styles.container}>
        {/* {console.log('status login ' +this.state.isLogin)}
        {console.log('ini user login ' +this.state.userLogin)} */}
        {this.state.isLogin === false ? (
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              options={{
                headerShown: false,
              }}>
              {(props) => (
                <Login 
                  {...props} 
                  userlist={this.state.userlist} 
                  loginStatusChange={this.authLogin}
                  userLogin={this.dataLoginAccess}
                  />
              )}
            </Stack.Screen>
          </Stack.Navigator>
        ) : (
          <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Home" >
              {(props) => (
                <Home
                  {...props}
                  userlist={this.state.userlist}
                  deleteUser={this.deleteUser} 
                  editUser={this.editUser} />
              )}
            </Drawer.Screen>

            {/* <Drawer.Screen name="EditUser" >
              {(props) => (
                <Edit
                  {...props}
                  editUser={this.state.userEdit}
                  indexUser={this.state.listIndex}
                  fnEditUser={this.editUser} />
              )}
            </Drawer.Screen> */}

            <Drawer.Screen
              name="Album"
              children={(props) => (
                <AlbumScreen 
                  {...props} 
                  loginStatusChange={this.authLogin} />
              )}
            />

            <Drawer.Screen
              name="Photo"
              children={(props) => (
                <PhotoScreen
                  {...props} 
                  loginStatusChange={this.authLogin} />
              )}
            />

            <Drawer.Screen
              name="Logout"
              children={(props) => (
                <Logout 
                  {...props} 
                  loginStatusChange={this.authLogin} />
              )}
            />
          </Drawer.Navigator>
        )}
      </NavigationContainer>
    )
  }

}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'whitesmoke',
  },
});

export default App;
