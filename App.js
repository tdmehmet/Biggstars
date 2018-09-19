// External Packages
import React, {Component} from 'react';
import { Provider } from 'mobx-react';

// Navigators
import AppNavigator from './src/appnavigation/app.navigator';

// Stores for MOBX Dependency Injection
import Stores from './src/stores'


export default class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Provider stores={Stores}>
                <AppNavigator/>
            </Provider>
        );
    }
}
