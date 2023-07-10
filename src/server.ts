import express from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors';
import { protect } from './modules/auth';
import { createNewUser, signIn } from './handlers/user';

const app = express();

// middleware to allow cross-origin requests from the frontend app
app.use(cors());
// middleware to parse json data from the request body into an object
app.use(express.json());
// turns params into an object that can be used in the req
app.use(express.urlencoded({ extended: false }));
// logs requests to the console in dev mode
app.use(morgan('dev'));

// routes for products are protected by the auth middleware (protect)
app.use('/api', protect, router);

// User routes
app.post('/user', createNewUser);
app.post('/signin', signIn);

export default app;
