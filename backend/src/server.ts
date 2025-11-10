import express from "express";
import dotenv from "dotenv";
import { sequelize } from "./config/db";
import authRouter from "./routes/authRoutes";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/auth", authRouter);

app.get("/protegido", (req, res) => {
  res.json({ message: "Rota pública" });
});

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Banco conectado com sucesso!");
    app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`));
  } catch (error) {
    console.error("Erro ao conectar ao banco:", error);
  }
})();
