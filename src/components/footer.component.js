// External Packages
import React from "react";
import {Linking, StyleSheet, Text, View} from 'react-native';
import { Button, Footer, FooterTab } from "native-base";
import FileService from "../services/file.services";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome";

export default class FooterComponent extends React.Component {

    static propTypes = {
        navigation: PropTypes.object.isRequired,
    };

    logout = async () => {
        const {navigation} = this.props;
        await FileService.removeTokenFile();
        await this.props.navigation.navigate("Login");
    }

    render() {
        const {navigation} = this.props;
        return (
            <Footer style={styles.footer}>
                <FooterTab style={styles.footer}>
                    <View style={{width: '25%', height: '100%'}}>
                    <Button onPress={this.logout}>
                        <Icon size={20} name={'handshake-o'} style={{color: '#FFFFFF'}}/>
                        <Text >Tebrikler</Text>
                    </Button>
                    </View>
                    <View style={{width: '25%', height: '100%'}}>
                        <Button>
                            <Icon size={20} name={'heart'} style={{color: '#FFFFFF'}}/>
                            <Text onPress={() => {}}>Beğeniler</Text>
                        </Button>
                    </View>
                    <View style={{width: '25%', height: '100%'}}>
                        <Button>
                            <Icon size={20} name={'birthday-cake'} style={{color: '#FFFFFF'}}/>
                            <Text onPress={() => {}}>Ödüller</Text>
                        </Button>
                    </View>
                    <View style={{width: '25%', height: '100%'}}>
                        <Button  onPress={() => {console.log('test'); Linking.openURL('https://www.biggrewards.com/');}}>
                            <Icon size={20} name={'shopping-cart'} style={{color: '#FFFFFF'}}/>
                            <Text>Biggrewards</Text>
                        </Button>
                    </View>
                </FooterTab>
            </Footer>
        );
    }
}

const styles = StyleSheet.create({
    footer: {
        backgroundColor: '#FFA000',
    },
});