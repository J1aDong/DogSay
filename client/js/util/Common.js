'use strict';

import {PixelRatio, Platform} from 'react-native';

class Util {
    static getStatusHeight()
    {
        if (Platform.OS === 'ios')
        {
            return 22;
        } else
        {
            return 0;
        }
    }
}

export default Util;