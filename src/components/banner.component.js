// External Packages
import React from "react";
import {
    StyleSheet,
    View,
    Image} from 'react-native';

export default class BannerComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.containerHeader}>
                <View style={{width: '100%'}}>
                    <Image style={{ width: '100%',  marginTop: 1}} source={require('../assets/images/ANAEKRANGOR.jpg')} resizeMode={'stretch'}/>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    containerHeader: {
        flex: 1,
        width: '100%',
    },
});