import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { register } from '../src/api/auth';

export default function Register() {
  const [role, setRole] = useState<'cliente' | 'inmobiliaria'>('cliente');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confirm, setConfirm] = useState('');
  const [cedulaIdentidad, setCedulaIdentidad] = useState('');
  const [RUT, setRUT] = useState('');
  const [nombreEmpresa, setNombreEmpresa] = useState('');

  const handleRegister = async () => {
    if (pass !== confirm) {
      alert('Las contraseñas no coinciden');
      return;
    }

    let payload: any;

    if (role === 'cliente') {
      payload = { role, name, email, password: pass, cedulaIdentidad };
    } else {
      payload = { role, name, email, password: pass, RUT, nombreEmpresa };
    }

    try {
      await register(payload);
      alert('¡Registro exitoso!');
      router.replace('/login');
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
        <Text style={styles.title}>Registro</Text>
        <View style={{ flexDirection: 'row', marginBottom: 16 }}>
          <TouchableOpacity
            style={[
              styles.roleButton,
              role === 'cliente' && styles.roleButtonActive,
            ]}
            onPress={() => setRole('cliente')}
          >
            <Text style={role === 'cliente' ? styles.roleButtonTextActive : styles.roleButtonText}>
              Cliente
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.roleButton,
              role === 'inmobiliaria' && styles.roleButtonActive,
            ]}
            onPress={() => setRole('inmobiliaria')}
          >
            <Text style={role === 'inmobiliaria' ? styles.roleButtonTextActive : styles.roleButtonText}>
              Inmobiliaria
            </Text>
          </TouchableOpacity>
        </View>
        <TextInput
          placeholder="Nombre"
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholderTextColor="#aaa"
        />
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
        <TextInput
          placeholder="Confirmar contraseña"
          value={confirm}
          onChangeText={setConfirm}
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#aaa"
        />
        {role === 'cliente' ? (
          <TextInput
            placeholder="Cédula de Identidad"
            value={cedulaIdentidad}
            onChangeText={setCedulaIdentidad}
            style={styles.input}
            placeholderTextColor="#aaa"
          />
        ) : (
          <>
            <TextInput
              placeholder="RUT"
              value={RUT}
              onChangeText={setRUT}
              style={styles.input}
              placeholderTextColor="#aaa"
            />
            <TextInput
              placeholder="Nombre de la empresa"
              value={nombreEmpresa}
              onChangeText={setNombreEmpresa}
              style={styles.input}
              placeholderTextColor="#aaa"
            />
          </>
        )}
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Registrarse</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace('/login')}>
          <Text style={styles.loginBackText}>
            ¿Ya tienes cuenta? <Text style={{ fontWeight: 'bold', color: '#ff385c' }}>Inicia sesión</Text>
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
  registerButton: {
    width: '100%',
    backgroundColor: '#ff385c',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  registerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
    letterSpacing: 1,
  },
  loginBackText: {
    color: '#222',
    fontSize: 15,
    textAlign: 'center',
  },
  roleButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ff385c',
    borderRadius: 8,
    padding: 10,
    marginRight: 8,
    backgroundColor: '#fff',
  },
  roleButtonActive: {
    backgroundColor: '#ff385c',
  },
  roleButtonText: {
    color: '#ff385c',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  roleButtonTextActive: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
