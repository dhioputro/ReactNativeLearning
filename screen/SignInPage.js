import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TextInput,
    Button,
    StatusBar,
    Image,
} from 'react-native';

import * as Animatable from 'react-native-animatable';

class SignIn extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
      // screenstate: <Login />,
      userList: []
    };
  }

  render() {
    return (
      <View style={styles.container}>
        
        <View styles={styles.onLogin}>
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
          
          <Button
            title={'Login'}
            style={styles.button}
            onPress={() => this.setState({
              screenstate: this.onHome()
            })}
          />

          <Button
            title={'Register'}
            style={styles.button}
            onPress={() => this.setState({
              screenstate: this.onRegis()
            })}
          />

        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  logo: {
    width: 100, 
    height: 100,
    marginBottom: 50, 
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  button: {
    marginBottom: 10,
  }
});

export default SignIn;