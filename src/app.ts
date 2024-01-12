import express, { Express } from "express";
import dotenv from "dotenv";
import connectDB from "./configs/database";
import companyRouter from "./routes/company.route";

dotenv.config();
const PORT: number = Number(process.env.PORT) || 3001;
connectDB(<string>process.env.MONGO_URI);

const app: Express = express();

app.use(express.json());
app.use("/company", companyRouter);

app.listen(PORT, () => {
  console.log(`I am running on ${PORT}`);
});
