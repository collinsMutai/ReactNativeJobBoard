import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, StatusBar, SafeAreaView, Alert } from 'react-native';

export default function App() {
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');

  const onSearch = () => {
    console.log({ search, location, category });
    Alert.alert('Search submitted!');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f4f4f4" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Job Search</Text>

        <View style={styles.formItem}>
          <Text style={styles.label}>Search Job Now:</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Software Developer"
            value={search}
            onChangeText={setSearch}
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.formItem}>
          <Text style={styles.label}>Job Location:</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. New York"
            value={location}
            onChangeText={setLocation}
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.formItem}>
          <Text style={styles.label}>Job Category:</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Engineering"
            value={category}
            onChangeText={setCategory}
            placeholderTextColor="#999"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={onSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  container: {
    padding: 24,
    flexGrow: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#000',
  },
  formItem: {
    marginBottom: 16,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  label: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 8,
    color: '#000',
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#c6a02d',
    paddingVertical: 14,
    borderRadius: 4,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
