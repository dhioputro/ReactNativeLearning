import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

class AlbumScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
    };
  }
  _onPressButton() {
    alert('You tapped the button!');
  }

  componentDidMount() {
    const fatchItem = async () => {
      try {
        this.setState({isLoading: true});
        console.log(this.state.isLoading);
        let response = await fetch(
          `https://jsonplaceholder.typicode.com/albums?_start=0&_limit=5`,
        );
        let responseJson = await response.json();
        await this.setState({
          isLoading: false,
          dataSource: responseJson,
        });
        console.log(responseJson);
      } catch (error) {
        console.error(error);
      }
    };
    fatchItem();
  }

  _separatorComponent = () => {
    return <View style={{backgroundColor: 'grey', height: 0.5}} />;
  };

  onPressAlbumHandler = (album) => {
    this.props.navigation.navigate('Photo', {
      // Navigation target
      album: album, // Send params
    });
  };

  _itemComponent = ({item}) => {
    return (
      <TouchableOpacity onPress={() => this.onPressAlbumHandler(item)}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginLeft: 10,
            height: 65,
            padding: 5,
          }}>
          <View style={style.item}>
            <Text style={{padding: 3, paddingLeft: 10}}>{item.id}</Text>
            <Text style={{padding: 3, paddingLeft: 10}}>{item.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator />
          <StatusBar barStyle="dark-content" />
          <View>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>User List</Text>
            <Text>Gagal Ambil</Text>
          </View>
        </View>
      );
    }

    return (
      <View style={{flex: 1, paddingTop: 20}}>
        <StatusBar barStyle="dark-content" />
        <View>
          <Text style={{fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>
            Album
          </Text>
        </View>
        <FlatList
          data={this.state.dataSource}
          renderItem={this._itemComponent}
          keyExtractor={(item, index) => index.toString()}
          onRefresh={this._fetchItem}
          refreshing={this.state.isLoading}
          ItemSeparatorComponent={this._separatorComponent}
        />
      </View>
    );
  }
}



const style = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'flex-start',
  },
  item: {
    backgroundColor: '#aaa',
    flex: 1,
    marginRight: 10,
    borderRadius: 10,
  },
  buttonitem: {
    justifyContent: 'flex-end',
    width: 30,
    flex: 5,
  },
});

export default AlbumScreen;