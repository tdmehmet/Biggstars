// External Packages
import React from "react";
import {StyleSheet, FlatList, View, Text, ScrollView, Platform} from 'react-native';
import {Container, Tabs, Tab, TabHeading} from "native-base";
import PropTypes from 'prop-types';
import {inject} from "mobx-react";
import AllPostListComponent from "./all.post.list.component";
import DepartmentPostListComponent from "./deparment.post.list.component";
import PersonalPostListComponent from "./personal.post.list.component";

//Global Variables
@inject("stores")
export default class HomeMainComponent extends React.Component {

    static propTypes = {
        navigation: PropTypes.object.isRequired,
        scrollViewHandler: PropTypes.func.isRequired,
        userInfo: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
                         currentTab: 0,
                     };
        this.handleScroll = this.handleScroll.bind(this);
    }

    handleScroll(event) {
        this.props.scrollViewHandler(true);
    }

    render() {
        return (
            <Container style={styles.containerPosts}>
                    <Tabs onChangeTab={({ i }) => {this.setState({ currentTab: i})}}
                          style={{width: '100%', height: '100%', marginRight: '5%'}}
                        >
                        <Tab
                            heading={  <TabHeading  style={this.state.currentTab === 0 ?
                                                {backgroundColor: '#FFFFFF', borderBottomWidth: 2, borderBottomColor: '#455A64', borderRightWidth: 1,  borderRightColor: '#ECEFF1'} :
                                                {backgroundColor: '#FFFFFF', borderRightWidth: 1,  borderRightColor: '#ECEFF1'}}

                                        >
                                            <Text style={this.state.currentTab === 0 ?
                                                {color: '#FFA000', marginRight: 2} :
                                                {color: '#455A64', marginRight: 2}}

                                                >TÜMÜ</Text>
                            </TabHeading> }>

                                <AllPostListComponent
                                    navigation={this.props.navigation}
                                    scrollHandler={this.handleScroll}
                                    userInfo={this.props.userInfo} />

                        </Tab>
                        <Tab heading={  <TabHeading style={this.state.currentTab === 1 ?
                                                {backgroundColor: '#FFFFFF',
                                                    borderBottomWidth: 2,
                                                    borderBottomColor: '#455A64',
                                                    borderRightWidth: 1,
                                                    borderRightColor: '#ECEFF1',
                                                    textAlign: 'center'} :
                                                {backgroundColor: '#FFFFFF',
                                                    borderRightWidth: 1,
                                                    borderRightColor: '#ECEFF1',
                                                    textAlign: 'center'}}>
                                            <Text style={this.state.currentTab === 1 ?
                                                {color: '#FFA000', marginRight: 2, textAlign: 'center'} :
                                                {color: '#455A64', marginRight: 2, textAlign: 'center'}}>Departmanımdaki Gönderiler</Text>
                                        </TabHeading>}>
                                <DepartmentPostListComponent
                                    navigation={this.props.navigation}
                                    scrollHandler={this.handleScroll}
                                    userInfo={this.props.userInfo}
                                    postType={2}/>
                        </Tab>
                        <Tab heading={  <TabHeading style={this.state.currentTab === 2 ?
                                                {backgroundColor: '#FFFFFF', borderBottomWidth: 2, borderBottomColor: '#455A64',textAlign: 'center' } :
                                                {backgroundColor: '#FFFFFF', textAlign: 'center'}}>
                                            <Text style={this.state.currentTab === 2 ?
                                                {color: '#FFA000', marginRight: 2} :
                                                {color: '#455A64', marginRight: 2}}>Bana Ait Gönderiler</Text>
                                        </TabHeading>}>

                                <PersonalPostListComponent
                                    navigation={this.props.navigation}
                                    scrollHandler={this.handleScroll}
                                    userInfo={this.props.userInfo} postType={1}/>
                        </Tab>
                    </Tabs>
            </Container>
        );

    }
}

const styles = StyleSheet.create({
    containerPosts: {
        width: '100%',
        marginRight: '5%',
    },
});