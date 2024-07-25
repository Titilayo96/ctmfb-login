import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Transactions({ darkMode, setBalance }) {
  const sendMoney = (amount) => {
    setBalance(prevBalance => {
      if (prevBalance >= amount) {
        Alert.alert("Success", `NGN${amount} sent successfully!`);
        return prevBalance - amount;
      } else {
        Alert.alert("Error", "Insufficient funds!");
        return prevBalance;
      }
    });
  };

  const receiveMoney = (amount) => {
    setBalance(prevBalance => {
      Alert.alert("Success", `NGN${amount} received!`);
      return prevBalance + amount;
    });
  };

  return (
    <View style={styles.transactions}>
      <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>Recent Transactions</Text>
      <TouchableOpacity style={styles.transaction} onPress={() => sendMoney(10000)}>
        <Ionicons name="arrow-forward-outline" size={24} color={darkMode ? "white" : "black"} />
        <View>
          <Text style={darkMode && styles.darkText}>Grace Ameh</Text>
          <Text style={darkMode && styles.darkText}>15 Oct 2022, 10:00PM</Text>
        </View>
        <Text style={styles.negativeAmount}>-10,000</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.transaction} onPress={() => receiveMoney(45000)}>
        <Ionicons name="arrow-back-outline" size={24} color={darkMode ? "white" : "black"} />
        <View>
          <Text style={darkMode && styles.darkText}>Mike Oshadami</Text>
          <Text style={darkMode && styles.darkText}>15 Oct 2022, 10:00PM</Text>
        </View>
        <Text style={styles.positiveAmount}>+45,000</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  transactions: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  transaction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  negativeAmount: {
    color: 'red',
  },
  positiveAmount: {
    color: 'green',
  },
  darkText: {
    color: 'white',
  },
});