'use strict';

import React from 'react';
import {
    AppRegistry,
    Navigator
} from 'react-native';
import HomeList from './pages/HomeList';

class App extends React.Component {
    render()
    {
        let defaultName = 'HomeList';
        let defaultComponent = HomeList;
        return (
            <Navigator
                initialRoute={{name: defaultName, component: defaultComponent}}
                configureScene={(route) =>
                {
                    return Navigator.SceneConfigs.FloatFromRight;
                }}
                renderScene={(route, navigator) =>
                {
                    let Component = route.component;
                    return <Component {...route.params} navigator={navigator}/>
                }}
            />
        )
    }
}

export default App;