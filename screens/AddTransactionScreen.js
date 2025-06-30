import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddTransactionScreen({ navigation }) {
  const [note, setNote] = useState('');
  const [amount, setAmount] = useState('');

  const saveTransaction = async () => {
    if (!note || !amount) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const newTx = { note, amount: parseFloat(amount) };
    const stored = await AsyncStorage.getItem('transactions');
    const txs = stored ? JSON.parse(stored) : [];

    txs.push(newTx);
    await AsyncStorage.setItem('transactions', JSON.stringify(txs));

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Note</Text>
      <TextInput value={note} onChangeText={setNote} style={styles.input} />

      <Text style={styles.label}>Amount (use - for expense)</Text>
      <TextInput
        value={amount}
        onChangeText={setAmount}
        style={styles.input}
        keyboardType="numeric"
      />

      <Button title="Save Transaction" onPress={saveTransaction} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontSize: 16, marginTop: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
});
