import { Ionicons } from "@expo/vector-icons"
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useCart } from "../context/CartContext"

const CartScreen = ({ navigation }) => {
  const { cart, loading, removeFromCart, updateQuantity, getTotalPrice } = useCart()

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading cart...</Text>
      </View>
    )
  }

  if (cart.length === 0) {
    return (
      <View style={styles.emptyCartContainer}>
        <Ionicons name="cart-outline" size={80} color="#ccc" />
        <Text style={styles.emptyCartText}>Your cart is empty</Text>
        <TouchableOpacity style={styles.shopNowButton} onPress={() => navigation.navigate("ProductList")}>
          <Text style={styles.shopNowButtonText}>Shop Now</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />

      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            <Ionicons name="remove" size={20} color={item.quantity <= 1 ? "#ccc" : "#333"} />
          </TouchableOpacity>

          <Text style={styles.quantityText}>{item.quantity}</Text>

          <TouchableOpacity style={styles.quantityButton} onPress={() => updateQuantity(item.id, item.quantity + 1)}>
            <Ionicons name="add" size={20} color="#333" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.removeButton} onPress={() => removeFromCart(item.id)}>
        <Ionicons name="trash-outline" size={24} color="#ff3b30" />
      </TouchableOpacity>
    </View>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.cartList}
      />

      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Total:</Text>
          <Text style={styles.summaryValue}>${getTotalPrice().toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  cartList: {
    padding: 16,
  },
  cartItem: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  itemImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
    justifyContent: "space-between",
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "500",
    marginHorizontal: 12,
  },
  removeButton: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  summaryContainer: {
    backgroundColor: "white",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  summaryLabel: {
    fontSize: 16,
    color: "#666",
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: "bold",
  },
  checkoutButton: {
    backgroundColor: "#0066cc",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyCartText: {
    fontSize: 18,
    color: "#666",
    marginTop: 16,
    marginBottom: 24,
  },
  shopNowButton: {
    backgroundColor: "#0066cc",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  shopNowButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
})

export default CartScreen
