import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { useUser } from '../../contexts/UserContext';

const Auth = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState('+7');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [error, setError] = useState('');

    const { setUserData } = useUser();

    const signIn = async () => {
        try {
            const response = await fetch('http://157.245.123.144:8001/api/users/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone_number: phoneNumber,
                    password: password,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Успешный вход:', data);
                setUserData({
                    user: data.user,
                    tokens: {
                        refresh: data.refresh,
                        access: data.access
                    }
                });
                navigation.navigate('Cabinet');
            } else {
                setError(true);
                throw new Error(json.message || 'Не удалось войти');
            }
        } catch (error) {
            throw new Error(json.message || 'Не удалось войти');
        }
    };

    // const togglePasswordVisibility = () => {
    //     setIsPasswordVisible(!isPasswordVisible);
    // };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.header}>Вход</Text>
                <TextInput
                    placeholder='Номер телефона'
                    style={styles.input}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType='phone-pad'
                    autoCapitalize='none'
                    autoCorrect={false}
                />
                <View style={styles.passwordContainer}>
                    <TextInput
                        placeholder='Пароль'
                        style={styles.inputPassword}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!isPasswordVisible}
                        autoCapitalize='none'
                        autoCorrect={false}
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={signIn}>
                    <Text style={styles.buttonText}>Войти</Text>
                </TouchableOpacity>
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Registration')}>
                    <Text style={styles.linkText}>Зарегистрироваться</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Help')}>
                    <Text style={styles.linkText}>Связаться с нами</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0ffe5',
    },
    card: {
        width: '80%',
        padding: 30,
        backgroundColor: '#d7ffb8',
        borderRadius: 20,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        alignItems: 'center',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        color: '#000',
    },
    input: {
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 20,
        padding: 15,
        marginBottom: 15,
        fontSize: 16,
        width: '100%',
        backgroundColor: '#fff',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        width: '100%',
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 20,
        backgroundColor: '#fff',
    },
    inputPassword: {
        flex: 1,
        padding: 15,
        fontSize: 16,
    },
    eyeIcon: {
        padding: 10,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        width: '100%',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#000000',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxInner: {
        width: 12,
        height: 12,
        backgroundColor: '#000000',
    },
    checkboxLabel: {
        fontSize: 16,
    },
    button: {
        backgroundColor: '#484848',
        padding: 15,
        borderRadius: 50,
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
    },
    errorText: {
        color: 'red',
        alignSelf: 'center',
        marginBottom: 10,
    },
    link: {
        marginTop: 10,
    },
    linkText: {
        color: '#FF0000',
        textDecorationLine: 'underline',
        textAlign: 'center',
    },
});

export default Auth;
