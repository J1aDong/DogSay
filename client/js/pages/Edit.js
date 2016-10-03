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
import * as Progress from 'react-native-progress';

class Edit extends Component {
    render()
    {
        return (
            <View style={styles.container}>
                <Progress.Circle size={30} indeterminate={true} />
                <Text>Edit</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Edit;