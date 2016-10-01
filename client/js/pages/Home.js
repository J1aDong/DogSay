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
import ScrollableTabView from 'react-native-scrollable-tab-view';
import VideoList from '../pages/VideoList';
import Edit from '../pages/Edit';
import Account from '../pages/Account';
import DefaultTabBar from '../component/DefaultTabBar';
import Header from '../component/Header';

class Home extends Component {
    render()
    {
        return (
            <View style={{flex: 1}}>
                <Header title="狗狗说"/>
                <ScrollableTabView tabBarPosition={"bottom"} initialPage={0} renderTabBar={() => <DefaultTabBar />}>
                    <VideoList tabLabel="ios-videocam"/>
                    <Edit tabLabel="ios-recording"/>
                    <Account tabLabel="ios-more"/>
                </ScrollableTabView>
            </View>
        )
    }
}

export default Home;