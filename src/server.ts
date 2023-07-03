import express from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use('/api', router);

export default app;
