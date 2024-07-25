
import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Image, Switch, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const [isBalanceHidden, setIsBalanceHidden] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const navigation = useNavigation();

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const copyAccountNumber = useCallback(async () => {
    await Clipboard.setStringAsync('2040011238');
    Alert.alert('Copied', 'Account number copied to clipboard');
  }, []);

  const handleSwipeLeft = () => {
    navigation.navigate('Home2');
  };

  const services = [
    { name: 'Send Money', icon: 'paper-plane', color: '#D6FAD1' },
    { name: 'Remita', icon: 'repeat', color: '#F9E7DB' },
    { name: 'Pay Bills', icon: 'receipt', color: '#EFC7B6' },
    { name: 'Airtime', icon: 'phone-portrait', color: '#DDEDF4' },
    { name: 'Loans', icon: 'cash', color: '#FFF2C9' },
    { name: 'Cable TV', icon: 'tv', color: '#EBEBEB' },
    { name: 'Invest', icon: 'trending-up', color: '#DDEDF4' },
    { name: 'Electricity', icon: 'bulb', color: '#BFE9D5' },
  ];

  const transactions = [
    { name: 'Grace Ameh', amount: -10000, date: '15 Oct 2022, 10:00PM', balance: 101203.94 },
    { name: 'Mike Oshadami', amount: 45000, date: '15 Oct 2022, 10:00PM', balance: 156203.94 },
  ];

  return (
    <SafeAreaView style={[styles.container, isDarkMode && styles.containerDark]}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.profileContainer}>
            <Image
              source={require('./assets/Temitope.png')}
              style={styles.profilePic}
            />
            <View style={styles.profileBadge}>
              <Text style={styles.profileBadgeText}>*2</Text>
            </View>
          </View>
          <View>
            <Text style={[styles.greeting, isDarkMode && styles.textDark]}>Hi, Temitope</Text>
            <Text style={[styles.subGreeting, isDarkMode && styles.textDark]}>How are you today?</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity onPress={toggleDarkMode}>
              <Ionicons name={isDarkMode ? 'sunny' : 'moon'} size={15} color={isDarkMode ? 'white' : 'black'} />
            </TouchableOpacity>
            <Ionicons name="notifications-outline" size={18} color={isDarkMode ? 'white' : 'black'} />
          </View>
        </View>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceTitle}>Savings Account Balance</Text>
          <Text style={styles.balanceAmount}>
            {isBalanceHidden ? '******' : 'NGN102,238.71'}
          </Text>
          <Text style={styles.accountName}>Adewole Temitope</Text>
          <View style={styles.accountNumberContainer}>
            <Text style={styles.accountNumber}>2040011238</Text>
            <TouchableOpacity onPress={copyAccountNumber}>
              <Ionicons name="copy-outline" size={12} color="white" style={styles.copyIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.hideBalance}>
            <Text style={styles.hideBalanceText}>Hide Balance</Text>
            <Switch
              value={isBalanceHidden}
              onValueChange={setIsBalanceHidden}
              trackColor={{ false: "#B7B7B7", true: "#333333" }}
              thumbColor={isBalanceHidden ? "#FFFFFF" : "#FFFFFF"}
              ios_backgroundColor="#B7B7B7"
              style={styles.hideBalanceSwitch}
            />
          </View>
        </View>

        <View style={styles.slideIndicator}>
          {[0, 1, 2].map((index) => (
            <View
              key={index}
              style={[
                styles.slideIndicatorDot,
                index === activeSlide && styles.slideIndicatorDotActive,
              ]}
            />
          ))}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDarkMode && styles.textDark]}>Services</Text>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAll}>View all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.servicesGrid}>
          {services.map((service, index) => (
            <TouchableOpacity key={index} style={styles.serviceItem}>
              <View style={[styles.serviceIcon, { backgroundColor: service.color }]}>
                <Ionicons name={service.icon} size={24} color="#333333" />
              </View>
              <Text style={[styles.serviceName, isDarkMode && styles.textDark]}>{service.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, isDarkMode && styles.textDark]}>Recent Transactions</Text>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAll}>View all</Text>
          </TouchableOpacity>
        </View>

        {transactions.map((transaction, index) => (
          <View key={index} style={styles.transactionItem}>
            <View style={styles.transactionIcon}>
              <Ionicons name="paper-plane" size={15} color="#444444" />
            </View>
            <View style={styles.transactionDetails}>
              <Text style={[styles.transactionName, isDarkMode && styles.textDark]}>{transaction.name}</Text>
              <Text style={[styles.transactionDate, isDarkMode && styles.textDark]}>{transaction.date}</Text>
            </View>
            <View style={styles.transactionAmount}>
              <Text style={[styles.amount, { color: transaction.amount < 0 ? '#CC0000' : '#208220' }]}>
                {transaction.amount < 0 ? '-' : '+'}{Math.abs(transaction.amount).toLocaleString()}
              </Text>
              <Text style={[styles.balance, isDarkMode && styles.textDark]}>NGN{transaction.balance.toLocaleString()}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#208220" />
          <Text style={[styles.navItemText, styles.navItemTextActive]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="time-outline" size={24} color="#CCCCCC" />
          <Text style={styles.navItemText}>Transactions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendMoneyButton}>
          <Ionicons name="paper-plane" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="card-outline" size={24} color="#CCCCCC" />
          <Text style={styles.navItemText}>Cards</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="menu-outline" size={24} color="#CCCCCC" />
          <Text style={styles.navItemText}>More</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.swipeIndicator}
        onPress={handleSwipeLeft}
      >
        <Ionicons name="chevron-forward" size={24} color="#208220" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      containerDark: {
        backgroundColor: '#121212',
      },
      textDark: {
        color: '#fff',
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
      },
      profileContainer: {
        position: 'relative',
      },
      profilePic: {
        width: 35,
        height: 35,
        borderRadius: 38,
        marginRight: 10,
      },
      profileBadge: {
        position: 'absolute',
        top: -5,
        right: 5,
        backgroundColor: '#FFD983',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
      },
      profileBadgeText: {
        color: 'grey',
        fontSize: 10,
        fontWeight: 'bold',
      },
      greeting: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333',
      },
      subGreeting: {
        fontSize: 12,
        color: '#666666',
      },
      headerIcons: {
        flexDirection: 'row',
        marginLeft: 'auto',
        gap: 4,
      },
      balanceCard: {
        width: '90%',
        height: 155,
        backgroundColor: '#208220',
        padding: 20,
        margin: 20,
        borderRadius: 10,
        position: 'relative',
      },
      balanceTitle: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '400',
      },
      balanceAmount: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '700',
        marginVertical: 15
      },
      accountName: {
        color: '#fff',
        fontSize: 12,
        marginTop: 9,
      },
      accountNumberContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
      },
      accountNumber: {
        color: '#fff',
        fontSize: 12,
      },
      copyIcon: {
        marginLeft: 8,
      },
      hideBalance: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        right: 16,
        bottom: 15,
      },
      hideBalanceText: {
        color: '#fff',
        fontSize: 12,
      },
    hideBalanceSwitch: {
      transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
    },
      slideIndicator: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: -10,
        marginBottom: 20,
      },
      slideIndicatorDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#B7B7B7',
        marginHorizontal: 4,
      },
      slideIndicatorDotActive: {
        backgroundColor: '#208220',
      },
      section: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        marginTop: 2,
      },
      sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
      },
      servicesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 3,
      },
      serviceItem: {
        width: '25%',
        alignItems: 'center',
        marginBottom: 20,
      },
      serviceIcon: {
        width: 63,
        height: 60,
        borderRadius: 10, 
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 7,
      },
      serviceName: {
        textAlign: 'center',
        fontSize: 12,
      },
      viewAllButton: {
        backgroundColor: '#e8f5e9',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 7,
      },
      viewAll: {
        color: '#208220',
        fontSize: 12,
      },
      transactionIcon: {
        width: 34,
        height: 34,
        borderRadius: 20,
        backgroundColor: '#B7B7B7',
        justifyContent: 'center',
        alignItems: 'center',
      },
      transactionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
      },
      transactionDetails: {
        flex: 1,
        marginLeft: 10,
      },
      transactionName: {
        fontSize: 14,
        fontWeight: '400',
        color: '#333333',
      },
      transactionDate: {
        fontSize: 10,
        color: '#666666',
        marginTop: 5,
      },
      transactionAmount: {
        alignItems: 'flex-end',
      },
      amount: {
        fontSize: 14,
        fontWeight: '700',
      },
      balance: {
        fontSize: 10,
        color: '#666666',
        marginTop: 5,
      },
      bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        paddingVertical: 10,
        backgroundColor: '#FFFFFF',
      },
      navItem: {
        alignItems: 'center',
      },
      navItemText: {
        fontSize: 10,
        marginTop: 4,
        color: '#CCCCCC',
      },
      navItemTextActive: {
        color: '#208220',
      },
      sendMoneyButton: {
        backgroundColor: '#208220',
        width: 55,
        height: 55,
        borderRadius: 27.5,
        justifyContent: 'center',
        alignItems: 'center',
      },
      swipeIndicator: {
    position: 'absolute',
    right: 10,
    top: '50%',
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 15,
    padding: 5,
  },
});