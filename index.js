import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import { Book } from "./models/bookModels.js";
import bookRoutes from './routes/bookRoutes.js'
import mongoose, { get } from "mongoose";
import cors from "cors"
const app = express();
app.use(express.json());
// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors()) 
// 

// Option 2: Allow Custom Origins
// app.use(
//     cors({
//         origin:'http://localhost:3000',
//         methods:['GET','POST','PUT','DELETE'],
//         allowedHeaders:[Content-Type]
//     })
// )
app.get("/", (request, response) => {
    console.log(request);
    return response.status(200).send("Welcome To Books Store");
  });


app.use('/books',bookRoutes)


mongoose
  .connect(mongoDBURL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App is listening to:${PORT}`);
    });
    console.log("App is conceted to database");
  })
  .catch((error) => {
    console.log(error);
  });
