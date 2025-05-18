import { useEffect, useState } from 'react';

export const useProducts = (productId = null) => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // If productId is provided, fetch a single product
        if (productId) {
          const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch product');
          }
          const data = await response.json();
          setProduct(data);
        } else {
          // Otherwise fetch all products
          const response = await fetch('https://fakestoreapi.com/products');
          if (!response.ok) {
            throw new Error('Failed to fetch products');
          }
          const data = await response.json();
          setProducts(data);
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  return { products, product, loading, error };
};