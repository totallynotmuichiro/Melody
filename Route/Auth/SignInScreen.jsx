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
import { getAuth, signInWithEmailAndPassword } from '@react-native-firebase/auth';

const SignInScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    
    setLoading(true);
    try {
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password);
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
        <Text style={styles.headerText}>Welcome Back</Text>
        <Text style={styles.subHeaderText}>Sign in to continue your musical journey</Text>
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

        <TouchableOpacity 
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSignIn}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Signing In...' : 'Sign In'}
          </Text>
        </TouchableOpacity>
        
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signupLink}>Create Account</Text>
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
    paddingBottom: 30,
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 25,
  },
  forgotPasswordText: {
    color: '#56B93B',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#56B93B',
    borderRadius: 25,
    paddingVertical: 15,
    alignItems: 'center',
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
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  signupText: {
    color: '#aaa',
    fontSize: 15,
  },
  signupLink: {
    color: '#56B93B',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default SignInScreen;