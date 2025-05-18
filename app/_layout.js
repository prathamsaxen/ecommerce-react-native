import { Stack } from 'expo-router';
// import { CartProvider } from '../context/CartContext';
import { CartProvider } from './context/CartContext';

export default function Layout() {
  return (
    <CartProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#f8f8f8' },
          animation: 'slide_from_right',
        }}
      />
    </CartProvider>
  );
}