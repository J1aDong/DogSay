'use strict';

import * as types from './ActionTypes';
import request from '../util/Request';
import Config from '../util/Config';

export function fetchVideoList(page)
{
    return dispatch =>
    {
        console.log('fetchVideoList');

        let isLoadingTail = false;
        let isRefreshing = false;

        if (page !== 0)
        {
            isLoadingTail = true;
        } else
        {
            isRefreshing = true;
        }

        dispatch(showLoading(isLoadingTail, isRefreshing));

        request.get(Config.api.base + Config.api.creations, {
            accessToken: 'abcdef',
            page: page
        }).then((data) =>
        {
            dispatch(receiveRankList(data))
        }).catch((err) => console.warn(err));
    }
}

export function showLoading(isLoadingTail, isRefreshing)
{
    return {
        type: types.SHOW_LOADING,
        isLoadingTail: isLoadingTail,
        isRefreshing: isRefreshing
    }
}

function receiveRankList(data)
{
    return {
        type: types.RECEIVE_VIDEO_LIST,
        data: data,
    }
}
