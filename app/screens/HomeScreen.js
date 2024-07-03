import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useUser } from '../../contexts/UserContext'

const HomeScreen = () => {
  const { userData } = useUser();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>С возращением {userData.user.first_name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
});

export default HomeScreen;
