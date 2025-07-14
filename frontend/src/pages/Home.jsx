import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { getAllProducts } from '../services/productService';
import { useShop } from '../context/ShopContext';
import '../styles/Home.css';
import ImageSlider from '../components/ImageSlider';
import Popup from '../components/Popup';
import { Link } from 'react-router-dom';

function Home() {
  const [products, setProducts] = useState([]);
  const [popup, setPopup] = useState(null);
  const { addToCart, addToWishlist } = useShop();

  useEffect(() => {
    getAllProducts().then(setProducts);
  }, []);

  const showPopup = (msg, icon) => {
    setPopup({ message: msg, icon });
  };

  return (
    <div className="home-container">
      <ImageSlider /><br></br><br></br>
      <h2>🌿 Products that you might love! 🌿</h2>
      <div className="product-grid">
        {products.map(product => (
          <Link to={`/product/${product._id}`} key={product._id}>
  <ProductCard
    product={product}
    onAddToCart={(p) => {
      addToCart(p);
      showPopup('Item added to cart!', '✅');
    }}
    onAddToWishlist={(p) => {
      addToWishlist(p);
      showPopup('Item added to wishlist!', '💚');
    }}
  />
</Link>
        ))}
      </div>
      {popup && (
        <Popup message={popup.message} icon={popup.icon} onClose={() => setPopup(null)} />
      )}
    </div>
  );
}

export default Home;
