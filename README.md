

# Ecommerce Frontend Assignment

This project is a mobile-friendly ecommerce frontend built with **React Native** and **Expo** as part of a frontend development assignment.

## 📄 Assignment Context

This repository contains the solution to the assignment provided by Saniya Mehrotra (HR) on 17 May 2025.  
**Task Document:** [Assignment Link](https://docs.google.com/document/d/1LIOgYHzzo63lHwIyucmz8C57PxtJmyocPIGD2ul_Q4A/edit?usp=sharing)

---

## ✨ Features

- **Product Listing:**  
  Browse a grid of products fetched live from [Fake Store API](https://fakestoreapi.com/).
- **Product Details:**  
  View detailed information, images, price, category, and ratings for each product.
- **Add to Cart:**  
  Add products to a persistent shopping cart (using AsyncStorage).
- **Cart Management:**  
  View, update quantity, or remove items from the cart. See subtotal and total.
- **Responsive UI:**  
  Clean, modern, and mobile-friendly design using React Native components and Expo.
- **Error Handling:**  
  Graceful handling of loading states and network errors.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npm install -g expo-cli`)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/prathamsaxen/ecommerce-react-native.git
   cd ecommerce
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npx expo start
   ```

4. **Run on your device:**
   - Use the Expo Go app (Android/iOS) to scan the QR code.
   - Or run on an emulator/simulator.

---

## 🗂️ Project Structure

- `app/` — Main app screens, navigation, and context providers
- `screens/` — Additional screen components (if present)
- `app/components/` — Reusable UI components (ProductCard, CartItem, Header, etc.)
- `app/context/CartContext.js` — Cart state management (with persistence)
- `app/hooks/useProducts.js` — Product fetching logic

---

## 🛒 Usage

- **Browse Products:**  
  Home screen displays all products.
- **View Details:**  
  Tap a product to see its details.
- **Add to Cart:**  
  Use the "Add to Cart" button on the product detail page.
- **Manage Cart:**  
  Access the cart, update quantities, or remove items.

---

## 📝 Notes

- All product data is fetched from [Fake Store API](https://fakestoreapi.com/).
- Cart state is persisted locally using AsyncStorage.
- The app is built for demonstration and assignment purposes.

---

## 📦 Submission

- **GitHub Repository:**  
  https://github.com/prathamsaxen/ecommerce-react-native.git
- **Live Demo / APK:**  
  [Add your Expo live link or APK file link here]

---

## 👤 Author

- **Name:** Pratham Saxena
- **Email:** er.prathamsaxena@gmail.com

---

## 📃 License

This project is for assignment and demonstration purposes only.

---

Would you like me to update your `README.md` with this content? If you want to add your name, email, or repository/demo links, let me know!
