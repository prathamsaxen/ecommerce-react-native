import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useCart } from '../context/CartContext';

const Header = ({ title, showBack = false, showCart = true }) => {
  const router = useRouter();
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <View style={styles.container}>
      {showBack && (
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={styles.backButton}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      )}
      
      <Text style={styles.title}>{title}</Text>
      
      {showCart && (
        <TouchableOpacity 
          onPress={() => router.push('/cart')} 
          style={styles.cartButton}
        >
          <AntDesign name="shoppingcart" size={24} color="black" />
          {cartCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {cartCount > 99 ? '99+' : cartCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  backButton: {
    padding: 4,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cartButton: {
    padding: 4,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    right: -4,
    top: -4,
    backgroundColor: '#FF6347',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    paddingHorizontal: 4,
  },
});

export default Header;