// screens/TransfersScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TransfersScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Страница переводов</Text>
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

export default TransfersScreen;
 