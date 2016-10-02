'use strict';

import queryString from 'query-string';
import lodash from 'lodash';
import Mock from 'mockjs';
import Config from './Config';

var request = {};

request.get = function(url, params)
{
    if (params)
    {
        url += '?' + queryString.stringify(params);
    }
    return fetch(url)
        .then((response) => response.json())
        .then((response) => Mock.mock(response))
};

request.post = function(url, body)
{
    var options = lodash.extend(Config.header, {
        body: JSON.stringify(body)
    });

    return fetch(url, options)
        .then((response) => response.json())
        .then((response) => Mock.mock(response))
};

module.exports = request;