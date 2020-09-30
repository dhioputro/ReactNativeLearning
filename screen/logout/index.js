import React, { Component } from 'react';
import { View } from 'react-native';

class Logout extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.loginStatusChange();
    }

    render() {
        return(
            <View>
            </View>
        )
    }
}

export default Logout;