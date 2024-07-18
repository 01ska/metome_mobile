// screens/SavingsScreen.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const SavingsScreen = () => {
  const [isCreatingGoal, setIsCreatingGoal] = useState(false);
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [amountCollected, setAmountCollected] = useState(0);
  const [amountToAdd, setAmountToAdd] = useState('');

  const handleAddGoal = () => {
    // Переключаемся на экран виртуальной карты
    setIsCreatingGoal(true);
  };

  const handleAddAmount = () => {
    const newAmount = parseFloat(amountToAdd);
    if (!isNaN(newAmount) && newAmount > 0) {
      setAmountCollected(prev => prev + newAmount);
      setAmountToAdd('');
    } else {
      alert('Введите корректную сумму для добавления');
    }
  };

  return (
    <View style={styles.container}>
      {!isCreatingGoal ? (
        <View style={styles.formContainer}>
          <Text style={styles.title}>Мои Цели</Text>
          <TextInput
            style={styles.input}
            placeholder="Название"
            value={goalName}
            onChangeText={setGoalName}
          />
          <TextInput
            style={styles.input}
            placeholder="Целевая сумма"
            value={targetAmount}
            onChangeText={setTargetAmount}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Дата достижения"
            value={targetDate}
            onChangeText={setTargetDate}
          />
          <Button title="Добавить Цель" onPress={handleAddGoal} />
        </View>
      ) : (
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>Виртуальная Карта</Text>
          <View style={styles.card}>
            <Text style={styles.cardText}>Целевая сумма: {targetAmount} тг.</Text>
            <Text style={styles.cardText}>Собрано: {amountCollected} тг.</Text>
            <TextInput
              style={styles.input}
              placeholder="Введите сумму для добавления"
              value={amountToAdd}
              onChangeText={setAmountToAdd}
              keyboardType="numeric"
            />
            <Button title="Добавить" onPress={handleAddAmount} />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    padding: 20,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    alignItems: 'center',
    backgroundColor: '#e0f7fa', // Light cyan background color for the card
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  cardText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#00796b', // Darker cyan color for card text
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default SavingsScreen;
