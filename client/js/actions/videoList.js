'use strict';

import * as types from './ActionTypes';
import Mock from 'mockjs';

export function fetchVideoList()
{
    return dispatch =>
    {
        console.log('fetchVideoList');
        dispatch(setLoading());
        // setTimeout(()=>
        // {
        //     dispatch(receiveRankList())
        // }, 2000);

        fetch('http://rap.taobao.org/mockjs/8136/api/creations?accessToken=sd')
            .then((response) => response.json())
            .then((response) =>
            {
                var data = Mock.mock(response);
                console.log(data);

                if (data.success)
                {
                    dispatch(receiveRankList(data));
                }
            }).catch((error) =>
        {
            console.log(error);
        })
    }
}

function setLoading()
{
    return {
        type: types.SHOW_LOADING
    }
}

function receiveRankList(data)
{
    return {
        type: types.RECEIVE_VIDEO_LIST,
        data: data
    }
}
