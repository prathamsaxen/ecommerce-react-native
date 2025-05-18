import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ProductCard = ({ product }) => {
  const router = useRouter();

  const navigateToProduct = () => {
    router.push(`/product/${product.id}`);
  };

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={navigateToProduct}
      activeOpacity={0.7}
    >
      <Image 
        source={{ uri: product.image }} 
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.content}>
        <Text numberOfLines={2} style={styles.title}>
          {product.title}
        </Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <View style={styles.ratingContainer}>
          <AntDesign name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{product.rating.rate} ({product.rating.count})</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flex: 1,
    margin: 8,
  },
  image: {
    height: 150,
    width: '100%',
    backgroundColor: '#f9f9f9',
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
    height: 40,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e2e2e',
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    fontSize: 12,
    color: '#666',
  },
});

export default ProductCard;