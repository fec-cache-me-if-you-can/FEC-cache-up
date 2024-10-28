const path = require('path');
const express = require('express'); // npm installed
const morgan = require('morgan');
const session = require('express-session');
const outfitInit = require('./middleware/outfitInit.js');

const productRouter = require('./routes/productRoutes.js');
const reviewsRouter = require('./routes/reviewsRoutes.js');
const qaRouter = require('./routes/qaRoutes.js');
const interactionsRouter = require('./routes/interactionsRoutes.js');
const cartRouter = require('./routes/cartRoutes.js');
const outfitRouter = require('./routes/outfitRoutes.js');

const app = express();
const sessionOptions = session({
  secret: 'e545fc503061440fb5c70670d5ea5d9a',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 }, // one day
});

app.use(morgan('dev'));
app.use(express.json());
app.use(sessionOptions);
app.use(outfitInit);
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use('/products', productRouter);
app.use('/reviews', reviewsRouter);
app.use('/qa', qaRouter);
app.use('/interactions', interactionsRouter);
app.use('/cart', cartRouter);
app.use('/outfit', outfitRouter);

// helpful error handling/logging
app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception thrown:', err);
});

app.listen(3000, () => {
  console.log('server listening on port 3000');
  console.log('visit http://localhost:3000');
});
