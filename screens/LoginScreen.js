import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const userData = await AsyncStorage.getItem(`user_${username}`);
    if (userData) {
      const user = JSON.parse(userData);
      if (user.password === password) {
        await AsyncStorage.setItem('loggedInUser', username);
        navigation.replace('Home');
      } else {
        Alert.alert('Error', 'Incorrect password');
      }
    } else {
      Alert.alert('Error', 'User not found. Please register.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to Expense Tracker App</Text>
      <Text style={styles.title}>Login</Text>
      <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} style={styles.input} secureTextEntry />
      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerLink}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  welcome: { fontSize: 35, fontWeight: 'bold', marginTop: 25, textAlign: 'center' },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  registerLink: { marginTop: 15, color: 'blue', textAlign: 'center' },

  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#e6f7ff', // light blue background
  },
 
});

