import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function BalanceCard({ balance, hideBalance, toggleHideBalance }) {
  return (
    <View style={styles.balanceCard}>
      <Text style={styles.balanceLabel}>Savings Account Balance</Text>
      <Text style={styles.balanceAmount}>
        {hideBalance ? "****" : `NGN${balance.toFixed(2)}`}
      </Text>
      <Text style={styles.accountName}>Adewole Temitope</Text>
      <Text style={styles.accountNumber}>2040011238</Text>
      <TouchableOpacity style={styles.hideBalanceButton} onPress={toggleHideBalance}>
        <Text>{hideBalance ? "Show" : "Hide"} Balance</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  balanceCard: {
    backgroundColor: 'green',
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  balanceLabel: {
    color: 'white',
  },
  balanceAmount: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  accountName: {
    color: 'white',
  },
  accountNumber: {
    color: 'white',
  },
  hideBalanceButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: 'rgba(255,255,255,0.3)',
    padding: 5,
    borderRadius: 5,
  },
});