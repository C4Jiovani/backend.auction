import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import AuthRouteAdminRoute from "./routes/admin/AuthRouteAdmin.js";
import AuthRouteUser from "./routes/client/AuthRouteUser.js";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import http from "http";
import multer from 'multer';
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// const path = require('path');
const upload = multer({ dest: 'uploads/' });

const app = express();
dotenv.config();

// Middleware pour l'analyse des données JSON dans les requêtes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(cookieParser());
// Middleware pour gérer les problèmes de CORS (Cross-Origin Resource Sharing)
app.use(cors());

const server = http.createServer(app); // Création du serveur HTTP

const io = new Server(server); // Initialisation de Socket.IO

io.on("connect", (socket) => {
  console.log("A client connected to WebSocket server");

  // Gérer les événements WebSocket ici
  socket.on("disconnect", () => {
    console.log("A client disconnected from WebSocket server");
  });
});

app.use("/admin", AuthRouteAdminRoute);
app.use("/user", AuthRouteUser);

app.get("/", (req, res) => {
  res.send("Welcome to our E-commerce APIs");
});

const port = 5000;

// Démarrer le serveur HTTP et afficher un message lorsque le serveur est prêt
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
