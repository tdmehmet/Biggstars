import React from 'react';
import {View, StyleSheet, Text} from 'react-native';



export default class LoginFooterComponent extends React.Component {
    render() {
        return (
            <View style={styles.viewCompyRight}>
                <Text style={styles.textCopyRight}>© 2018 BiggStars V 1.0.0</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create ({
    viewCompyRight: {
        flex: 1,
        alignContent: 'flex-end',
    },
    textCopyRight: {
        textAlign: 'center',
        color: '#B6000C',
    }
});
