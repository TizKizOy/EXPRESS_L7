const createApp = require('./src/app/createApp');
const customerRoutes = require('./src/routes/v1/customerRoutes');
const productRoutes = require('./src/routes/v1/productRoutes');
const logger = require('./src/middlewares/logger');
const dotenv = require('dotenv');
dotenv.config();

const app = createApp();
app.use(logger);
app.use('/v1',customerRoutes);
app.use('/v1',productRoutes);

const port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`Сервер запущен на порту ${port}`);
})
