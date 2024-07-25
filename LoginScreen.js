import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as LocalAuthentication from 'expo-local-authentication';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let errors = {};

    if (!phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!/^\+?[0-9]{10,14}$/.test(phoneNumber.replace(/\s/g, ''))) {
      errors.phoneNumber = 'Invalid phone number format';
    }

    if (!password.trim()) {
      errors.password = 'Password is required,it must be at least 8 characters long';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const checkPasswordRequirements = (password) => {
    return password.length >= 8;
  };

  const handleLogin = () => {
    if (validateForm()) {
      if (checkPasswordRequirements(password)) {
        // Password meets requirements, proceed with login
        Alert.alert('Success', 'Login successful!');
        navigation.navigate('Home');
      } else {
        // Password doesn't meet requirements, navigate to SignInError
        navigation.navigate('LoginError', { phoneNumber, password });
      }
    } else {
      Alert.alert('Error', 'Please correct the errors in the form.');
    }
  };

  const handleBiometricAuth = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync();
      if (result.success) {
        // Authentication successful, navigate to Home
        navigation.navigate('Home');
      } else {
        // Authentication failed, navigate to SignInError
        navigation.navigate('SignInError', { showFaceIdPrompt: true });
      }
    } catch (error) {
      console.error('Biometric authentication error:', error);
      Alert.alert('Error', 'Biometric authentication failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.cancelButton}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
      
      <Text style={styles.title}>Login to your account</Text>
      <Text style={styles.subtitle}>We are glad to have you, kindly enter{'\n'}your login details.</Text>
      
      <Text style={styles.inputLabel}>Phone Number*</Text>
      <TextInput
        style={[styles.input, errors.phoneNumber && styles.inputError]}
        placeholder="+234 809 531 6411"
        value={phoneNumber}
        onChangeText={(text) => {
          setPhoneNumber(text);
          setErrors((prev) => ({ ...prev, phoneNumber: null }));
        }}
        keyboardType="phone-pad"
      />
      {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}
      
      <Text style={styles.inputLabel}>Your Password*</Text>
      <View style={[styles.passwordContainer, errors.password && styles.inputError]}>
        <TextInput
          style={styles.passwordInput}
          placeholder="*********"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setErrors((prev) => ({ ...prev, password: null }));
          }}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons name={showPassword ? "eye-off" : "eye"} size={22} color="#444444" />
        </TouchableOpacity>
      </View>
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
      
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      
      <Text style={styles.signupText}>Don't have an account? <Text style={styles.signupLink}>Sign up</Text></Text>
      <Text style={styles.forgotPassword}>Forgot Password?</Text>
      
      <TouchableOpacity onPress={handleBiometricAuth}>
        <Ionicons name="finger-print" size={40} color="#208220" style={styles.fingerprint} />
      </TouchableOpacity>

      <Text style={styles.version}>v1.1.1</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  cancelButton: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#489648',
    borderRadius: 7,
    paddingHorizontal: 24,
    paddingVertical: 10,
    marginBottom: 10,
    marginTop: 30,
  },
  cancelButtonText: {
    color: '#489648',
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 40,
    marginBottom: 25,
    color: '#208220',
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20.3,
    color: '#666666',
    marginBottom: 30,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#101828',
    marginBottom: 5,
    paddingHorizontal: 10,      
  },
  input: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingTop: 12, 
    paddingBottom: 12,
    marginBottom: 25,
    color: '#667085',
    fontSize: 14,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 7,
    marginBottom: 28,
  },
  passwordInput: {
    flex: 0.97,
    padding: 15,
    paddingHorizontal: 15,
    paddingVertical: 12,
    color: '#667085',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#208220',
    padding: 16,
    borderRadius: 7,
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 30,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  signupText: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#208220',
    fontSize: 14,
  },
  signupLink: {
    color: '#208220',
  },
  forgotPassword: {
    textAlign: 'center',
    color: '#666666',
    fontSize: 14,
  },
  fingerprint: {
    alignSelf: 'center',
    marginTop: 20,
  },
  version: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    marginTop: 70,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -20,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default LoginScreen;
