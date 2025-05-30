
const express = require('express');
const cors = require('cors'); 
const apiRoutes = require('./routes/api');
const initDatabase = require('./config/initDb');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  await initDatabase();
});

module.exports = app;