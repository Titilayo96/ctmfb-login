
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as LocalAuthentication from 'expo-local-authentication';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';

const SignInError = ({ route }) => {
  const navigation = useNavigation();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [modalState, setModalState] = useState('none');

  useEffect(() => {
    if (route.params?.showFaceIdPrompt) {
      handleFaceId();
    }
  }, []);

  const handleFaceId = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate with Face ID',
      });
      if (result.success) {
        setModalState('success');
        setTimeout(() => {
          setModalState('none');
          navigation.navigate('Home');
        }, 2000); //for 2 seconds
      } else {
        setModalState('error');
      }
    } catch (error) {
      console.error('Face ID authentication error:', error);
      Alert.alert('Error', 'Face ID authentication failed. Please try again.');
    }
  };

  const renderModal = () => {
    switch (modalState) {
      case 'error':
        return (
          <BlurView intensity={5} style={StyleSheet.absoluteFill} tint="light">
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Image
                  source={require('./assets/face-id_white.png')}
                  style={styles.faceIdIcon}
                />
                <Text style={styles.faceNotRecognisedText}>Face Not Recognised</Text>
                <View style={styles.modalDivider} />
                <TouchableOpacity style={styles.tryAgainButton} onPress={handleFaceId}>
                  <Text style={styles.tryAgainButtonText}>Try Face ID Again</Text>
                </TouchableOpacity>
                <View style={styles.modalDivider} />
                <TouchableOpacity onPress={() => setModalState('none')} style={styles.cancelFaceIdButton}>
                  <Text style={styles.cancelFaceIdButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </BlurView>
        );
      case 'success':
        return (
          <BlurView intensity={5} style={StyleSheet.absoluteFill} tint="light">
            <View style={styles.modalOverlay}>
              <View style={styles.successModalContent}>
                <View style={styles.successIconContainer}>
                  <Ionicons name="checkmark" size={40} color="#4CAF50" />
                </View>
                <Text style={styles.successModalText}>Face ID</Text>
              </View>
            </View>
          </BlurView>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.cancelButton}>
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
      
      <Image
        source={require('./assets/damilare.png')}
        style={styles.profileImage}
      />

      <Text style={styles.greeting}>Damilare,</Text>
      <Text style={styles.subtitle}>Kindly enter your login details.</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Your Password</Text>
        <View style={styles.passwordInputWrapper}>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="***********"
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={22} color="#444444" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.biometricText}>Enable biometric Login</Text>
      <Text style={styles.forgotPassword}>Forgot Password?</Text>

      <TouchableOpacity onPress={handleFaceId}>
        <Ionicons name="finger-print-outline" size={40} color="#208220" style={styles.fingerprint} />
      </TouchableOpacity>

      <Text style={styles.version}>v1.1.1</Text>

      {renderModal()}
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
  inputContainer: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 10,
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#101828',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  passwordInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    padding: 13,
    color: '#000000',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#82B382',
    padding: 16,
    borderRadius: 7,
    alignItems: 'center',
    marginTop: 20,
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
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  faceIdIcon: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  faceNotRecognisedText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 20,
  },
  modalDivider: {
    height: 1,
    width: '100%',
    backgroundColor: 'lightgray',
  },
  tryAgainButton: {
    width: '100%',
    paddingVertical: 15,
    alignItems: 'center',
  },
  tryAgainButtonText: {
    color: '#208220',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelFaceIdButton: {
    width: '100%',
    paddingVertical: 15,
    alignItems: 'center',
  },
  cancelFaceIdButtonText: {
    color: '#208220',
    fontSize: 16,
    fontWeight: '600',
  },
  successModalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    padding: 35,
  },
  successIconContainer: {
    backgroundColor: 'hsla(0, 0%, 100%, 0.7)',
    borderWidth: 5,
    borderColor: '#4CAF50',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  successModalText: {
    fontSize: 18,
    color: '#000000',
  },
});

export default SignInError;
