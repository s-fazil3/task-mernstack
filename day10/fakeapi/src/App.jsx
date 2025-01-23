import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

const products = [
  { id: 1, name: 'Laptop', image: 'https://m.media-amazon.com/images/I/61Qe0euJJZL.jpg' },
  { id: 2, name: 'Smartphone', image: 'https://www.trustedreviews.com/wp-content/uploads/sites/54/2024/11/Best-smartphone-2024.jpg' },
  { id: 3, name: 'Tablet', image: 'https://www.hollywoodreporter.com/wp-content/uploads/2023/11/Amazon-Fire-Max-11-Tablet-EMBED.jpg?w=1000' },
  { id: 4, name: 'Headphones', image: 'https://static.independent.co.uk/2024/10/30/12/Wireless-headphones.jpg?width=1200&height=900&fit=crop' },
  { id: 5, name: 'Smartwatch', image: 'https://image.coolblue.nl/transparent/max/480xauto/content/9ae240ae1cdf22f7cde7755985fbdd59' },
  { id: 6, name: 'Car', image: 'https://www.bmw.in/content/dam/bmw/marketIN/bmw_in/all-models/i-series/i4/2023/1680x756.jpg' },
  { id: 7, name: 'Bike', image: 'https://cloudfront-us-east-1.images.arcpublishing.com/octane/GKKBVKV7DVCXXBDC2EK7VQC67M.jpg' },
  { id: 8, name: 'Bicycle', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY9YWJMhUJmquJuYjIh_-63hdNIJ-VZO1jwg&s' },
  { id: 9, name: 'Toys', image: 'https://www.investopedia.com/thmb/Zhx9YF_jgQGOAB6UH0G-Ldo3Tyo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-465830317-72a07789a32346fea9e7a03b136d0060-f0f6c5eb79a8488594a827a5dbc4d404-ee5cf1a13bf5410caf16dbe25a019d7f.jpg' },
  { id: 10, name: 'Shoes', image: 'https://www.health.com/thmb/v2AJTIOKuEByYQhB7LvNTv5SUHs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/hlt-tier-3-primary-best-running-shoes-plantar-fasciitis-ahuang-034-e93bbe47a34840b79d438ea67effe34c.jpeg' },
  
];

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);

  // Optimized filtering using useMemo
  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Add to Cart
  const handleAddToCart = (product) => {
    if (!cart.find((item) => item.id === product.id)) {
      setCart([...cart, product]);
    }
  };

  // Remove from Cart
  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  return (
    <Router>
      <div className="app">
        <h1 sy>Product Filter</h1>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <Link to="/cart" className="cart-link">
          Go to Cart ({cart.length})
        </Link>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <p>Products found: {filteredProducts.length}</p>
                <ul className="product-list">
                  {filteredProducts.map((product) => (
                    <li key={product.id} className="product-item">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="product-image"
                      />
                      <span className="product-name">{product.name}</span>
                      <button
                        className="add-button"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            }
          />
          <Route
            path="/cart"
            element={
              <div className="cart-page">
                <h2>Your Cart</h2>
                <Link to="/" className="back-button">
                  Back to Products
                </Link>
                {cart.length > 0 ? (
                  <ul className="cart-list">
                    {cart.map((item) => (
                      <li key={item.id} className="cart-item">
                        <div className="cart-card">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="product-image"
                          />
                          <span className="cart-name">{item.name}</span>
                          <button
                            className="remove-button"
                            onClick={() => handleRemoveFromCart(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Your cart is empty.</p>
                )}
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
