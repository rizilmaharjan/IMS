import express, {Express} from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cors from "cors"
dotenv.config();

import { env } from "./config";
import userRoutes from "./User";
import productRoutes from "./products";
import { ErrorHandler } from "./User/middlewares/ErrorHandlers";


const app: Express = express();
const port = process.env.PORT;


// middlewares
app.use(cors())
app.use(bodyParser.json());


app.use("/user", userRoutes())
app.use("/product", productRoutes())

app.use(ErrorHandler)



app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${env.PORT}`)
})