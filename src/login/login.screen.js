// PACKAGES
import React from 'react';
import {View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Platform} from 'react-native';
import CryptoJS from "crypto-js";
import Icon from "react-native-vector-icons/FontAwesome";
import {inject} from "mobx-react";
import SpinnerScreen from 'react-native-loading-spinner-overlay';

// MODELS
import UserLoginResponse from "../models/user/user.login.response";
import UserLoginInput from "../models/user/user.login.input";
import UserPoint from '../models/user/user.point';
import UserBudget from '../models/user/user.budget'


// SERVICES
import FileServices from "../services/file.services";
import ApiServices from "../services/api.services";

// PAGE COMPONENTS
import LoginHeaderComponent from './components/login.header.component';
import LoginFooterComponent from './components/login.footer.component';
import BiggStarsMasterPostRequest from "../models/post/BiggStarsMasterPostRequest";
import BiggStarsGroupPostResponse from "../models/post/BiggStarsGroupPostResponse";

@inject("stores")
export default class LoginScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        emailText: '',
        passwordText: '',
        spinnerVisible: false,
        loginUser: null,
    };

    handleEmailChange = (emailText) => {
        this.setState({emailText});
    }

    handlePasswordChange = (passwordText) => {
        this.setState({passwordText});
    }

    setSpinnerInvisible = () => {
        this.setState((prevState) => ({
            spinnerVisible: false,
        }));
    }
    login = async () => {
        try {

            await this.setState((prevState) => ({
                spinnerVisible: true
            }));
            let userLoginResponse = new UserLoginResponse();
            const { stores, navigation } = this.props;
            let loginInput = new UserLoginInput();
            loginInput.password = CryptoJS.SHA512(this.state.passwordText).toString().substring(0, 60).toUpperCase();
            loginInput.email = this.state.emailText;
            let loginInputJSONValue = JSON.stringify(loginInput);
            let response = await ApiServices.post('/api/Account/Account/loginUser', loginInputJSONValue, null) ;
            if(response !== null && response !== undefined && response !== '') {
                userLoginResponse = response;
                if(userLoginResponse.token !== null && userLoginResponse.token !== undefined && userLoginResponse.token !== '') {
                    userLoginResponse.password = loginInput.password;
                    console.log(userLoginResponse.password);
                    let userPoint = new UserPoint();
                    userPoint = await ApiServices.get('/api/Account/Account/getme', userLoginResponse.token);
                    let userBudget = new UserBudget();
                    userBudget = await ApiServices.post('/api/Point/Point/getBugetParts', null, userLoginResponse.token);
                    let writeFile = await FileServices.writeTokenFile(JSON.stringify(userLoginResponse));
                    await navigation.navigate(
                        "Home", {
                            userInfo: userLoginResponse,
                            userPoint: userPoint,
                            userBudget: userBudget,
                        });
                }else {
                    if(Platform.OS === 'ios') {
                        Alert.alert('Hatalı Kullanıcı veya Şifre', 'Hatalı Kullanıcı veya Şifre Girdiniz', this.setSpinnerInvisible);
                    }else {
                        Alert.alert('Hatalı Kullanıcı veya Şifre', 'Hatalı Kullanıcı veya Şifre Girdiniz', this.setSpinnerInvisible());
                    }

                }
            }

        }catch(error) {
            console.log(error);
            if(Platform.OS === 'ios') {
                Alert.alert('System Error' + error, this.setSpinnerInvisible);
            }else {
                Alert.alert('System Error' + error, this.setSpinnerInvisible());
            }

        }
    }
    render() {

        return (

            <View style={styles.containerLogin}>
                <SpinnerScreen visible={this.state.spinnerVisible} color={'#B6000C'}/>
                <LoginHeaderComponent/>
                <View style={styles.viewLoginForm}>
                    <View style={styles.viewUserName}>
                        <Icon name="at" style={styles.iconUserNamePassword} size={35}/>
                        <TextInput key='email'
                                   id='email'
                                   style={styles.textInputUserNamePassword}
                                   placeholder='ornek@ornek.com'
                                   onChangeText={this.handleEmailChange}
                        />
                    </View>
                    <View style={styles.viewPassword}>
                        <Icon name="key" style={styles.iconUserNamePassword} size={35}/>
                        <TextInput key='password'
                                   id='password'
                                   style={styles.textInputUserNamePassword}
                                   placeholder='Parola'
                                   onChangeText={this.handlePasswordChange}
                                   secureTextEntry={true}
                        />
                    </View>
                    <View style={styles.viewLoginButton1}>
                        <TouchableOpacity onPress={this.login}>
                            <View style={styles.viewLoginButton2}>
                                <Text style={styles.textLoginButton} >Oturum Aç</Text>

                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.viewForgotPasswordButton}>
                        <TouchableOpacity onPress={() => {return;}}>
                            <View>
                                <Text style={styles.textForgotPasswordButton}>Şifremi Unuttum</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>
                <LoginFooterComponent/>
            </View>
        );
    }
}

const styles = StyleSheet.create ({
    // CONTAINER STYLES
    containerLogin: {
        backgroundColor: '#ffffff',
        flex: 1,
    },
    ////////////////////////////////////
    // VIEW STYLES
    viewLoginForm: {
        flex: 2,
        width: '100%',
    },
    viewUserName: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: 50,
        justifyContent: 'center',
    },
    viewPassword: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: 50,
        marginTop: 10,
        justifyContent: 'center',
    },
    viewLoginButton1: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',

    },
    viewLoginButton2: {
        marginTop: 10,
        width: 295,
        height: 30,
        backgroundColor: '#B6000C',
        justifyContent: 'center',
    },
    viewForgotPasswordButton: {

        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    viewSpinner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ////////////////////////////////////
    // ICON STYLES
    iconUserNamePassword: {
        backgroundColor: '#B6000C',
        color: '#ffffff',
        textAlign: 'center',
        alignContent: 'center',

        height: 35,
        width: 40,
    },
    ////////////////////////////////////
    // TEST STYLES
    textInputUserNamePassword: {
        height: 35,
        width: 250,
        borderWidth: 1,
        borderColor: '#d3d1ca',
    },
    textLoginButton: {

        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    textForgotPasswordButton: {
        color: '#B6000C',
        fontWeight: 'bold',
    }
});