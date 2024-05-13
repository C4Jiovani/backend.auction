// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import AuthRouteAdminRoute from "./routes/admin/AuthRouteAdmin.js";
// import AuthRouteUser from "./routes/client/AuthRouteUser.js";
// import cookieParser from "cookie-parser";
// import { db } from "./config/bd.js";
// // import { Server } from "socket.io";
// import http, { Server } from "http";
// import multer from 'multer';
// import path from "path";
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// import { Server as SocketIOServer } from 'socket.io'


// // const socketIo = require()
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const upload = multer({ dest: 'uploads/' });

// const app = express();
// dotenv.config();

// // Middleware pour l'analyse des données JSON dans les requêtes
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use(express.json());
// app.use(cookieParser());
// // Middleware pour gérer les problèmes de CORS (Cross-Origin Resource Sharing)
// app.use(cors());

// const server = http.createServer(app); // Création du serveur HTTP
// const io = new SocketIOServer(server)

// io.on('connection', (socket) => {
//   console.log('Nouvelle Connection', socket.id)

//   socket.on('newComment', (comment) => {
//     const insterQuery = "INSERT INTO comment (IdUser,montant) VALUES (?,?)"
//     db.query(insterQuery, [comment.user, comment.montant], (err, res) => {
//       if (err) {
//         console.log('erreur de l insertion du commentaire', err)
//       }
//       else {
//         console.log('commentaire insérer à la base de donnée')
//         io.emit('newComment', comment)
//       }
//     })
//   })
//   socket.on('disconnect',()=>{
//     console.log('Client deconnecté :',socket.id)
//   })
// })


// app.use("/admin", AuthRouteAdminRoute);
// app.use("/user", AuthRouteUser);

// app.get("/", (req, res) => {
//   res.send("Welcome to our E-commerce APIs");
// });

// const port = 5000;

// // Démarrer le serveur HTTP et afficher un message lorsque le serveur est prêt
// server.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import AuthRouteAdminRoute from "./routes/admin/AuthRouteAdmin.js";
import AuthRouteUser from "./routes/client/AuthRouteUser.js";
import cookieParser from "cookie-parser";
import { db } from "./config/bd.js";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import multer from 'multer';
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const upload = multer({ dest: 'uploads/' });


const app = express();
dotenv.config();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
app.use(cookieParser());
app.use(cors()); // Middleware pour gérer les problèmes de CORS

const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true // autorise les cookies et les informations d'authentification
  }
});

io.on('connection', (socket) => {
  console.log('Nouvelle Connection', socket.id);

  io.on('connection', (socket) => {
    console.log('Nouvelle Connection', socket.id);

    socket.on('updatePrice', ({ newPrice, idLive }) => {
      const queryUpdate = `UPDATE live SET prixInit = ${newPrice} WHERE idLive = ?;`;

      db.query(queryUpdate, [idLive], (error, results, fields) => {
        if (error) {
          console.log('Erreur lors de la mise à jour du prix initial :', error.message);
          // Gérer l'erreur, par exemple en envoyant un message d'erreur aux clients
          io.emit('updatePriceError', { message: 'Erreur lors de la mise à jour du prix initial.' });
        } else {
          console.log('Prix initial mis à jour dans la base de données :', newPrice);
          // Émettre un événement aux clients pour indiquer que le prix initial a été mis à jour
          io.emit('priceUpdated', newPrice);
        }
      });
    });
  });
  
  socket.on('newComment', (comment) => {
    const insterQuery = "INSERT INTO comment (IdUser,montant,name) VALUES (?,?,?)";
    db.query(insterQuery, [comment.user, comment.montant, comment.nameL], (err, res) => {
      if (err) {
        console.log('erreur de l insertion du commentaire', err);
      } else {
        console.log('commentaire insérer à la base de donnée');
        io.emit('newComment', comment);
      }
    });
  });

  socket.on('disconnect', () => {
    console.log('Client deconnecté :', socket.id);
  });
});

app.use("/admin", AuthRouteAdminRoute);
app.use("/user", AuthRouteUser);

app.get("/", (req, res) => {
  res.send("Welcome to our E-commerce APIs");
});

const port = 5000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
