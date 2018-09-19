// External Packages
import React from "react";
import {
    StyleSheet,
    StatusBar,
    View,
    Image, Platform, Alert
} from 'react-native';
import {
    Header,
    Container,
    Button,
    Thumbnail,
    Item,
    Input,
    Text,
} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import AutoComplete from 'react-native-autocomplete-input';
import PropTypes from 'prop-types';
import UserSearchRequest from '../models/user/user.search.request';
import ApiService from '../services/api.services';

// Services
import FileService from '../services/file.services';
import UserSearchResponse from "../models/user/user.search.response";

export default class HeaderComponent extends React.PureComponent {

    constructor(props) {
        super(props);

    }

    state = {
        query: "",
        userSearchResponseList: [new UserSearchResponse()],
    }

    static propTypes = {
        userInfo: PropTypes.object.isRequired,
        userBudget: PropTypes.object.isRequired,
        userPoint: PropTypes.object.isRequired,
        navigation: PropTypes.object.isRequired,
    };

    logout = async () => {
        const {stores, navigation} = this.props;
        await FileService.removeTokenFile();
        await this.props.navigation.navigate("Login");
    }

    async componentDidMount() {
        let userSearchRequest = new UserSearchRequest();
        let userSearchResponse = new UserSearchResponse();
        userSearchRequest.text = "";
        userSearchResponse = await ApiService.post('api/Search/Search/searchUser', JSON.stringify(userSearchRequest), this.props.userInfo.token);
        await this.setState({
            userSearchResponseList : userSearchResponse.resultsNew,
        })
        console.log(this.state.userSearchResponseList);

    }

    findUserList(query) {
        if (query === '' || query.length < 3) {
            return [];
        }

        const { userSearchResponseList } = this.state;
        const regex = new RegExp(`${query.trim()}`, 'i');
        console.log(userSearchResponseList);
        return userSearchResponseList.filter((user) => user.name.search(regex) >= 0);
    }

    render() {
        const { query } = this.state;
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
        const userList = this.findUserList(query);
        return (
            <View style={styles.containerHeader}>
                <Header androidStatusBarColor={'white'} style={styles.biggStarsHeader}>
                    <View>
                        <StatusBar barStyle="dark-content" />
                    </View>

                    <View style={styles.viewBurgerMenuSearch}>
                        <View style={styles.viewHamburgerMenu}>
                            <Button
                                transparent
                                onPress={() => this.props.navigation.openDrawer()}>
                                <Icon name="bars" style={styles.iconHamburgerMenu} size={30}/>
                            </Button>
                        </View>



                        <View style={{
                            justifyContent: 'center',

                            width: '65%',

                            color: '#455A64',

                            }}>
                            <AutoComplete
                                style={{

                                    }}
                                autoCapitalize="none"
                                autoCorrect={false}
                                data={userList.length === 1 && comp(query, userList[0].name) ? [] : userList}
                                defaultValue={query}
                                containerStyle={{flex: 1,
                                    left: 0,

                                    right: 0,
                                    top: 0,
                                    zIndex: 1}}
                                onChangeText={text => this.setState({ query: text })}
                                placeholder="Kullanıcı, Departman, Görev Ara"
                                renderItem={( user ) => (
                                    <Text style={{color: '#000000'}}>{user.category}</Text>
                                )}
                            />
                        </View>

                    </View>



                </Header>
                <View style={styles.viewAvatarUserInfoCompanyLogo}>

                        <View style={styles.viewAvatar}>
                            <Thumbnail style={styles.thumbnailAvatar}
                                       source={{uri: "https://abcstars.biggstars.com" + this.props.userInfo.user.avatar}}
                            />

                        </View>
                    <View style={styles.viewUserInfo}>
                        <View style={{flexDirection: 'row'}}>
                            <View>
                                <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                                    {this.props.userInfo.user.name + " " + this.props.userInfo.user.surname}
                                </Text>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', paddingBottom: 2, borderBottomWidth: 1, borderBottomColor: '#455A64'}}>
                            <View>
                                <Icon style={styles.iconBriefcase}
                                      size={15}
                                      name={'briefcase'}
                                />
                            </View>
                            <View style={{marginLeft: 5}}>
                                <Text style={styles.textTitle}>
                                    {this.props.userInfo.user.User_Organization[0].Category.Name}
                                </Text>
                            </View>
                        </View>

                        <View style={{flexDirection: 'row',}}>

                            <View>
                                <Text style={styles.textPoints}>
                                    {this.props.userPoint.LmslastBlance}
                                </Text>
                            </View>
                            <View style={{marginLeft: 2}}>
                                <Text style={styles.textPoints}>
                                    Biggpuan
                                </Text>
                            </View>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <View>
                                <Text style={{color: '#455A64',
                                    fontSize: 15,
                                    textAlignVertical: 'center',
                                    fontWeight: 'bold'}}>
                                    Bütçem:
                                </Text>
                            </View>
                            <View>
                                <Text style={{color: '#455A64',
                                    fontSize: 15,
                                    textAlignVertical: 'center',
                                    marginLeft: 2,
                                }}>
                                    {this.props.userBudget.allbudget}
                                </Text>
                            </View>
                            <View style={{marginLeft: 2}}>
                                <Text style={{color: '#455A64',
                                    fontSize: 15,
                                    textAlignVertical: 'center',}}>
                                    Biggpuan
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.viewCompanyLogo}>
                        <Image style={styles.imageCompanyLogo}
                               source={require('../assets/images/abacstars-logo.png')}
                        />
                    </View>
                </View>



            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerHeader: {
        width: '100%',
        fontFamily: 'Baloo',
    },
    biggStarsHeader: {
        backgroundColor: '#FFFFFF',
        width: '100%',
    },

    viewBurgerMenuSearch: {

        flexWrap: 'wrap',
        flexDirection: 'row',
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#ddd',

    },
    viewHamburgerMenu: {
        width: '10%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',

    },
    iconHamburgerMenu: {
        textAlignVertical: 'center',
        color: '#A4A4A4',
    },
    viewSearch: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        width: '85%',
    },
    itemSearch: {
        flexDirection: 'row',
        width: '80%',
        borderLeftWidth: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderRadius: 10,
        borderColor: '#4D4B4B',
        height: '60%',



    },
    iconSearch: {
        width: '15%',
        color: '#2699FB',
        fontWeight: 'bold',
        textAlignVertical: 'center',
        textAlign: 'center',

    },
    inputSearch: {
        width: '100%',
        color: '#000000',
        fontSize: 12,
    },
    iconClear: {
        width: '15%',
        fontWeight: 'bold',
        color: '#2699FB',
        marginRight: 2,
        textAlign: 'right',
    },
    viewAvatarUserInfoCompanyLogo: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: '2%',
    },

    viewAvatar: {
        width: '27%',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    viewUserInfo: {
        width: '43%',
        height: '100%',
        flexDirection: 'column',

    },
    colBriefcase: {
        width: '15%',
        justifyContent: 'center',
    },
    iconBriefcase: {
        color: '#FFA000',
    },
    colTitle: {
        justifyContent: 'center',
        width: '85%',

    },
    textTitle: {
        marginRight: 5,
        color: '#455A64',
        fontSize: 12,
        textAlignVertical: 'center',
    },
    colSmilePoints: {
        width: '15%',
        justifyContent: 'center',
    },
    iconSmilePoints: {
        color: '#FFA000',
    },
    colTextPointsLabel: {
        width: '70%',
        justifyContent: 'center',
    },

    colSmileBudget: {
        width: '15%',
        justifyContent: 'center',
    },
    iconSmileBudget: {
        color: '#FFA000',
    },
    colTextBudgetLabel: {
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textBudgetLabel: {
        color: '#455A64',
        fontSize: 12,
        textAlignVertical: 'center',
    },
    colTextBudget: {
        width: '15%',
        justifyContent: 'center',
    },
    textBudget: {
        textAlignVertical: 'center',
        textAlign: 'center',
    },
    textPointsBudgetLabel: {
        textAlignVertical: 'center',
        textAlign: 'center',
    },
    textPointsLabel: {
        color: '#455A64',
        fontSize: 12,
    },

    colTextPoints: {
        width: '20%',
        justifyContent: 'center',
    },
    textPoints: {
        textAlignVertical: 'center',
        textAlign: 'left',
        fontSize: 18,
        color: '#F27C15',
    },
    thumbnailAvatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    viewCompanyLogo: {
        width: '28%',
        alignItems: 'center',
    },
    imageCompanyLogo: {
        marginTop: '-25%',
        width: 100,
        height: 100,
    },
    autoCompleteContainer: {

    },
    itemText: {
        fontSize: 15,
        margin: 2
    },


});