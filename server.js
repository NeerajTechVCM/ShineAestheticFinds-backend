const express = require('express');
const mongoose = require('mongoose');

const app = express();
const AuthRouter = require('./controller/user-controller');
const ProductRouter = require('./controller/product-controller');

const authMiddleware = require('./middleware/authentication');
const cookieParser = require('cookie-parser');
const cors = require('cors');


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



mongoose.connect("mongodb+srv://np6848586:neeraj@cluster0.svfytdr.mongodb.net/")
.then(()=>console.log("Mongodb Connected"))
.catch((error)=>console.log(error))

app.listen(8080,()=>{
    console.log("server listening to port 8080");
})