import React,{useEffect, useState} from "react"
import { SafeAreaView, StyleSheet, View , Platform, Text, TextInput, KeyboardAvoidingView, TouchableOpacity, Image } from "react-native"
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import logo from "../assets/images/BEN.png"
import { API_ADDRESS } from "../api/api";

export default function LoginScreen({ navigation }){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm();
  }, [email, password]);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validateForm = () => {
    const isValid = email && password && validateEmail(email) && password.length >= 6;
    setIsFormValid(isValid);
  };


  const handleSubmit = async () => {

    setErrorMessage('');
    if (!isFormValid) {
      setErrorMessage('Please enter valid email and password.');
      return;
    }

    try {
      const response = await fetch(`${API_ADDRESS}v1/public/linguere/auth/editeur/seconnecter`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);

      if (!data) {
        console.error('Empty response received');
        return;
      }

      if (response.ok) {
       
        navigation.navigate('CompanyList', { userId: data.user.id, token: data.token });
      } else {
        setErrorMessage(data.message || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('An error occurred. Please try again.');
    }
  }
  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: 'plum' }}>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={100}
      style={styles.container}>
        <View style={styles.header}>
          <Image 
          alt="App Logo"
          resizeMode="contain"
          style={styles.headerImg}
          source={logo}/>
          <Text style={styles.title}>
            Login <Text style={{ color: "#2196F3"}}>App</Text>
          </Text>
        </View>

        <View style={styles.form}>

          <View style={styles.input}>
            <Text style={styles.label}>Email address</Text>
            <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="while-editing"
            keyboardType="email-address"
            placeholder="johndoe@example.com"
            placeholderTextColor="#6b7280"
            style={styles.TextInput}
            value={email}
            onChangeText={setEmail}
            />     
          </View>
          <View style={styles.input}>
            <Text style={styles.label}>Password</Text>
            <TextInput
            autoCapitalize="none"
            clearButtonMode="while-editing"
            placeholder="********"
            placeholderTextColor="#6b7280"
            style={styles.TextInput}
            secureTextEntry
            value={password}
            onChangeText={setPassword}

            />     
          </View>
          {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
          <View style={styles.formAction}>
              <TouchableOpacity
                style={[styles.button, { opacity: isFormValid ? 1 : 0.5 }]} 
                disabled={!isFormValid}
                onPress={handleSubmit}>
                <View style={styles.btn}>
                  <Text style={styles.btnText}>Sign in</Text>
                </View>
              </TouchableOpacity>
            </View>
            <Text style={styles.formLink}>Forgot password?</Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            // handle link
          }}
          style={{ marginTop: 'auto' }}>
          <Text style={styles.formFooter}>
            Don't have an account?{' '}
            <Text style={{ textDecorationLine: 'underline' }}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}



// Styles for the components 

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    // flexWrap: "wrap"
  },
  title: {  
    fontSize: 31,
    fontWeight: "700",
    color: '#1D2A32',
    marginBottom: 6,
  // paddingTop: Platform.OS === 'android' ? 25 : 0
},
header: {
  alignItems: 'center',
  justifyContent: 'center',
  marginVertical: 36,
},
headerImg: {
  width: 120,
  height: 120,
  alignSelf: 'center',
  marginBottom: 10,
},
form: {
  marginBottom: 20,
  paddingHorizontal: 24,
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: 0,
},
formAction: {
  marginTop: 4,
  marginBottom: 16,
},
formLink: {
  fontSize: 16,
  fontWeight: "600",
  color: '#2196F3',
  textAlign: "center"
},
formFooter: {
  fontSize: 15,
  fontWeight: "600",
  color: '#222',
  textAlign: "center",
  letterSpacing: 0.15,
},
input: {
  marginBottom: 16
},
label: {
  fontSize: 17,
  fontWeight: "600",
  color: '#222',
  marginBottom: 8,
},
TextInput:{
  height: 50,
  backgroundColor: "#fff",
  paddingHorizontal: 16,
  borderRadius: 12,
  fontSize: 15,
  fontWeight: "500",
  color: '#222',
  borderWidth: 1,
  borderColor: '#C9D3DB',
  borderStyle: 'solid',
},
btn: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 50,
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderWidth: 1,
  backgroundColor: '#2196F3',
  borderColor: '#2196F3',
},
btnText: {
  fontSize: 18,
  lineHeight: 26,
  fontWeight: "600",
  color: "white"
}
})