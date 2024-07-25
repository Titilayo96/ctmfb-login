import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as LocalAuthentication from 'expo-local-authentication';

const LoginError = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { phoneNumber, password: initialPassword } = route.params;

  const [password, setPassword] = useState(initialPassword);
  const [showPassword, setShowPassword] = useState(false);
  const [isIncorrectPassword, setIsIncorrectPassword] = useState(false);

  useEffect(() => {
    // Check password on component mount
    checkPassword(initialPassword);
  }, []);

  const checkPassword = (pwd) => {
    // Add your password requirements here
    const isValid = pwd.length >= 8;
    setIsIncorrectPassword(!isValid);
    return isValid;
  };

  const handleLogin = () => {
    if (checkPassword(password)) {
      // Password meets requirements, proceed with login
      Alert.alert('Success', 'Login successful!');
      navigation.navigate('Home');
    } else {
      // Password still doesn't meet requirements
      setIsIncorrectPassword(true);
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

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
      <Image
        source={require('./assets/damilare.png')}
        style={styles.profileImage}
      />

      <Text style={styles.greeting}>Damilare,</Text>
      <Text style={styles.subtitle}>Kindly enter your login details.</Text>

      <Text style={styles.inputLabel}>Your Password</Text>
      <View style={[styles.inputContainer, isIncorrectPassword && styles.inputContainerError]}>
        <View style={styles.passwordInputWrapper}>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setIsIncorrectPassword(false);
            }}
            placeholder="***********"
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={22} color="#444444" />
          </TouchableOpacity>
        </View>
      </View>
      {isIncorrectPassword && <Text style={styles.errorText}>Incorrect password!</Text>}

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.biometricText}>Enable biometric Login</Text>
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
    marginBottom: 30,
    marginTop: 5,
  },
  cancelButtonText: {
    color: '#489648',
    fontSize: 12,
    fontWeight: '700',
  },
  profileImage: {
    width: 109,
    height: 109,
    borderWidth: 5,
    borderColor: '#ffff',
    borderRadius: 35,
    alignSelf: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 40,
    marginBottom: 20,
    color: '#208220',
  },
  subtitle: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 35,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#101828',
    marginBottom: 5,
    paddingHorizontal: 12,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 10,
    marginBottom: 10,
  },
  inputContainerError: {
    borderColor: '#CC0000',
  },
  passwordInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    padding: 13,
    color: '#101828',
    fontSize: 14,
  },
  errorText: {
    color: '#CC0000',
    marginBottom: 25,
    paddingHorizontal: 12,
  },
  loginButton: {
    backgroundColor: '#82B382',
    padding: 16,
    borderRadius: 7,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  biometricText: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#208220',
    fontSize: 14,
  },
  forgotPassword: {
    textAlign: 'center',
    color: 'gray',
    marginBottom: 20,
  },
  fingerprint: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  version: {
    textAlign: 'center',
    color: 'gray',
  },
});

export default LoginError;