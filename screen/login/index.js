import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  StatusBar,
  Dimensions, 
  TouchableOpacity,
  Alert
} from 'react-native';

import * as Animatable from 'react-native-animatable';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  loginHandler = () => {
    let found = false;
    let pass = false;
    this.props.userlist.map(user => {
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
    } else if (found && pass) { 
      // console.log(this.state.userlist);
      Alert.alert(`Notice`, `Halo ${this.state.username}, kamu telah masuk!`)
      this.props.userLogin(this.state.username, this.state.password);
      this.props.loginStatusChange();
      
    } else if (!found) {
      
      Alert.alert(`Notice`, "Username tidak terdaftar")
    } else if(!pass) {
      
      Alert.alert(`Notice`,`Password untuk Username ${this.state.username} salah!`)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <Text>This is container</Text> */}
        <StatusBar barStyle="light-content"/>
        
        <View style={styles.header}>
        {/* <Text>This is header</Text> */}
          <Animatable.Image 
            animation="bounceIn"
            duration={1500}
            source={require('../../assets/Firefox_Logo,_2019.png')}
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
    );
  }
}

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

export default Login;
