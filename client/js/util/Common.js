'use strict';

import {PixelRatio, Platform, Dimensions} from 'react-native';

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

    static getWindowWidth()
    {
        return Dimensions.get('window').width;
    }
}

export default Util;