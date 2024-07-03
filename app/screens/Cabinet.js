import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TextInput, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'react-native-image-picker';

const defaultProfileImage = 'https://www.example.com/default-profile.png'; // URL изображения по умолчанию

const Cabinet = () => {
    const [profileImage, setProfileImage] = useState(null);
    const [surname, setSurname] = useState('');
    const [name, setName] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    useEffect(() => {
        const getData = async () => {
            const storedImage = await AsyncStorage.getItem('profileImage');
            const storedSurname = await AsyncStorage.getItem('surname');
            const storedName = await AsyncStorage.getItem('name');
            const storedPatronymic = await AsyncStorage.getItem('patronymic');
            const storedBirthdate = await AsyncStorage.getItem('birthdate');
            const storedEmail = await AsyncStorage.getItem('email');
            const storedPhone = await AsyncStorage.getItem('phone');
            const storedPassword = await AsyncStorage.getItem('password');

            if (storedImage) setProfileImage(storedImage);
            setSurname(storedSurname);
            setName(storedName);
            setPatronymic(storedPatronymic);
            setBirthdate(storedBirthdate);
            setEmail(storedEmail);
            setPhone(storedPhone);
            setPassword(storedPassword);
        };
        getData();
    }, []);

    const handleChoosePhoto = () => {
        const options = {
            mediaType: 'photo',
            maxWidth: 300,
            maxHeight: 300,
            quality: 1,
        };
        ImagePicker.launchImageLibrary(options, async (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.assets) {
                const selectedImage = response.assets[0].uri;
                setProfileImage(selectedImage);
                await AsyncStorage.setItem('profileImage', selectedImage);
            }
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <TouchableOpacity onPress={handleChoosePhoto}>
                    <Image
                        source={profileImage ? { uri: profileImage } : { uri: defaultProfileImage }}
                        style={styles.profileImage}
                    />
                </TouchableOpacity>
                <Text style={styles.profileText}>{surname} {name} {patronymic}</Text>
                <Text style={styles.profileText}>{birthdate}</Text>
                <TouchableOpacity style={styles.uploadButton} onPress={handleChoosePhoto}>
                    <Text style={styles.uploadButtonText}>Загрузить фото</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
                <View style={styles.inputRow}>
                    <Text style={styles.label}>E-mail:</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        editable={false}
                    />
                    <TouchableOpacity style={styles.editIcon}>
                        <AntDesign name="edit" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.inputRow}>
                    <Text style={styles.label}>Телефон:</Text>
                    <TextInput
                        style={styles.input}
                        value={phone}
                        editable={false}
                    />
                    <TouchableOpacity style={styles.editIcon}>
                        <AntDesign name="edit" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <View style={styles.inputRow}>
                    <Text style={styles.label}>Пароль:</Text>
                    <TextInput
                        style={styles.input}
                        value={passwordVisible ? password : '*'.repeat(password.length)}
                        editable={false}
                        secureTextEntry={!passwordVisible}
                    />
                    <TouchableOpacity 
                        style={styles.editIcon} 
                        onPress={() => setPasswordVisible(!passwordVisible)}
                    >
                        <AntDesign name={passwordVisible ? "eyeo" : "eye"} size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    profileText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    uploadButton: {
        backgroundColor: '#555',
        padding: 10,
        borderRadius: 20,
        marginTop: 10,
    },
    uploadButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    inputContainer: {
        width: '90%',
    },
    inputRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingBottom: 5,
    },
    label: {
        fontSize: 16,
        width: '25%',
    },
    input: {
        fontSize: 16,
        width: '55%',
    },
    editIcon: {
        width: '15%',
        alignItems: 'center',
    },
});

export default Cabinet;
