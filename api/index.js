import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
dotenv.config();
   
mongoose 
  .connect(process.env.MONGO)
  .then(() => {
    console.log('MongoDB Connected!'); 
  })
  .catch((err) => {
    console.log(err);   
  });

  const __dirname = path.resolve();

const app = express();

app.use(express.json());

app.use(cookieParser());

app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);


app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});





// import express from 'express';
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import userRouter from './routes/user.route.js';
// import authRouter from './routes/auth.route.js';
// import listingRouter from './routes/listing.route.js';
// import cookieParser from 'cookie-parser';
// import path from 'path';

// dotenv.config(); // Load environment variables

// const app = express();
// const PORT = 3000;

// // Check if MONGO environment variable is set
// if (!process.env.MONGO) {
//   console.error('Error: MONGO environment variable is not defined.');
//   process.exit(1); // Exit the process if MongoDB URI is not set
// }

// mongoose
//   .connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('MongoDB Connected!');
//   })
//   .catch((err) => {
//     console.error('Error connecting to MongoDB:', err.message);
//     process.exit(1); // Exit the process if the connection fails
//   });

// const __dirname = path.resolve();

// app.use(express.json());
// app.use(cookieParser());

// // API routes
// app.use('/api/user', userRouter);
// app.use('/api/auth', authRouter);
// app.use('/api/listing', listingRouter);

// // Serve static files
// app.use(express.static(path.join(__dirname, '/client/dist')));

// // Catch-all route for serving the client
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || 'Internal Server Error';
//   return res.status(statusCode).json({
//     success: false,
//     statusCode,
//     message,
//   });
// });

// // Start the server 
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}!`);
// });
