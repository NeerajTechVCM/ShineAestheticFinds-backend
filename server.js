const express = require('express');
const mongoose = require('mongoose');

const app = express();
const AuthRouter = require('./controller/user-controller');
const ProductRouter = require('./controller/product-controller');

const authMiddleware = require('./middleware/authentication');
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



mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
