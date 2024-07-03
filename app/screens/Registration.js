import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';

const Registration = () => {
    const [phoneNumber, setPhoneNumber] = useState('+7');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [password, setPassword] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');

    const [error, setError] = useState('');
    const [keyError, setKeyError] = useState('');

    const navigation = useNavigation();

    const cleanPhoneNumber = (number) => {
        return number.replace(/[^\d]/g, '');
    };

    const handleRegister = async () => {
        const cleanedPhoneNumber = cleanPhoneNumber(phoneNumber);

        try {
            const response = await fetch('http://157.245.123.144:8001/api/users/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone_number: cleanedPhoneNumber,
                    first_name: firstName,
                    last_name: lastName,
                    middle_name: middleName,
                    password: password,
                    date_of_birth: dateOfBirth,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Регистрация успешна:', data);
                navigation.replace('Profile');
            } else {
                const errorKey = Object.keys(data)[0];
                const errorMessage = data[errorKey][0];
                setKeyError(errorKey);
                setError(errorMessage);
                console.error('Ошибка регистрации:', errorMessage);
            }
        } catch (error) {
            setError('Произошла ошибка при попытке регистрации');
            console.error('Ошибка регистрации:', error.message);
        }
    };

    return (
        <View style={styles.container}>
            {keyError ? <Text style={styles.errorText}>Ошибка в поле {keyError}</Text> : null}
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <TextInputMask
                type={'custom'}
                options={{
                    mask: '+7 999 999 99 99'
                }}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                style={styles.input}
                placeholder="Номер телефона"
            />
            <Input placeholder="Имя" value={firstName} onChangeText={setFirstName} style={styles.input} />
            <Input placeholder="Фамилия" value={lastName} onChangeText={setLastName} style={styles.input} />
            <Input placeholder="Отчество (необязательно)" value={middleName} onChangeText={setMiddleName} style={styles.input} />
            <Input placeholder="Пароль" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
            <Input placeholder="Дата рождения (ГГГГ-ММ-ДД)" value={dateOfBirth} onChangeText={setDateOfBirth} style={styles.input} />
            <Button title="Регистрация" onPress={handleRegister} buttonStyle={styles.button} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f0ffe5',
    },
    input: {
        width: '100%',
        marginVertical: 10,
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        backgroundColor: '#fff',
    },
    button: {
        marginTop: 20,
        width: '100%',
        backgroundColor: '#484848',
        padding: 15,
        borderRadius: 50,
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    },
});

export default Registration;
