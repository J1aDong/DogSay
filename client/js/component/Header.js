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
import Util from '../util/Common';

class Header extends Component {
    render()
    {
        const {title, backgroundColor} = this.props;
        let _title = title ? title : "";
        let _backgroundColor = backgroundColor ? backgroundColor : null;

        return (
            <View style={[styles.container, {backgroundColor: _backgroundColor}]}>
                <Text>{_title}</Text>
            </View>
        )
    }
}

const styles = {
    container: {
        paddingTop: Util.getStatusHeight() + 5,
        paddingBottom: 5,
        alignItems: 'center'
    }
};

export default Header;