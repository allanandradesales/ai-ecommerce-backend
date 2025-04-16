import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Importar rotas (exemplo)
import productRouter from "./routers/productRouter.js";

// Carregar variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

// Middlewares
app.use(express.json());
app.use(cors());


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected!"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Usar rotas do produto (exemplo real de uso de router)
app.use("/api/product", productRouter);

// Rotas de exemplo para user (você pode mover isso para um `userRouter` futuramente)
app.get("/api/user", (req, res) => res.send("Hello World!"));
app.get("/api/user/:id", (req, res) => res.send("Hello World!"));
app.post("/api/user", (req, res) => res.send("Hello World!"));
app.put("/api/user/:id", (req, res) => res.send("Hello World!"));
app.delete("/api/user/:id", (req, res) => res.send("Hello World!"));

// Inicializar o servidor
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://${HOST}:${PORT}`);
});
