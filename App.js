/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component, useReducer } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
  StatusBar,
  Image,
  Dimensions, TouchableOpacity, Alert
} from 'react-native';
// import SignIn from './component/pages';
import * as Animatable from 'react-native-animatable';

class App extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
      repassword: '',
      newpassword: '',
      picture: '',
      screenstate: this.onSignIn(),
      userlist: []
    };
  }
  componentDidMount() {
    this.setState({
      userlist: [{"username": "admin", "password": "admin", "picture" : 'https://upload.wikimedia.org/wikipedia/commons/8/83/Iceland-1979445_%28cropped_3%29.jpg' }]
    })
  }

  registerHandler = () => {
    let newUser = { 
      "username": this.state.username,
      "password": this.state.password,
      "picture": this.state.picture,
    }

    if(this.state.username === '' || this.state.password === ''){
      Alert.alert(`Notice`, `Masukkan Username dan Password yang valid!`)
      this.setState({
        screenstate: this.onSignUp()
      })
    } else if(this.state.password !== this.state.repassword){
      Alert.alert(`Notice`, `Konfirmasi password salah!`)
      this.setState({
        screenstate: this.onSignUp()
      })
    } else {
      this.state.userlist.push(newUser)
      Alert.alert(`Notice`, `Halo ${this.state.username}, Selamat Datang!`)
      this.setState({
        screenstate: this.onHome()
      })
    }
  }

  onSignUp = () => {
      return(
        <View style={styles.container}>
          {/* <Text>This is container</Text> */}
          <StatusBar barStyle="light-content"/>
          
          <Animatable.View 
            style={styles.content} 
            animation="fadeInUp">
            {/* <Text>This is Content</Text> */}
            <Text 
              style={{
                color: 'whitesmoke', 
                textDecorationStyle: 'solid',
                textDecorationColor: '#394989',
                fontWeight: 'bold', 
                fontSize: 30, 
                margin: 50,
                paddingBottom:30 }}>
                User Registration
            </Text> 
            <TextInput
              onChangeText={(username) => this.setState({ username })}
              placeholder={'Username'}
              style={styles.input}
            />
            <TextInput
              onChangeText={(password) => this.setState({ password })}
              placeholder={'Password'}
              secureTextEntry={true}
              style={styles.input}
            />
            <TextInput
              onChangeText={(repassword) => this.setState({ repassword })}
              placeholder={'Confirm Password'}
              secureTextEntry={true}
              style={styles.input}
            />
            <TextInput
              onChangeText={(picture) => this.setState({ picture })}
              placeholder={'Set Avatar (URL)'}
              style={styles.input}
            />

            <View style={styles.buttoncontainer}>
              <TouchableOpacity
                style={[styles.button, {backgroundColor: 'white'}]}
                onPress={this.registerHandler}
              >
              <Text style={{   
                color: '#394989',
                fontWeight: 'bold',
                fontSize: 20}}>Sign Me Up</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.button}
                onPress={() => this.setState({
                  screenstate: this.onSignIn()
                })}
              >
              <Text style={{   
                color: 'white',
                fontWeight: 'bold',
                fontSize: 20}}>Go Back</Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </View>
      )

  }

  loginHandler = () => {
    let found = false;
    let pass = false;
    this.state.userlist.map(user => {
      if(this.state.username === user.username) {
        found = true
        console.log("found " +found);
      }
      if(this.state.password === user.password) {
        pass = true
        console.log("pass " +pass);
      }
    }) 

    if (this.state.username === '' || this.state.password === ''){
      Alert.alert(`Notice`,"Masukkan Username dan Password")
      return this.setState({screenstate: this.onSignIn()})
    } else if (found && pass) { 
      Alert.alert(`Notice`, `Halo ${this.state.username}, kamu telah masuk!`)
      // console.log(this.state.userlist);
      return this.setState({
        screenstate: this.onHome()
      })
    } else if (!found) {
      Alert.alert(`Notice`, "Username tidak terdaftar")
      return this.setState({screenstate: this.onSignIn()})
    } else if(!pass) {
      Alert.alert(`Notice`,`Password untuk Username ${this.state.username} salah!`)
      return this.setState({screenstate: this.onSignIn()})
    }
  }

  onSignIn = () => {
    return (
      <View style={styles.container}>
        {/* <Text>This is container</Text> */}
        <StatusBar barStyle="light-content"/>
        
        <View style={styles.header}>
        {/* <Text>This is header</Text> */}
          <Animatable.Image 
            animation="bounceIn"
            duration={1500}
            source={require('./assets/Firefox_Logo,_2019.png')}
            resizeMode={'stretch'}
            style={styles.logo}
          />

          <Text style={{
            color: '#3b2e5a', 
            fontWeight: 'bold', 
            fontSize: 50, 
            alignSelf: 'center' }}>
              FireCircle</Text> 
        </View>

        <Animatable.View 
          style={styles.content} 
          animation="fadeInUp">
          {/* <Text>This is Content</Text> */}
          <TextInput
            onChangeText={(username) => this.setState({ username })}
            placeholder={'Username'}
            style={styles.input}
          />
          <TextInput
            onChangeText={(password) => this.setState({ password })}
            placeholder={'Password'}
            secureTextEntry={true}
            style={styles.input}
          />
          
          <Text 
            style={{
              color: 'whitesmoke', 
              fontStyle:'italic',
              fontSize: 15}}
            onPress={() => this.setState({
              screenstate: this.onForgot()
            })}
            >Forgot Password?
          </Text>

          <View style={styles.buttoncontainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={this.loginHandler}
            >
            <Text 
              style={{   
                color: 'white',
                fontWeight: 'bold',
                fontSize: 20}}>
                  Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button,{
                backgroundColor: 'white',
                borderColor: '#394989'
              }]}
              onPress={() => this.setState({
                screenstate: this.onSignUp()
              })}
            >
            <Text 
              style={{   
                color: '#394989',
                fontWeight: 'bold',
                fontSize: 20}}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>

      </View>
    )
  }

  forgotPassHandler = () => {
    this.state.userlist.map((user, index) => {
      if(this.state.username === user.username) {
        let editUser = {
          "username": this.state.username,
          "password": this.state.newpassword,
          "picture": user.picture
        }
        console.log(index);
        this.state.userlist.splice(index, 1, editUser)
      }
    }) 
    Alert.alert(`Notice`, "Password berhasil diubah!")
    return this.setState({
      screenstate: this.onSignIn()
    })
  }

  onForgot = () => {
    return(
      <View style={styles.container}>
        <Animatable.View style={styles.content} animation="fadeInUp">
          <Text 
            style={{
              color: 'whitesmoke', 
              textDecorationStyle: 'solid',
              textDecorationColor: '#394989',
              fontWeight: 'bold', 
              fontSize: 30, 
              margin: 50,
              paddingBottom:30 }}>
              Change Password
          </Text> 
          <TextInput
            onChangeText={(username) => this.setState({ username })}
            placeholder={'Username'}
            style={styles.input}
            />
          <TextInput
              onChangeText={(newpassword) => this.setState({ newpassword })}
              placeholder={'New Password'}
              secureTextEntry={true}
              style={styles.input}
            />
          <View style={styles.buttoncontainer}>
            <TouchableOpacity
                style={[styles.button, {backgroundColor: 'white'}]}
                onPress={this.forgotPassHandler}
              >
              <Text style={{   
                color: '#394989',
                fontWeight: 'bold',
                fontSize: 20}}>Change Password</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.button}
                onPress={() => this.setState({
                  screenstate: this.onSignIn()
                })}
              >
              <Text style={{   
                color: 'white',
                fontWeight: 'bold',
                fontSize: 20}}>Go Back</Text>
            </TouchableOpacity> 
          </View>
         
        </Animatable.View>
      </View>
    )
  }



  onHome = () => {
    return(
      <ScrollView style={styles.container}>
        <View>
          <Image source={require('./assets/Firefox_Logo,_2019.png')}
            style={styles.logo}
          />
        </View>

        <View style={styles.listcontainer}>
          {this.state.userlist.map((user) => (
            <View style={styles.list} key={user.username}> 

              <TouchableOpacity onPress={() => alert(user.username)}
                style={{flexDirection: 'row'}}>
                <Text style={{flex:3}}>
                  {user.username}
                </Text>
                <Image source={{uri: user.picture}}
                  style={styles.listimage}
                  />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <Button
          title={'Logout'}
          style={styles.button}
          onPress={() => this.setState({
            screenstate: this.onSignIn()
          })}
        />
      </ScrollView>
    )

  }

  render() {
    return (
        this.state.screenstate
    );
  }
};



const {height} = Dimensions.get('screen');
const logo_height = height * 0.5 * 0.4
const content_height = height * 0.7 * 0.5

const styles = StyleSheet.create({
  container: {
    flex:1,
    alignContent:'center',
    backgroundColor: 'whitesmoke',
  },
  header: {
    flex:2,
    alignItems:'center',
    justifyContent: 'center',

  },
  content: {
    flex:1,
    backgroundColor: '#ff5722',
    borderColor: 'purple',
    borderWidth:0.5,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical:100,
    alignItems:'center',
    justifyContent:'center'
  },
  logo: {
    width: logo_height, 
    height: logo_height,
    alignSelf:'center', 
  },
  input: {
    width: 200,
    height: 45,
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'grey',
    marginBottom: 10,
    backgroundColor: 'white',
  },
  buttoncontainer: {
    flexDirection: 'column',   
    padding:10
  }, 
  button: {
    backgroundColor: '#394989',
    marginHorizontal: 10,
    marginBottom: 5,
    paddingHorizontal: 50,
    borderWidth: 2,
    borderColor: 'purple',
    borderRadius: 30,
    padding: 5,
    alignItems:'center',
    justifyContent: 'center',
  },
  listcontainer: {
    padding: 10,
  },
  list: {
    height: 100,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginBottom: 5
  },
  listimage: {
    flex: 1,
    resizeMode: 'cover' ,
    justifyContent:'flex-end', 
    height: 70,
    maxWidth: 70,
    borderRadius: 50,
    borderColor: '#637373',
    borderWidth: 1
  }
});

export default App;
