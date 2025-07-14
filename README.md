# 🌿 Eco Home Project

Eco Home is a MERN stack-based E-commerce Platform that helps users track their **carbon savings** and see how much **money they’ve saved** by reducing CO₂ emissions. It encourages users to take eco-friendly actions and rewards them with **Impact Points**.
## 🚀 Key Features

### 🔐 Authentication
- User Signup & Login with secure password encryption (`bcryptjs`)
- JWT-based session management
- Success popup with animation on signup:  
  `"You're all set to go!"`  
  Followed by redirection to Login page.

### Home Page
- Contains various products
- Contains Cart and Wishlist features
- Checkout and Payment using Razorpay

### Products
- Video explaining reasons for the product usage
- Carbon Footprint and Sustainability Rate of each product
- Reviews from various users and analysis
- Recommend similar products

### 📊 Dashboard
- Displays **"Total Impact Points Earned"**
- Shows **Money Saved** based on CO₂ saved
  > _Money saved is dynamically calculated from total CO₂ saved_  
  _e.g. ₹10 saved per 1 kg CO₂_
- Displays user information, allows adding Address.
- View Past Orders
- Logout


### 💡 CO₂ Savings Logic
```js
const moneySaved = totalCO2Saved * 10; // ₹10 per kg saved
```
https://github.com/user-attachments/assets/d782a37b-1083-4f29-b9ac-5d8c4c8367b1

## 🛠 Tech Stack

| Layer        | Tech Used                           |
| ------------ | ----------------------------------- |
| Frontend     | React, HTML, CSS, JavaScript        |
| Backend      | Node.js, Express.js                 |
| Database     | MongoDB (via Mongoose)              |
| Auth         | JWT, bcryptjs                       |
| Styling      | Custom CSS (Auth, Dashboard, Popup) |
| HTTP Client  | Axios                               |

---

## 🔧 Project Structure
eco-home-project/
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── server.js
│ └── .env
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── services/
│ │ ├── styles/
│ │ └── App.jsx
│ └── public/
└── README.md


---

## 🧪 Getting Started Locally

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/eco-home-project.git
cd eco-home-project
```
### 2. Backend Setup
```bash
cd backend
npm install
npm run dev
```
### 3.Create .env file inside /backend
```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/eco-home
JWT_SECRET=yourSecretKey
RAZOR_PAY_KEY=******
```
### 4. Frontend Setup
```bash 
cd frontend
npm install
npm run dev
```

#### 📌 Future Enhancements

Admin dashboard to manage users and stats
Integration with Google OAuth
CO₂ calculation tools based on daily usage
Eco-tips & leaderboard

#### 🙌 Acknowledgements

Designed and built for environmental awareness
Inspired by India’s climate action goals


