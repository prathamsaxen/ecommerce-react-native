"use client"

import { Ionicons } from "@expo/vector-icons"
import { useEffect, useState } from "react"
import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useCart } from "../context/CartContext"

const ProductDetailScreen = ({ route, navigation }) => {
  const { productId } = route.params
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true)
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`)
        if (!response.ok) {
          throw new Error("Network response was not ok")
        }
        const data = await response.json()
        setProduct(data)
        setError(null)
      } catch (err) {
        setError("Failed to fetch product details. Please try again later.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProductDetails()
  }, [productId])

  const handleAddToCart = () => {
    addToCart(product)
    Alert.alert("Added to Cart", `${product.title} has been added to your cart.`, [{ text: "OK" }])
  }

  const renderRatingStars = (rating, count) => {
    const fullStars = Math.floor(rating)
    const halfStar = rating - fullStars >= 0.5
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0)

    return (
      <View style={styles.ratingContainer}>
        {[...Array(fullStars)].map((_, i) => (
          <Ionicons key={`full-${i}`} name="star" size={18} color="#FFD700" />
        ))}
        {halfStar && <Ionicons key="half" name="star-half" size={18} color="#FFD700" />}
        {[...Array(emptyStars)].map((_, i) => (
          <Ionicons key={`empty-${i}`} name="star-outline" size={18} color="#FFD700" />
        ))}
        <Text style={styles.ratingText}>
          {rating.toFixed(1)} ({count} reviews)
        </Text>
      </View>
    )
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading product details...</Text>
      </View>
    )
  }

  if (error || !product) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error || "Product not found"}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => navigation.goBack()}>
          <Text style={styles.retryButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.productImage} />

      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{product.title}</Text>
        <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>

        {renderRatingStars(product.rating.rate, product.rating.count)}

        <View style={styles.categoryContainer}>
          <Text style={styles.categoryLabel}>Category: </Text>
          <Text style={styles.categoryValue}>{product.category}</Text>
        </View>

        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.productDescription}>{product.description}</Text>

        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <Ionicons name="cart" size={20} color="white" />
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  productImage: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
    backgroundColor: "white",
  },
  productInfo: {
    padding: 16,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  productPrice: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0066cc",
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  ratingText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#666",
  },
  categoryContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  categoryLabel: {
    fontSize: 14,
    color: "#666",
  },
  categoryValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
    textTransform: "capitalize",
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  productDescription: {
    fontSize: 14,
    lineHeight: 22,
    color: "#555",
    marginBottom: 24,
  },
  addToCartButton: {
    backgroundColor: "#0066cc",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  addToCartButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
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
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "#0066cc",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
})

export default ProductDetailScreen
