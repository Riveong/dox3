import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import storiesRouter from './routes.js';

const app = express();
const PORT = 3000;

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
  };

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/api', storiesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
