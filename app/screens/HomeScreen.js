import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useUser } from "../../contexts/UserContext";

import MyBalance from '../components/MyBalance'
import MyAnalytic from "../components/MyAnalytic";

const HomeScreen = () => {
  const { userData } = useUser();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>С возвращением {userData.user.first_name}</Text>
      <MyBalance />
      <MyAnalytic />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5", 
    padding: 20,
    fontFamily: "Montserrat-Regular"
  },
  title: {
    fontSize: 16,
    fontFamily: "Montserrat-SemiBold"
  },
});

export default HomeScreen;
