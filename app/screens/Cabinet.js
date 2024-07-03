import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TextInput, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'react-native-image-picker';
import { useUser } from '../../contexts/UserContext';

const defaultProfileImage = 'https://www.example.com/default-profile.png'; 

const Cabinet = () => {

    const { userData, setUserData } = useUser();

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <Text style={styles.profileText}>{userData.user.first_name} {userData.user.last_name} {userData.user.middle_name}</Text>
                <Text style={styles.profileText}>{userData.user.date_of_birth}</Text>
            </View>
            <View style={styles.inputContainer}>
                <View style={styles.inputRow}>
                    <Text style={styles.label}>Телефон:</Text>
                    <TextInput
                        style={styles.input}
                        value={userData.user.phone_number}
                        editable={false}
                    />
                    <TouchableOpacity style={styles.editIcon}>
                        <AntDesign name="edit" size={24} color="black" />
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
