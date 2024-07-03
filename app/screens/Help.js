import React from "react";
import { Text, StyleSheet, View, TouchableOpacity, Linking } from 'react-native';

const Help = ({ navigation }) => {
    const changePassword = () => {
        navigation.navigate('Registration');
    }
    const callSupport = () => {
        Linking.openURL('tel:+79261234567');
    }

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.header}>Не получается войти?</Text>
                <TouchableOpacity onPress={() => changePassword()} style={styles.button}>
                    <Text style={styles.buttonText}>Изменить пароль</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => callSupport()} style={styles.button}>
                    <Text style={styles.buttonText}>Позвонить</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0ffe5',
    },
    box: {
        width: '80%',
        backgroundColor: '#d7ffb8',
        padding: 30,
        borderRadius: 20,
        alignItems: 'center',
        elevation: 10,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#000',
    },
    button: {
        backgroundColor: '#484848',
        padding: 12,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        marginTop: 15,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default Help;
