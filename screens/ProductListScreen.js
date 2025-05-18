"use client"

import { Ionicons } from "@expo/vector-icons"
import { useEffect, useState } from "react"
import {
    ActivityIndicator,
    Dimensions,
    FlatList,
    Image,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native"

const { width } = Dimensions.get("window")
const numColumns = 2
const tileSize = width / numColumns

const ProductListScreen = ({ navigation }) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [refreshing, setRefreshing] = useState(false)

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await fetch("https://fakestoreapi.com/products")
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const data = await response.json()
      setProducts(data)
      setError(null)
    } catch (err) {
      setError("Failed to fetch products. Please try again later.")
      console.error(err)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const onRefresh = () => {
    setRefreshing(true)
    fetchProducts()
  }

  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating)
    const halfStar = rating - fullStars >= 0.5
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0)

    return (
      <View style={styles.ratingContainer}>
        {[...Array(fullStars)].map((_, i) => (
          <Ionicons key={`full-${i}`} name="star" size={16} color="#FFD700" />
        ))}
        {halfStar && <Ionicons key="half" name="star-half" size={16} color="#FFD700" />}
        {[...Array(emptyStars)].map((_, i) => (
          <Ionicons key={`empty-${i}`} name="star-outline" size={16} color="#FFD700" />
        ))}
        <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
      </View>
    )
  }

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productTile}
      onPress={() => navigation.navigate("ProductDetail", { productId: item.id, title: item.title })}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
        {renderRatingStars(item.rating.rate)}
      </View>
    </TouchableOpacity>
  )

  if (loading && !refreshing) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchProducts}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <FlatList
      data={products}
      renderItem={renderProductItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={numColumns}
      contentContainerStyle={styles.productList}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    />
  )
}

const styles = StyleSheet.create({
  productList: {
    padding: 8,
    backgroundColor: "#f8f8f8",
  },
  productTile: {
    flex: 1,
    margin: 8,
    backgroundColor: "white",
    borderRadius: 8,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    maxWidth: tileSize - 16,
  },
  productImage: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
    backgroundColor: "white",
    padding: 10,
  },
  productInfo: {
    padding: 12,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
    height: 40,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    color: "#666",
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

export default ProductListScreen
