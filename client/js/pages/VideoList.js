'use strict';

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ListView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Util from '../util/Common';
import {connect} from 'react-redux';
import {fetchVideoList} from '../actions/videoList';

let cachedResults = {
    nextPage: 1,
    items: [],
    total: 0
};

class VideoList extends Component {

    constructor(props)
    {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds,
            isLoadingTail: false
        }
    }

    renderRow(rowData)
    {
        return (
            <TouchableOpacity onPress={() =>
            {
            }}>
                <View style={styles.item}>
                    <Text style={styles.title}>{rowData.title}</Text>
                </View>
                <Image
                    source={{uri: rowData.thumb}}
                    style={styles.thumb}>
                    <Icon name="ios-play"
                          size={28}
                          style={styles.play}/>
                </Image>
                <View style={styles.itemFooter}>
                    <View style={styles.handleBox}>
                        <Icon name="ios-heart-outline"
                              size={28}
                              style={styles.up}/>
                        <Text style={styles.handleText}>喜欢</Text>
                    </View>
                    <View style={styles.handleBox}>
                        <Icon name="ios-chatboxes-outline"
                              size={28}
                              style={styles.commetIcon}/>
                        <Text style={styles.handleText}>评论</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    componentDidMount()
    {
        const {dispatch} = this.props;
        dispatch(fetchVideoList(0));
    }

    _fetchMoreData(isLoadingTail)
    {
        console.log('_fetchMoreData' + isLoadingTail);
        if (!this._hasMore() || isLoadingTail)
        {
            return;
        }

        console.log('can fetchMore');

        var page = cachedResults.nextPage;
        const {dispatch} = this.props;
        dispatch(fetchVideoList(page));
    }

    _hasMore()
    {
        let length = cachedResults.items.length;
        let total = cachedResults.total;
        console.log('length-->' + length + ",total-->" + total);
        return length < total;
    }

    render()
    {
        const {videoList} = this.props;
        let _data = [];
        let _isLoadingTail = false;
        let _total = 0;
        if (videoList.data)
        {
            _data = videoList.data.data;
            _total = videoList.data.total;
        }
        if (videoList.isLoadingTail)
        {
            _isLoadingTail = videoList.isLoadingTail;
        }

        var items = cachedResults.items.slice();
        items = items.concat(_data);

        cachedResults.items = items;
        cachedResults.total = _total;

        return (
            <View style={styles.container}>
                <ListView
                    automaticallyAdjustContentInsets={false}
                    dataSource={this.state.dataSource.cloneWithRows(cachedResults.items)}
                    enableEmptySections={true}
                    onEndReached={() => this._fetchMoreData(_isLoadingTail)}
                    onEndReachedThreshold={20}
                    renderRow={(rowData) => this.renderRow(rowData)}/>
            </View>
        )
    }


}

const styles = {
    container: {
        flex: 1,
    },
    item: {
        width: Util.getWindowWidth(),
        marginTop: 4,
        backgroundColor: '#fff',
    },
    thumb: {
        width: Util.getWindowWidth(),
        height: Util.getWindowWidth() * 0.56,
        resizeMode: 'cover'
    },
    title: {
        padding: 10,
        fontSize: 18,
        color: '#333'
    },
    itemFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#eee'
    },
    handleBox: {
        padding: 10,
        flexDirection: 'row',
        width: Util.getWindowWidth() / 2,
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    play: {
        position: 'absolute',
        bottom: 14,
        right: 14,
        width: 46,
        height: 46,
        paddingTop: 9,
        paddingLeft: 18,
        backgroundColor: 'transparent',
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 23,
        color: 'red'
    },
    handleText: {
        paddingLeft: 12,
        fontSize: 18,
        color: '#333'
    },
    up: {
        fontSize: 22,
        color: '#333'
    },
    commentIcon: {
        fontSize: 22,
        color: '#333'
    }
};

//容器组件使用 connect() 方法连接 Redux
function mapStateToProps(state)
{
    const {videoList} = state;
    return {
        videoList
    }
}

export default connect(mapStateToProps)(VideoList);