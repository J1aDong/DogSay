'use strict';

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';

class Account extends Component {
    render()
    {
        return (
            <View style={styles.container}>
                <Text>Account</Text>
            </View>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
};

export default Account;