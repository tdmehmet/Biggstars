import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { inject } from 'mobx-react';

@inject("stores")
export default class LoginHeaderComponent extends React.Component {
    render() {
        const { stores } = this.props;
        return (
            <View style={styles.header}>
                <View style={styles.imageView}>
                    <Image style={styles.headerLogo}
                           source={stores.config.LogoImg}
                    />
                    <Text style={styles.headerText}>
                        BIGGSTARS' a Hoşgeldiniz
                    </Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create ({
    header: {
        flex: 2,
        flexWrap: 'wrap',

    },
    imageView: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',

    },
    headerLogo: {
        width: 120,
        height: 120,
    },
    headerText: {
        marginTop: 20,
        color: '#B6000C',
        fontWeight: 'bold',
    }
});