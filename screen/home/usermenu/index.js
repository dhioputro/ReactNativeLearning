import React, {Component} from 'react';
import {
  Button, 
  Alert, 
  RefreshControl, 
  View
} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';
import {FlatList} from 'react-native-gesture-handler';

class UserMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      refreshing: false
      // showUser: 10,
    };
  }

  componentDidMount() {
    this.props.userlist;
  }
  _onRefresh = () => {
    this.setState({refreshing: true});
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
            this.props.navigation.navigate('UserList')
          }} />
        
        <Button
          style={{flex: 1, flexDirection: 'row-reverse'}}
          title="Del"
          onPress={() => {
            this.props.deleteUser(item, index);
            this.props.navigation.navigate('EditData')
          }} />
      

      <Icon name="angle-right" size={24} color="#C8C7CC" />
    </ListItem>
  )

  render() {
    return (
      <View>
        <FlatList 
          keyExtractor={this.keyExtractor}
          data={this.props.userlist}
          extraData={this.props.userlist}
          renderItem={this.renderItem}
          refreshControl={
            <RefreshControl 
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
              
            />
          }
        />
      </View>
        
    );
  }
}

export default UserMenu;
