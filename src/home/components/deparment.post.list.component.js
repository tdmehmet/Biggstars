// External Packages
import React from "react";
import { StyleSheet, FlatList, View, Text, Image, ActivityIndicator} from 'react-native';
import {Container, Thumbnail} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import PropTypes from 'prop-types';
import BiggStarsMasterPostRequest from "../../models/post/BiggStarsMasterPostRequest";
import BiggStarsGroupPostResponse from "../../models/post/BiggStarsGroupPostResponse";
import ApiServices from "../../services/api.services";
import Moment from 'moment';


export default class AllPostListComponent extends React.PureComponent {

    static propTypes = {
        navigation: PropTypes.object.isRequired,
        scrollHandler: PropTypes.func.isRequired,
        userInfo: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            biggStarsGroupPosts: null,
            animationEnabled: false,
            moreDataFound: true,
        }
    }

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    async componentWillMount() {
        await this.setStateAsync({biggStarsGroupPosts: null, animationEnabled: true});
        let biggStarsMasterPostRequest          = new BiggStarsMasterPostRequest();
        let biggStarsGroupPostResponse          = new BiggStarsGroupPostResponse();
        biggStarsMasterPostRequest.lastID       = 0;
        biggStarsMasterPostRequest.requestType  = 2;
        biggStarsMasterPostRequest.userID       = this.props.userInfo.user.uID;
        biggStarsGroupPostResponse              =  await ApiServices.post('/api/Feed/Feed/getMasterPostsByPage',
            JSON.stringify(biggStarsMasterPostRequest),
            this.props.userInfo.token);
        await this.setStateAsync({biggStarsGroupPosts: biggStarsGroupPostResponse.posts, animationEnabled: false});
    }



    handleScroll(event) {
        if (event.nativeEvent.contentOffset.y <= 0) {
            this.props.scrollHandler(true);
        }
    }

    async flatListEndReached() {
            if(this.state.moreDataFound) {
                await this.setStateAsync({animationEnabled: true});
                let lastPost                            = this.state.biggStarsGroupPosts[this.state.biggStarsGroupPosts.length - 1];
                let biggStarsMasterPostRequest          = new BiggStarsMasterPostRequest();
                let remainingBiggStarsGroupPostResponse = new BiggStarsGroupPostResponse();
                biggStarsMasterPostRequest.lastID       = lastPost.notificationID;
                biggStarsMasterPostRequest.requestType  = 2;
                biggStarsMasterPostRequest.userID       = this.props.userInfo.user.uID;
                remainingBiggStarsGroupPostResponse     = await ApiServices.post('/api/Feed/Feed/getMasterPostsByPage', JSON.stringify(biggStarsMasterPostRequest), this.props.userInfo.token);
                let remainingBiggStarsGroupPosts        = remainingBiggStarsGroupPostResponse.posts;

                if (remainingBiggStarsGroupPosts && remainingBiggStarsGroupPosts.length > 0) {
                    await this.setState((prevState) => ({
                        biggStarsGroupPosts: [...this.state.biggStarsGroupPosts, ...remainingBiggStarsGroupPosts],
                    }));
                }else {
                    await this.setStateAsync({moreDataFound: false})
                }
                await this.setStateAsync({animationEnabled: false});
            }


    }


    renderFooter = () => {
        return (

            <View style={{marginBottom: '70%', justifyContent: 'flex-start'}} >
                <ActivityIndicator
                    size="large"
                    color='#FFA000'
                    animating={true}
                    style={this.state.animationEnabled ? {} : {display: 'none'}}/>
            </View>


        );
    };



    renderPosts(post) {
        var postDate = post.date;
        if(post.quenes.length > 0) {
            let avatarURI = "https://abcstars.biggstars.com" + post.quenes[0].destinationUserAvatar;
            let cardURI = "http://abcadmin.biggstars.com" + post.gCardPath;
            let graceName = post.graces.length > 0 ? post.graces[0].graceName : '';
            return (

                <View style={{paddingBottom: 5, paddingTop: 5, marginTop: 5, marginLeft: '2%', flexDirection: 'row', width: '100%', borderBottomWidth: 1, borderBottomColor: '#B4AFAE'}}>
                    <View style={{flexDirection: 'column'}}>
                        <View>
                            <Thumbnail style={styles.thumbnailAvatar}
                                       source={{uri: avatarURI}}
                            />
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'center', alignContent: 'center', textAlignVertical: 'center'}}>
                            <Icon size={12} name={'calendar'} style={{color: '#455A64', paddingTop: 5, paddingRight: 2, textAlignVertical: 'center'}}/>
                            <Text style={{fontSize: 12, color: '#455A64', textAlignVertical: 'center', paddingTop: 5}}>{Moment(postDate).format('DD.MM.YYYY')}</Text>
                        </View>
                    </View>
                    <View style={{ marginLeft: '2%', marginRight: '22%', flexDirection: 'column'}}>
                        <View style={{width: '100%', flexDirection: 'row'}}>
                            <View style={{width: '50%'}}>
                                <Text style={{color: '#455A64', fontWeight: 'bold', fontSize: 15}}>
                                    {post.quenes[0].destinationUserName}
                                </Text>
                            </View>
                            <View style={post.quenes[0].award > 0 && post.quenes[0] ? {
                                width: '50%',
                                flexDirection: 'column',
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end',
                                paddingRight: '-80%',
                                marginLeft: '-7%'}: {width: 0, height: 0}}>



                                <Text >
                                    <Icon size={20} name={'gift'} style={{color: '#455A64', fontWeight: 'bold'}}/>
                                    <Text style={{ marginRight: 5}}>{post.quenes[0].award}</Text>
                                </Text>



                            </View>
                        </View>
                        {/* REWARDS */}
                        <View style={post.postType === 1 ?
                            { flexDirection: 'column'} :
                            {display: 'none'}}
                        >
                            <View style={{flexDirection: 'row', paddingTop: 20} }>
                                <View>
                                    <Icon size={20} name={'users'} style={{color: '#455A64', paddingTop: 2, paddingRight: 5}}/>
                                </View>
                                <View style={{justifyContent: 'center', marginLeft: 2}}>
                                    <Text style={{fontWeight: 'bold'}}>{graceName}</Text>
                                </View>
                            </View>

                            <View style={{flexDirection: 'row', paddingTop: 10}}>
                                <Text style={{color: '#FFA000', fontWeight: 'bold', fontSize: 15}}>
                                    {post.fromUserName}
                                </Text>
                                <Text style={{color: '#455A64', fontWeight: 'bold', fontSize: 15}}>
                                    ' tarafından ödüllendirildi
                                </Text>
                            </View>

                            <View >
                                <Text style={{fontSize: 12}}>
                                    {post.postText}
                                </Text>
                            </View>
                        </View>
                        {/* THANKS */}
                        <View style={post.postType === 3  ?
                            { flexDirection: 'column'} :
                            {display: 'none'}}
                        >

                            <View style={{flexDirection: 'row', paddingTop: 20} }>
                                <View>
                                    <Icon size={20} name={'thumbs-up'} style={{color: '#455A64', paddingTop: 2, paddingRight: 5}}/>
                                </View>
                                <View style={{justifyContent: 'center', marginLeft: 2}}>
                                    <Text style={{fontWeight: 'bold'}}>{graceName}</Text>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{color: '#FFA000', fontWeight: 'bold', fontSize: 15}}>
                                    {post.fromUserName}
                                </Text>
                                <Text style={{color: '#455A64', fontWeight: 'bold', fontSize: 15}}>
                                    ' tarafından teşekkür aldı
                                </Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>

                                <Image style={post.postType === 3 ? { width: 300, height: 290, borderRadius: 0} :
                                    {display: 'none'}}
                                       resizeMode={'stretch'}
                                       source={{uri: cardURI}}/>
                            </View>

                            <View >
                                <Text style={{fontSize: 12}}>
                                    {post.postText}
                                </Text>
                            </View>

                        </View>
                        {/* BIRTHDAY */}
                        <View style={post.postType === 6  ?
                            { flexDirection: 'column'} :
                            {display: 'none'}}
                        >

                            <View style={{flexDirection: 'row'}}>
                                <Icon size={20} name={'birthday-cake'} style={{color: 'blue'}}/>
                                <Icon size={20} name={'birthday-cake'} style={{color: 'brown', marginLeft: 2}}/>
                                <Icon size={20} name={'birthday-cake'} style={{color: 'green', marginLeft: 2}}/>
                                <Icon size={20} name={'birthday-cake'} style={{color: 'red', marginLeft: 2}}/>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{color: '#FFA000', fontWeight: 'bold', fontSize: 15}}>
                                    {post.fromUserName}
                                </Text>
                                <Text style={{color: '#455A64', fontWeight: 'bold', fontSize: 15}}>
                                    ' tarafından tebrik aldı
                                </Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>

                                <Image style={post.postType === 6 ? { width: 300, height: 290, borderRadius: 0} :
                                    {display: 'none'}}
                                       resizeMode={'stretch'}
                                       source={{uri: cardURI}}/>
                            </View>

                            <View >
                                <Text style={{fontSize: 12}}>
                                    {post.postText}
                                </Text>
                            </View>

                        </View>
                        {/* EMPLOYMENT ANNIVERSARY */}
                        <View style={post.postType === 7  ?
                            { flexDirection: 'column'} :
                            {display: 'none'}}
                        >

                            <View style={{flexDirection: 'row'}}>
                                <Icon size={20} name={'child'} style={{color: 'blue'}}/>
                                <Icon size={20} name={'child'} style={{color: 'brown', marginLeft: 2}}/>
                                <Icon size={20} name={'child'} style={{color: 'green', marginLeft: 2}}/>
                                <Icon size={20} name={'child'} style={{color: 'red', marginLeft: 2}}/>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{color: '#FFA000', fontWeight: 'bold', fontSize: 15}}>
                                    {post.fromUserName}
                                </Text>
                                <Text style={{color: '#455A64', fontWeight: 'bold', fontSize: 15}}>
                                    ' tarafından tebrik aldı
                                </Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>

                                <Image style={post.postType === 7 ? { width: 300, height: 290, borderRadius: 0} : {display: 'none'}}
                                       resizeMode={'stretch'}
                                       source={{uri: cardURI}}/>
                            </View>

                            <View >
                                <Text style={{fontSize: 12, paddingBottom: 0}}>
                                    {post.postText}
                                </Text>
                            </View>
                        </View>
                        {/* NEW EMPLOYEE */}
                        <View style={post.postType === 9  ?
                            { flexDirection: 'column'} :
                            {display: 'none'}}
                        >

                            <View style={{flexDirection: 'row'}}>
                                <Icon size={20} name={'child'} style={{color: 'blue'}}/>
                                <Icon size={20} name={'child'} style={{color: 'brown', marginLeft: 2}}/>
                                <Icon size={20} name={'child'} style={{color: 'green', marginLeft: 2}}/>
                                <Icon size={20} name={'child'} style={{color: 'red', marginLeft: 2}}/>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={{color: '#FFA000', fontWeight: 'bold', fontSize: 15}}>
                                    {post.fromUserName}
                                </Text>
                                <Text style={{color: '#455A64', fontWeight: 'bold', fontSize: 15}}>
                                    ' tarafından tebrik aldı
                                </Text>
                            </View>
                            <View style={{width: 300}}>
                                <View style={{flexDirection: 'column'}}>
                                    <Image style={post.postType === 9 ? { width: 300, height: 136, borderRadius: 0} : {display: 'none'}}
                                           resizeMode={'stretch'}
                                           source={require('../../assets/images/hosgeldin.jpg')}>

                                    </Image>
                                </View>
                                <View style={{flexDirection: 'column'}}>
                                    <Thumbnail style={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: 0,
                                        marginLeft: '38%',
                                        marginTop: '-28%'

                                    }}

                                               source={{uri: avatarURI}}
                                    />
                                </View>
                            </View>

                            <View >
                                <Text style={{paddingTop: '5%', paddingBottom: '5%', fontSize: 15, fontWeight: 'bold', textAlign: 'center', color: '#455A64'}}>Kişisel Bilgiler</Text>
                                <Text style={{fontSize: 12, fontWeight: 'bold', textAlign: 'center', color: '#455A64'}}>Adı Soyadı :  {post.quenes[0].destinationUserName}</Text>
                                <Text style={{fontSize: 12, fontWeight: 'bold', textAlign: 'center', color: '#455A64'}}>Pozisyon :  {post.UserPosition}</Text>
                                <Text style={{fontSize: 12, paddingBottom: '5%', fontWeight: 'bold', textAlign: 'center', color: '#455A64'}}>İletişim Bilgileri :  {post.Email}</Text>
                                <Text style={{fontSize: 12, color: '#455A64'}}>
                                    {post.postText}
                                </Text>
                            </View>
                        </View>
                        <View style={{marginTop: 5, marginBottom: 5, borderBottomWidth: 1, borderBottomColor: '#B4AFAE'}}/>
                        <View style={{flexDirection: 'row', width: '100%', height: 20, marginBottom: 10}}>
                            <Icon size={20} name={'commenting'} style={{color: '#455A64', paddingRight: 2}}/>
                            <Text style={{paddingRight: 10, color: '#455A64'}}>{post.allConratulateCount} Tebrik</Text>
                            <Icon size={20} name={'heart'} style={{color: '#455A64', paddingRight: 2}}/>
                            <Text style={{color: '#455A64'}}>{post.allLikeCount} Beğenme</Text>
                        </View>

                    </View>
                    <View style={{borderBottomWidth: 1, borderBottomColor: '#455A64'}}></View>
                </View>

            );
        }
    }


    render() {
        return (

            <View style={{height: '100%'}}>

                <FlatList
                    onScroll={(event) => {this.handleScroll(event)}}
                    data={this.state.biggStarsGroupPosts}
                    keyExtractor = {( item, index ) => 'P' + index }
                    renderItem={({item}) => (this.renderPosts(item))}
                    onEndReached={(event) => {this.flatListEndReached();}}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={this.renderFooter}
                    removeClippedSubviews={true}
                />


            </View>
        );

    }
}

const styles = StyleSheet.create({
    containerPosts: {
        height: '100%'
    },
    thumbnailAvatar: {
        width: 80,
        height: 80,
        borderRadius: 5,
    },
});