import { AntDesign } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Header from '../components/Header';
import { useCart } from '../context/CartContext';
import { useProducts } from '../hooks/useProducts';

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const { product, loading, error } = useProducts(id);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    
    return (
      <View style={styles.starsContainer}>
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return <AntDesign key={i} name="star" size={18} color="#FFD700" />;
          } else if (i === fullStars && halfStar) {
            return <AntDesign key={i} name="staro" size={18} color="#FFD700" />;
          } else {
            return <AntDesign key={i} name="staro" size={18} color="#CCC" />;
          }
        })}
      </View>
    );
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.container}>
        <Header title="Product Details" showBack={true} />
        
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF6347" />
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Error loading product: {error}</Text>
          </View>
        ) : product ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.imageContainer}>
              <Image 
                source={{ uri: product.image }} 
                style={styles.image}
                resizeMode="contain"
              />
            </View>
            
            <View style={styles.contentContainer}>
              <Text style={styles.title}>{product.title}</Text>
              
              <View style={styles.priceRatingRow}>
                <Text style={styles.price}>${product.price.toFixed(2)}</Text>
                
                <View style={styles.ratingContainer}>
                  {renderRatingStars(product.rating.rate)}
                  <Text style={styles.ratingText}>
                    {product.rating.rate} ({product.rating.count})
                  </Text>
                </View>
              </View>
              
              <View style={styles.categoryContainer}>
                <Text style={styles.categoryLabel}>Category:</Text>
                <Text style={styles.category}>{product.category}</Text>
              </View>
              
              <View style={styles.divider} />
              
              <Text style={styles.descriptionTitle}>Description</Text>
              <Text style={styles.description}>{product.description}</Text>
            </View>
          </ScrollView>
        ) : (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Product not found</Text>
          </View>
        )}
        
        {product && (
          <View style={styles.footer}>
            <TouchableOpacity 
              style={styles.addToCartButton}
              onPress={handleAddToCart}
              activeOpacity={0.8}
            >
              <AntDesign name="shoppingcart" size={20} color="white" />
              <Text style={styles.addToCartText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#FF6347',
    fontSize: 16,
    textAlign: 'center',
  },
  imageContainer: {
    height: 300,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    paddingTop: 24,
    minHeight: 400,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  priceRatingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF6347',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 6,
  },
  category: {
    fontSize: 14,
    color: '#2e2e2e',
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 16,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: '#444',
  },
  footer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  addToCartButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 14,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});