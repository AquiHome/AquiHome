import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { login } from '../src/api/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleLogin = async () => {
    try {
      const result = await login(email, pass);
      alert('¡Login exitoso!');
      // Aquí podrías guardar el token y navegar a la Home
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.logo}>AquiHome</Text>
        <Text style={styles.title}>Iniciar sesión</Text>
        <TextInput
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          style={styles.input}
          placeholderTextColor="#aaa"
        />
        <TextInput
          placeholder="Contraseña"
          value={pass}
          onChangeText={setPass}
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerButton} onPress={() => router.push('/register')}>
          <Text style={styles.registerButtonText}>
            ¿No tienes cuenta? <Text style={{ fontWeight: 'bold', color: '#ff385c' }}>Regístrate</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
    alignItems: 'center',
  },
  logo: {
    fontSize: 36,
    color: '#ff385c',
    fontWeight: 'bold',
    marginBottom: 16,
    letterSpacing: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#222',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 18,
    backgroundColor: '#f7f7f7',
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#ff385c',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
    letterSpacing: 1,
  },
  registerButton: {
    paddingVertical: 8,
  },
  registerButtonText: {
    color: '#222',
    fontSize: 15,
    textAlign: 'center',
  },
});
