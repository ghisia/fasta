import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import postgress from 'pg';
import ExampleRoutes from './routes/example.route';

const app = express();
const port = process.env.PORT || 7000;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: '*/*' }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  return next();
});

app.use('/api', ExampleRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Fasta API',
    code: 201,
  });
});

app.use((req, res) => {
  res.status(404).json({
    message: 'Oops, endpoint not found.',
  });
});

app.listen(port, console.log(`The server is running on http://127.0.0.1:${port}`));

export default app;
