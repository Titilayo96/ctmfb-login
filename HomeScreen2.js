
import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Image, Switch, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen2() {
  const [isBalanceHidden, setIsBalanceHidden] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const navigation = useNavigation();
  

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const copyAccountNumber = useCallback(async () => {
    await Clipboard.setStringAsync('2040011238');
    Alert.alert('Copied', 'Account number copied to clipboard');
  }, []);

  const handleSwipeRight = () => {
    navigation.goBack();
  };

  const services = [
    { name: 'Send Money', icon: 'paper-plane', color: '#e8f5e9' },
    { name: 'Loans', icon: 'cash', color: '#fff3e0' },
    { name: 'Pay Bills', icon: 'receipt', color: '#fce4ec' },
    { name: 'Airtime', icon: 'phone-portrait', color: '#e3f2fd' },
  ];

  const todoItems = [
    { id: 1, title: 'Upgrade KYC Level', icon: 'shield-checkmark', isDone: true },
    { id: 2, title: 'Set Account Limits', icon: 'bar-chart', isDone: false },
    { id: 3, title: 'Enable your biometrics', icon: 'finger-print', isDone: false },
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
              <Text style={styles.profileBadgeText}>*1</Text>
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
          <Text style={styles.sectionTitle}>Services</Text>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAll}>View all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.servicesGrid}>
          {services.map((service, index) => (
            <TouchableOpacity key={index} style={styles.serviceItem}>
              <View style={[styles.serviceIcon, { backgroundColor: service.color }]}>
                <Ionicons name={service.icon} size={24} color="#4CAF50" />
              </View>
              <Text style={styles.serviceName}>{service.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Things to do</Text>
          <Text style={styles.doneCount}>Done {todoItems.filter(item => item.isDone).length} of {todoItems.length}</Text>
        </View>

        {todoItems.map((item) => (
          <TouchableOpacity key={item.id} style={[styles.todoItem, item.isDone && styles.todoItemDone]}>
            <Ionicons name={item.icon} size={24} color={item.isDone ? "#4CAF50" : "#ccc"} />
            <Text style={[styles.todoText, item.isDone && styles.todoTextDone]}>{item.title}</Text>
            {item.isDone && <Ionicons name="checkmark" size={24} color="#4CAF50" />}
          </TouchableOpacity>
        ))}

      </ScrollView>

      <View style={styles.bottomNav}>
        <Ionicons name="home" size={24} color="#4CAF50" />
        <Ionicons name="time-outline" size={24} color="#ccc" />
        <View style={styles.sendMoneyButton}>
          <Ionicons name="paper-plane" size={24} color="white" />
        </View>
        <Ionicons name="card-outline" size={24} color="#ccc" />
        <Ionicons name="menu-outline" size={24} color="#ccc" />
      </View>

      <TouchableOpacity 
        style={{ position: 'absolute', left: 20, top: 20 }}
        onPress={handleSwipeRight}
      >
        <Text>Swipe Right</Text>
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
    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }], // This makes the switch smaller
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
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  viewAllButton: {
    backgroundColor: '#e8f5e9',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  viewAll: {
    color: '#4CAF50',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  serviceItem: {
    width: '22%',
    alignItems: 'center',
    marginBottom: 20,
  },
  serviceIcon: {
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  serviceName: {
    textAlign: 'center',
    fontSize: 12,
  },
  doneCount: {
    color: '#4CAF50',
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  todoItemDone: {
    backgroundColor: '#e8f5e9',
  },
  todoText: {
    marginLeft: 10,
    flex: 1,
  },
  todoTextDone: {
    color: '#4CAF50',
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
});