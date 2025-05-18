import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const increaseQuantity = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const decreaseQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: item.image }} 
        style={styles.image}
        resizeMode="contain"
      />
      
      <View style={styles.details}>
        <Text numberOfLines={2} style={styles.title}>
          {item.title}
        </Text>
        <Text style={styles.price}>${(item.price * item.quantity).toFixed(2)}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.unitPrice}>(${item.price.toFixed(2)} each)</Text>
        </View>
      </View>
      
      <View style={styles.quantityContainer}>
        <TouchableOpacity 
          onPress={decreaseQuantity} 
          style={styles.quantityButton}
        >
          <AntDesign name="minuscircleo" size={24} color="#FF6347" />
        </TouchableOpacity>
        
        <Text style={styles.quantity}>{item.quantity}</Text>
        
        <TouchableOpacity 
          onPress={increaseQuantity}
          style={styles.quantityButton}
        >
          <AntDesign name="pluscircleo" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        onPress={() => removeFromCart(item.id)}
        style={styles.removeButton}
      >
        <AntDesign name="delete" size={22} color="#FF6347" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#f9f9f9',
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e2e2e',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unitPrice: {
    fontSize: 12,
    color: '#666',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  quantityButton: {
    padding: 4,
  },
  quantity: {
    fontSize: 16,
    fontWeight: '500',
    marginHorizontal: 8,
    minWidth: 24,
    textAlign: 'center',
  },
  removeButton: {
    marginLeft: 8,
    padding: 4,
    alignSelf: 'center',
  },
});

export default CartItem;