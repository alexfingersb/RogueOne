import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet, Button } from 'react-native';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <SafeAreaView>
      <View style={styles.form}>
        <Text style={styles.defaultText}>Welcome to Rogue One</Text>
        <TextInput
          style={styles.input}
          placeholder='Enter you e-mail'
          value={email}
          onChangeText={(inputValue) => setEmail(inputValue)}
        />
        <TextInput
          style={styles.input}
          placeholder='Enter password'
          value={password}
          onChangeText={(inputValue) => setPassword(inputValue)}
        />
        <Button
          title="Login"
          color="#C2185B"
          onPress={console.log('Login')}
        />

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  form: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: "60%",
    margin: 20,
    padding: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 200
  },
  input: {
    borderColor: "cyan",
    borderWidth: 1,
    width: "100%",
    height: 40,
    margin: 10,
    fontSize: 18,
    paddingLeft: 5,
  },
  defaultText: {
    fontSize: 18,
  }
});

export default App;
