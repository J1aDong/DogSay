'use strict';

import * as types from './ActionTypes';
import request from '../util/Request';
import Config from '../util/Config';

export function fetchVideoList(page)
{
    return dispatch =>
    {
        console.log('fetchVideoList');
        dispatch(showLoading());
        request.get(Config.api.base + Config.api.creations, {
            accessToken: 'abcdef',
            page: page
        }).then((data) =>
        {
            dispatch(receiveRankList(data))
        }).catch((err) => console.warn(err));
    }
}

function showLoading()
{
    return {
        type: types.SHOW_LOADING,
    }
}

function receiveRankList(data)
{
    return {
        type: types.RECEIVE_VIDEO_LIST,
        data: data,
    }
}
