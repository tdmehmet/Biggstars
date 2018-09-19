// External Packages
import React, { Component } from 'react';
import {View, StyleSheet, Image, Alert} from 'react-native';
import { inject } from 'mobx-react';

// Models
import UserLoginResponse from "../models/user/user.login.response";
import UserPoint from '../models/user/user.point';
import UserBudget from '../models/user/user.budget'
import BiggStarsGroupPostResponse from "../models/post/BiggStarsGroupPostResponse";

// Services
import FileServices from "../services/file.services";
import ApiServices from "../services/api.services";
import BiggStarsMasterPostRequest from "../models/post/BiggStarsMasterPostRequest";

@inject("stores")
export default class SplashScreen extends Component {
    // Constructor for every class
    // Not necessary but good to implement
    constructor(props) {
        super(props);
    }

    // React lifecycle method that runs before render
    async componentDidMount() {
        const { stores, navigation } = this.props;
        try {
            let userLoginResponse = new UserLoginResponse();
            let userInfo = await FileServices.getUserFromTokenFile();
            if (userInfo !== null && userInfo !== undefined) {
                userLoginResponse = JSON.parse(userInfo);
                if (userLoginResponse !== null && userLoginResponse !== undefined) {
                    let apiWithParams = '/api/Account/Account/checkToken?token=' + userLoginResponse.token;
                    let checkTokenResult = await ApiServices.get(apiWithParams, userLoginResponse.token);
                    if (checkTokenResult !== null && checkTokenResult !== undefined && checkTokenResult === "OK") {
                        let userPoint = new UserPoint();
                        userPoint = await ApiServices.get('/api/Account/Account/getme', userLoginResponse.token);
                        let userBudget = new UserBudget();
                        userBudget = await ApiServices.post('/api/Point/Point/getBugetParts', null, userLoginResponse.token);

                        setTimeout(() => {
                            navigation.navigate("Home", {
                                userInfo: userLoginResponse,
                                userPoint: userPoint,
                                userBudget: userBudget,
                                })
                        }, stores.config.splashTime);
                        return;
                    } else {
                        await FileServices.removeTokenFile();
                    }
                }
            }
            setTimeout(() => {
                navigation.navigate("Login")
            }, stores.config.splashTime);
        }catch(error) {
            console.log(error);
            Alert.alert('System Error', error);
        }
    }

    // React life cycle method that runs before componentDidMount
    render() {
        const { stores } = this.props;

        return (

            <View style={styles.viewSplash}>
                <View >
                    <Image style={styles.imageSplash} source={stores.config.SplashImg} />
                </View>
            </View>
        )}
}

const styles = StyleSheet.create ({
    viewSplash: {
        flex: 1,
        backgroundColor: '#B6000C',
    },
    imageSplash: {
        width: '100%',
        height: '100%'
    }
});
