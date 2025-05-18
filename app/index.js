import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import { useProducts } from './hooks/useProducts';

export default function Home() {
  const { products, loading, error } = useProducts();

  const renderItem = ({ item }) => (
    <ProductCard product={item} />
  );

  return (
    <>
      <StatusBar style="auto" />
      <Stack.Screen 
        options={{ 
          headerShown: false 
        }} 
      />
      
      <View style={styles.container}>
        <Header title="Shop" showBack={false} />

        {loading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#FF6347" />
          </View>
        ) : error ? (
          <View style={styles.centerContainer}>
            <Text style={styles.errorText}>
              Oops! Something went wrong. {error}
            </Text>
          </View>
        ) : (
          <FlatList
            data={products}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={styles.productList}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontSize: 16,
    color: '#FF6347',
    textAlign: 'center',
  },
  productList: {
    padding: 8,
  },
});