'use strict';

import * as types from '../actions/ActionTypes';

const initialState = {
    loading:false,
    text:''
};

export default function videoList(state=initialState, action)
{
    switch (action.type){
        case types.FETCH_VIDEO_LIST:
            return Object.assign({},state,{
                loading:true
            });
        case types.RECEIVE_VIDEO_LIST:
            return Object.assign({},state,{
                loading:false,
                text:action.text
            });
        case types.SHOW_LOADING:
            return Object.assign({},state,{
                loading:true,
                text:"loading"
            });
        default:
            return state;
    }
}