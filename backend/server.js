// Archivo: backend/server.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5000",
    methods: ["GET", "POST"]
  }
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/educheck', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch(err => console.error('❌ Error conectando a MongoDB:', err));

// Socket.io para notificaciones en tiempo real
io.on('connection', (socket) => {
  console.log('Usuario conectado:', socket.id);
  
  socket.on('join', (userId) => {
    socket.join(userId);
    console.log(`Usuario ${userId} unido a su sala`);
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado:', socket.id);
  });
});

// Hacer io accesible en las rutas
app.set('io', io);

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/institutos', require('./routes/institutos'));
app.use('/api/registros', require('./routes/registros'));
app.use('/api/notificaciones', require('./routes/notificaciones'));
app.use('/api/ausencias', require('./routes/ausencias'));

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: 'Bienvenido a EduCheck API' });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ mensaje: 'Error del servidor', error: err.message });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});