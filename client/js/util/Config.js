'use strict';

module.exports = {
    header: {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    },
    api: {
        base: 'http://rap.taobao.org/mockjs/8136',
        creations: '/api/creations'
    }
};