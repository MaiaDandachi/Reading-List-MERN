import path from 'path';
import express from 'express'; // used the type module to use import instead of require
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';
dotenv.config();
connectDB();

const app = express();

app.use(express.json()); // to accept json data in body

app.use('/api/users', userRoutes);

const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is runing ...');
  });
}

// Error Handling //
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server Runing in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
