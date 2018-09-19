import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Image, Platform, Text, Button } from 'react-native';
import {Fab} from 'native-base';
import HeaderComponent from '../components/header.component';
import HomeMainComponent from "./components/home.main.component";
import FooterComponent from '../components/footer.component';
import BannerComponent from '../components/banner.component'
import Icon from "react-native-vector-icons/FontAwesome5";
import Iconf from "react-native-vector-icons/Feather";
import Iconic from "react-native-vector-icons/Ionicons";


export default class App extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            homeScrollEnabled:true,
            homeMainViewStartPixel: 0,
            tabHeadingHeight: 50,
            active: false,
        };
        this.scrollViewHandler= this.scrollViewHandler.bind(this);
    }

    scrollViewHandler(enabled) {

            this.setState((previousState) => {
                return {homeScrollEnabled: enabled}
            })

    }

    async handleScrollEndDrag(event) {

        const scrollResponder = this.refs.scrollView.getScrollResponder();
        const homeMainComponentStartPixel = this.state.homeMainComponentStartPixel;
        if(event.nativeEvent.contentOffset.y >= this.state.homeMainComponentStartPixel) {
            scrollResponder.scrollResponderScrollTo({y: homeMainComponentStartPixel});
            await this.setState({
                homeScrollEnabled: false,
            });
        }


    }
    setHomeMainViewStartPixel(event) {
        console.log(event.nativeEvent.layout.y);
        this.setState({
            homeMainComponentStartPixel: event.nativeEvent.layout.y + 15,
            //    x: event.nativeEvent.layout.x,
            //    y: event.nativeEvent.layout.y,
            //    width: event.nativeEvent.layout.width,
            //    height: event.nativeEvent.layout.height
        });
    }
    render() {
        const { stores, navigation } = this.props;
        const userInfo = navigation.getParam('userInfo');
        const userPoint = navigation.getParam('userPoint');
        const userBudget = navigation.getParam('userBudget');
        const fabsVisible = false;
        return (
            <View style={styles.viewHomeScreen}>
                <View style={{flex: 11}}>
                    <View style={{flex: 1}}>
                        <HeaderComponent  userInfo={userInfo} navigation={navigation} userPoint={userPoint} userBudget={userBudget} style={{width: '100%'}}/>
                    </View>
                    <View onLayout={(event) => {this.setHomeMainViewStartPixel(event)}} style={{flex: 3} }>
                        <ScrollView ref='scrollView'
                                    scrollEnabled={this.state.homeScrollEnabled}
                                    onMomentumScrollEnd={(event) => this.handleScrollEndDrag(event)}
                                    onScrollEndDrag={(event) => {if(Platform.OS === 'android') this.handleScrollEndDrag(event)}}
                        >
                            <BannerComponent/>
                            <View >
                            <HomeMainComponent  navigation={navigation}
                                                style={{width: '90%'}}
                                                scrollViewHandler = {this.scrollViewHandler}
                                                tabHeadingHeight={this.state.tabHeadingHeight}
                                                userInfo={userInfo}/>
                            </View>
                        </ScrollView>
                    </View>
                </View>
                <View style={{flex: 1}}>
                    <FooterComponent navigation={navigation} />
                </View>
                <Fab
                    active={this.state.active}
                    direction="up"
                    containerStyle={this.state.active ? {marginBottom: '10%',   height: 10, marginRight: '4%', justifyContent: 'flex-start'} :
                        {marginBottom: '10%',   height: 10, justifyContent: 'flex-start'} }
                    style={{backgroundColor: '#D81118', justifyContent: 'center', }}
                    position='bottomRight'
                    onPress={() => {this.setState({ active: !this.state.active }); this.fabsVisible = !this.fabsVisible}}

                >
                    <Icon name='plus'/>
                    <View style={this.fabsVisible ? {width: 100, height: 30, backgroundColor: '#F27C15'} : {display: 'none'}}>
                        <Text style={this.fabsVisible ? {color: '#FFFFFF', fontSize: 12} : {display: 'none'}}>
                            TEŞEKKÜR ET <Icon size={15} style={{color: '#FFFFFF'}} name='gift' />
                        </Text>
                    </View>
                    <View style={this.fabsVisible ? {width: 100, height: 30, backgroundColor: '#2699FB'} : {display: 'none'}}>
                        <Text style={this.fabsVisible ? {color: '#FFFFFF', fontSize: 12} : {display: 'none'}}>
                            TEBRİK ET <Icon size={12} style={{color: '#FFFFFF'}} name='hands-helping' />
                        </Text>
                    </View>
                    <View style={this.fabsVisible ? {width: 100, height: 30, backgroundColor: '#D81118'} : {display: 'none'}}>
                        <Text style={this.fabsVisible ? {color: '#FFFFFF', fontSize: 12} : {display: 'none'}}>
                            ÖDÜLLENDİR <Icon size={15} style={{color: '#FFFFFF'}} name='thumbs-up' />
                        </Text>
                    </View>

                </Fab>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    viewHomeScreen: {
        flex: 1,
        width: '100%',
    },

});
