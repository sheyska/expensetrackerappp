import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const loadTransactions = async () => {
      const data = await AsyncStorage.getItem('transactions');
      const parsed = data ? JSON.parse(data) : [];
      setTransactions(parsed);

      const total = parsed.reduce((sum, tx) => sum + Number(tx.amount), 0);
      setBalance(total);
    };

    const unsubscribe = navigation.addListener('focus', loadTransactions);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.balance}>Balance: ₱{balance}</Text>
      <Button title="Add Transaction" onPress={() => navigation.navigate('Add Transaction')} />

      <FlatList
        data={transactions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={item.amount < 0 ? styles.expense : styles.income}>
            {item.note}: ₱{item.amount}
          </Text>
        )}
        style={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  balance: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  expense: { color: 'red', fontSize: 16, marginVertical: 4 },
  income: { color: 'green', fontSize: 16, marginVertical: 4 },
});
