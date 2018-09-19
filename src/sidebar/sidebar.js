import React from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Thumbnail} from "native-base";
import FileServices from "../services/file.services";
import UserLoginRepsonse from "../models/user/user.login.response";
import User from '../models/user/user';
import User_Organization from "../models/user/user.organization";
import UserCategory from "../models/user/user.category";
import Icon from "react-native-vector-icons/FontAwesome5";
import FileService from "../services/file.services"


export default class SideBar extends React.Component {

    constructor(props) {
        super(props);
        let initialUser = new UserLoginRepsonse();
        initialUser.user = new User();
        initialUser.user.User_Organization = [new User_Organization()];
        initialUser.user.User_Organization[0].Category = new UserCategory();
        this.state = {
            userInfo: initialUser,
        };
    }

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    async componentDidMount() {

        let userInfo = await FileServices.getUserInfoFromTokenFile();
        if(userInfo !== 'empty') {
            await this.setStateAsync({userInfo: userInfo});
        }
    }

    logout = async () => {
        const {navigation} = this.props;
        await FileService.removeTokenFile();
        await this.props.navigation.navigate("Login");
    }


    render() {

        return (
            <View style={{height: '100%', flex: 1}}>
                <View style={{
                    height: '30%',
                    width: '100%',
                    backgroundColor: '#000149',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Image style={{height: 80,
                        width: 80,
                        borderRadius: 40}}
                               source={{uri: "https://abcstars.biggstars.com" + this.state.userInfo.user.avatar}}
                    />
                    <Text style={{
                        color: '#FFFFFF',
                        fontSize: 15,
                        paddingTop: 2
                    }}>
                        {this.state.userInfo.user.name} {this.state.userInfo.user.surname}
                    </Text>
                    <Text style={{
                        color: '#FFFFFF',
                        fontSize: 15,
                        paddingTop: 2
                    }}>
                        {this.state.userInfo.user.User_Organization[0].Category.Name}
                    </Text>
                </View>
                <View style={{height: '70%', width: '100%'}}>
                    <View style={styles.hamburgerMenuItemContainer}>
                        <View style={{flex: 1, width: '100%', height: '100%', flexDirection: 'row', marginLeft: '15%'}}>
                            <View style={{justifyContent: 'center'}}>
                                <View style={{flexDirection: 'row'}}>
                                    <View style={{width: '15%'}}>
                                    <Icon
                                            style={{color: '#FFA000', textAlignVertical: 'center'}}
                                            size={25}
                                            name={'user'}

                                    />
                                    </View>
                                    <View style={{width: '85%'}}>
                                        <Text style={{color: '#455A64', fontSize: 18, textAlignVertical: 'center'}}>
                                            Profilim
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.hamburgerMenuItemContainer}>
                        <View style={{flex: 1, width: '100%', height: '100%', flexDirection: 'row', marginLeft: '15%'}}>
                            <View style={{justifyContent: 'center'}}>
                                <View style={{ flexDirection: 'row'}}>
                                    <View style={{width: '15%'}}>
                                    <Icon
                                        style={{color: '#FFA000', textAlignVertical: 'center'}}
                                        size={25}
                                        name={'cogs'}

                                    />
                                    </View>
                                    <View style={{width: '85%'}}>
                                    <Text style={{color: '#455A64', fontSize: 18, textAlignVertical: 'center'}}>
                                        Hesap Bilgilerim
                                    </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.hamburgerMenuItemContainer}>
                        <View style={{flex: 1, width: '100%', height: '100%', flexDirection: 'row', marginLeft: '15%'}}>
                            <View style={{justifyContent: 'center'}}>
                                <View style={{flexDirection: 'row'}}>
                                    <View style={{width: '15%'}}>
                                        <Icon
                                            style={{color: '#FFA000', textAlignVertical: 'center'}}
                                            size={25}
                                            name={'key'}
                                        />
                                    </View>
                                    <View style={{width: '85%'}}>
                                        <Text style={{color: '#455A64', fontSize: 18, textAlignVertical: 'center'}}>
                                            Şifre İşlemleri
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.hamburgerMenuItemContainer}>
                        <View style={{flex: 1, width: '100%', height: '100%', flexDirection: 'row', marginLeft: '15%'}}>
                            <View style={{justifyContent: 'center'}}>
                                <View style={{flexDirection: 'row'}}>
                                    <View style={{width: '15%'}}>
                                    <Icon
                                        style={{color: '#FFA000', textAlignVertical: 'center'}}
                                        size={25}
                                        name={'address-card'}

                                    />
                                    </View>
                                    <View style={{width: '85%'}}>
                                        <Text style={{color: '#455A64', fontSize: 18, textAlignVertical: 'center'}}>
                                            Eğitim Bilgilerim
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.hamburgerMenuItemContainer}>
                        <View style={{flex: 1, width: '100%', height: '100%', flexDirection: 'row', marginLeft: '15%'}}>
                            <View style={{justifyContent: 'center'}}>
                                <View style={{flexDirection: 'row'}}>
                                    <View style={{width: '15%'}}>
                                        <Icon
                                            style={{color: '#FFA000', textAlignVertical: 'center'}}
                                            size={25}
                                            name={'comment-alt'}

                                        />
                                    </View>
                                    <View style={{width: '85%'}}>
                                        <Text style={{color: '#455A64', fontSize: 18, textAlignVertical: 'center'}}>
                                            Bir Önerim Var
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.hamburgerMenuItemContainer} onPress={() => {this.logout()}}>
                        <View style={{flex: 1, width: '100%', height: '100%', flexDirection: 'row', marginLeft: '15%'}}>
                            <View style={{justifyContent: 'center'}}>
                                <View style={{flexDirection: 'row'}}>
                                    <View style={{width: '15%'}}>
                                        <Icon
                                            style={{color: '#FFA000', textAlignVertical: 'center'}}
                                            size={25}
                                            name={'power-off'}

                                        />
                                    </View>
                                    <View style={{width: '85%'}}>
                                        <Text style={{color: '#455A64', fontSize: 18, textAlignVertical: 'center'}}>
                                            Çıkış
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    hamburgerMenuItemContainer: {
        height: '15%',
        width: '100%',
        backgroundColor: '#ECEFF1',
        marginTop: '2.6%',
    },

    hamburgerMenuItem: {

    }

});