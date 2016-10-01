'use strict'

import * as types from './ActionTypes';

export function fetchRankList()
{
    return dispatch =>
    {
        console.log('fetchRankList');
        dispatch(setLoading());
        setTimeout(()=>
        {
            dispatch(receiveRankList())
        }, 2000);
    }
}

function setLoading()
{
    return {
        type: types.SET_LOADING
    }
}

function receiveRankList()
{
    return {
        type: types.RECEIVE_RANK_LIST,
        text: "Hello world"
    }
}
