import React, {Component} from 'react';
import {Button, Alert} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';
// import TouchableScale from 'react-native-touchable-scale'; 
// import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import {FlatList} from 'react-native-gesture-handler';

class UserMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      // showUser: 10,
    };
  }

  componentDidMount() {
    this.props.userlist;
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item, index }) => (
    <ListItem bottomDivider>
      <Avatar source={{uri: item.picture}} />
      <ListItem.Content>
        <ListItem.Title>{item.username}</ListItem.Title>
        <ListItem.Subtitle>{'Password: '+item.password}</ListItem.Subtitle>
      </ListItem.Content>
      
        <Button
          style={{flex: 1, flexDirection: 'row-reverse'}}
          title="Edit"
          onPress={() => {
            this.props.editUser(item, index);
            Alert.alert(`Notice`, `Data user  ${item.username} telah diubah`);
            this.props.navigation.navigate('UserList')
          }} />
        
        <Button
          style={{flex: 1, flexDirection: 'row-reverse'}}
          title="Del"
          onPress={() => {
            this.props.deleteUser(item, index);
            this.props.navigation.navigate('UserList')
          }} />
      

      <Icon name="angle-right" size={24} color="#C8C7CC" />
    </ListItem>
  )

  render() {
    return (
        <FlatList 
        keyExtractor={this.keyExtractor}
        data={this.props.userlist}
        renderItem={this.renderItem}
        />
    );
  }
}

export default UserMenu;
