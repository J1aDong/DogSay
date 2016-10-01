'use strict'

import * as types from './ActionTypes';

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
            .then((responseText) =>
            {
                console.log(responseText)
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

function receiveRankList()
{
    return {
        type: types.RECEIVE_VIDEO_LIST,
        text: "Hello world"
    }
}
