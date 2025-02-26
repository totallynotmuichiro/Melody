import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from '@react-native-firebase/auth';

const SignUpScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Animation values
  const fadeAnim = useState(new Animated.Value(0))[0];
  const moveAnim = useState(new Animated.Value(50))[0];
  
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(moveAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    
    setLoading(true);
    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Account created successfully!');
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.headerContainer, 
          {
            opacity: fadeAnim,
            transform: [{translateY: moveAnim}],
          }
        ]}
      >
        {/* Music animation graphic */}
        <View style={styles.animationContainer}>
          <View style={styles.circle}>
            <Image 
              source={{uri: 'https://cdn-icons-png.flaticon.com/512/7566/7566380.png'}} 
              style={styles.musicIcon}
              resizeMode="contain"
            />
          </View>
        </View>
        <Text style={styles.headerText}>Join the Music</Text>
        <Text style={styles.subHeaderText}>Create an account to start your journey</Text>
      </Animated.View>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#777"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#777"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#777"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        
        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSignUp}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </Text>
        </TouchableOpacity>
        
        <View style={styles.signinContainer}>
          <Text style={styles.signinText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.signinLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  headerContainer: {
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
  },
  subHeaderText: {
    fontSize: 16,
    color: '#aaa',
    marginTop: 10,
  },
  animationContainer: {
    marginBottom: 20,
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(86, 185, 59, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  musicIcon: {
    width: 70,
    height: 70,
    tintColor: '#56B93B',
  },
  formContainer: {
    paddingHorizontal: 30,
  },
  input: {
    backgroundColor: '#1E1E1E',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 15,
    fontSize: 16,
    color: 'white',
    borderColor: '#333',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#56B93B',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: '#2E5E22',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  signinText: {
    color: '#aaa',
    fontSize: 15,
  },
  signinLink: {
    color: '#56B93B',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;