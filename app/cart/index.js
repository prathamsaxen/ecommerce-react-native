import { AntDesign } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import CartItem from '../components/CartItem';
import CartItem from '../components/CartItem';
import Header from '../components/Header';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const router = useRouter();
  const { cart, getCartTotal } = useCart();
  const cartTotal = getCartTotal();

  const navigateToCheckout = () => {
    // This would typically navigate to a checkout page
    // For this simple app, we'll just show an alert
    alert('Checkout functionality would go here!');
  };

  const renderEmptyCart = () => (
    <View style={styles.emptyCartContainer}>
      <Image 
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2038/2038854.png' }} 
        style={styles.emptyCartImage}
        resizeMode="contain"
      />
      <Text style={styles.emptyCartTitle}>Your cart is empty</Text>
      <Text style={styles.emptyCartMessage}>
        Looks like you haven't added any products to your cart yet.
      </Text>
      <TouchableOpacity 
        style={styles.continueShoppingButton}
        onPress={() => router.push('/')}
      >
        <Text style={styles.continueShoppingText}>Continue Shopping</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.container}>
        <Header title="Shopping Cart" showBack={true} showCart={false} />
        
        {cart.length === 0 ? (
          renderEmptyCart()
        ) : (
          <>
            <FlatList
              data={cart}
              renderItem={({ item }) => <CartItem item={item} />}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={styles.cartList}
              showsVerticalScrollIndicator={false}
            />
            
            <View style={styles.summaryContainer}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>${cartTotal.toFixed(2)}</Text>
              </View>
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Shipping</Text>
                <Text style={styles.summaryValue}>Free</Text>
              </View>
              
              <View style={styles.divider} />
              
              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>${cartTotal.toFixed(2)}</Text>
              </View>
              
              <TouchableOpacity 
                style={styles.checkoutButton}
                onPress={navigateToCheckout}
                activeOpacity={0.8}
              >
                <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
                <AntDesign name="arrowright" size={20} color="white" />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.continueShoppingLink}
                onPress={() => router.push('/')}
              >
                <Text style={styles.continueShoppingLinkText}>Continue Shopping</Text>
              </TouchableOpacity>
            </View>
          </>
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
  cartList: {
    padding: 16,
    paddingBottom: 16,
  },
  summaryContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6347',
  },
  checkoutButton: {
    backgroundColor: '#FF6347',
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  continueShoppingLink: {
    padding: 12,
    alignItems: 'center',
  },
  continueShoppingLinkText: {
    color: '#2e2e2e',
    fontSize: 14,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyCartImage: {
    width: 120,
    height: 120,
    marginBottom: 24,
    opacity: 0.6,
  },
  emptyCartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#2e2e2e',
  },
  emptyCartMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  continueShoppingButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  continueShoppingText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});