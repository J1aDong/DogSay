'use strict';

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ListView,
    RefreshControl
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Util from '../util/Common';
import {connect} from 'react-redux';
import {fetchVideoList, showLoading} from '../actions/videoList';
import * as Progress from 'react-native-progress';

let cachedResults = {
    nextPage: 0,
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
            isRefreshing: false
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
        page++;
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
        let _isRefreshing = false;
        if (videoList.data)
        {
            _data = videoList.data.data;
            _total = videoList.data.total;
        }
        if (videoList.isLoadingTail)
        {
            _isLoadingTail = videoList.isLoadingTail;
            _isRefreshing = videoList.isRefreshing;
        }

        var items = cachedResults.items.slice();
        if (cachedResults.nextPage !== 0)
        {
            console.log('nextPage !== 0');
            items = items.concat(_data);
        } else
        {
            console.log('nextPage == 0');
            items = _data.concat(items);
        }

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
                    refreshControl={
                        <RefreshControl
                            refreshing={_isRefreshing}
                            onRefresh={() =>
                            {
                                this._onRefresh(_isRefreshing)
                            }}
                            tintColor="#ff0000"
                            title="Loading..."
                            titleColor="#ff6600"
                            colors={['#ff0000', '#00ff00', '#0000ff']}
                            progressBackgroundColor="#ffff00"
                        />
                    }
                    renderFooter={() => this._renderFooter(_isLoadingTail)}
                    renderRow={(rowData) => this.renderRow(rowData)}/>
            </View>
        )
    }

    _onRefresh(isRefreshing)
    {
        if (!this._hasMore() || isRefreshing)
        {
            return;
        }
        const {dispatch} = this.props;
        showLoading(false, true);
        dispatch(fetchVideoList(0));
    }

    _renderFooter(isLoadingTail)
    {
        if (!this._hasMore() && cachedResults.total !== 0)
        {
            return (
                <View style={styles.loadingMore}>
                    <Text style={styles.loadingText}>没有更多了</Text>
                </View>
            )
        }

        if (!isLoadingTail)
        {
            return (<View style={styles.loadingMore}/>)
        }

        return (
            <View style={styles.loadingMore}>
                <Progress.Circle size={30} indeterminate={true} borderWidth={3}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
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
    },
    loadingMore: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingText: {
        color: '#777',
        textAlign: 'center'
    },
});

//容器组件使用 connect() 方法连接 Redux
function mapStateToProps(state)
{
    const {videoList} = state;
    return {
        videoList
    }
}

export default connect(mapStateToProps)(VideoList);