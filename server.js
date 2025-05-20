const express = require('express');
const mongoose = require('mongoose');

const app = express();
const AuthRouter = require('./controller/user-controller');
const ProductRouter = require('./controller/product-controller');

const cookieParser = require('cookie-parser');
const cors = require('cors');

  require('dotenv').config();
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
      origin: "https://shineaestheticfinds.netlify.app",
    
      credentials: true,
    })
  );
app.post('/register',AuthRouter.register)
app.post('/login',AuthRouter.login)
app.post('/uploadProduct',ProductRouter.uploadProduct)
app.get('/getAllProducts',ProductRouter.getAllProducts)
app.post('/logout',AuthRouter.logoutUser)
app.delete("/deleteProduct/:id", ProductRouter.deleteProduct);
app.put("/editProduct/:id", ProductRouter.editProduct);
const jwt = require('jsonwebtoken');


// Add this route after your middleware setup and before starting the server
app.get('/me', (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token,"CLIENT_SECRET_KEY");
    res.json({ user: { id: decoded.id, email: decoded.email, name: decoded.name } });
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
});


mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
