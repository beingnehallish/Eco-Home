// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext1';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';
import { getOrders } from '../services/orderService';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import { getUserById } from '../services/userService';
import axios from 'axios';

const customIcon = new L.Icon({
  iconUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function LocationSelector({ lat, lng, onLocationChange }) {
  useMapEvents({
    click(e) {
      onLocationChange(e.latlng);
    },
  });

  return (
    <Marker
      position={[lat, lng]}
      icon={customIcon}
      draggable={true}
      eventHandlers={{
        dragend: (e) => {
          const newPos = e.target.getLatLng();
          onLocationChange(newPos);
        },
      }}
    />
  );
}

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState('');
  const [orders, setOrders] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [geoLocation, setGeoLocation] = useState({ lat: 0, lng: 0 });
const [impact, setImpact] = useState({ impactPoints: 0, moneySaved: 0 });

  const handleDeleteAddress = (index) => {
    const updated = addresses.filter((_, i) => i !== index);
    setAddresses(updated);
  };

  const handleUseCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setGeoLocation({ lat: latitude, lng: longitude });
        setShowMap(true);
      },
      () => alert('Location access denied')
    );
  };

  const saveGeoAddress = () => {
    const address = `Lat: ${geoLocation.lat}, Lon: ${geoLocation.lng}`;
    setAddresses([...addresses, address]);
    setShowMap(false);
  };

  useEffect(() => {
    if (user && user._id) {
      getOrders(user._id).then((res) => {
        setOrders(res.data);
      });
    }
  }, [user]);
useEffect(() => {
  if (user && user._id) {
    getOrders(user._id).then((res) => {
      setOrders(res.data);
    });

    // 🧠 Load saved addresses from DB
    getUserById(user._id).then((res) => {
      const fetchedUser = res.data;
      setAddresses(fetchedUser.addresses || []);
      setPhone(fetchedUser.phone || '');
    });
  }
}, [user]);

useEffect(() => {
  const fetchImpact = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/users/${user._id}/impact`);
      setImpact(res.data);
    } catch (err) {
      console.error('Error fetching impact points', err);
    }
  };
  fetchImpact();
}, []);

const handleAddAddress = async () => {
  if (newAddress.trim()) {
    const updated = [...addresses, newAddress];
    setAddresses(updated);
    setNewAddress('');

    // ✅ Save to DB
    try {
      await axios.put(`http://localhost:5000/api/users/${user._id}`, {
        addresses: updated,
        phone,
      });
    } catch (error) {
      console.error("Failed to update addresses in DB:", error);
    }
  }
};

  return (
    <div className="dashboard-container">
      <h2>Welcome, {user?.name || 'User'}</h2>
      <div className="impact-points-container">
  <h3>Total Impact Points Earned</h3>
  <p className="money-saved">₹{impact.moneySaved.toFixed(2)}</p>
</div>


      <section className="profile-section">
        <h3>📇 Profile Info</h3>
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p>
          <strong>Phone:</strong>{' '}
          <input
            type="text"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </p>
      </section>

      <section className="address-section">
        <h3>📍 My Addresses</h3>
        <ul>
          {addresses.map((addr, index) => (
            <li key={index}>
              {addr}
              <button onClick={() => handleDeleteAddress(index)}>🗑️</button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          value={newAddress}
          placeholder="Enter new address"
          onChange={(e) => setNewAddress(e.target.value)}
        />
        <button onClick={handleAddAddress}>Add</button>
        <button onClick={handleUseCurrentLocation}>Use Current Location</button>
      </section>

      {showMap && (
        <div style={{ height: '400px', margin: '20px 0' }}>
          <MapContainer center={[geoLocation.lat, geoLocation.lng]} zoom={13} style={{ height: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationSelector lat={geoLocation.lat} lng={geoLocation.lng} onLocationChange={setGeoLocation} />
          </MapContainer>
          <button onClick={saveGeoAddress}>Save Location</button>
        </div>
      )}

      <section className="orders-section">
        <h3>📦 My Orders</h3>
        {orders.length === 0 ? (
          <p>No past orders yet.</p>
        ) : (
          <ul>
            {orders.map((order, idx) => (
              <li key={idx}>
                <h4>🧾 Order {idx + 1}</h4>
                <p><strong>Total:</strong> ₹{order.totalAmount}</p>
                <p><strong>Carbon Saved:</strong> {order.carbonSaved / 100} kg</p>
                <div className="order-products">
                  {order.products.map((productObj, i) => {
                    const product = productObj.productId;
                    return (
                      <div key={i} className="product-summary">
                        <img className="image-dash" src={product.image} alt={product.name} />
                        <div>
                          <p><strong>{product.name}</strong></p>
                          <p>Qty: {productObj.quantity}</p>
                          <p>₹{product.price} each</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <button
        className="logout-btn"
        onClick={() => {
          logout();
          navigate('/');
        }}
      >
        🚪 Logout
      </button>
    </div>
  );
};

export default Dashboard;
