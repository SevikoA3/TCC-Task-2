import express from 'express';
import dotenv from 'dotenv';
import router from './router/noteRoutes.js';
import association from './util/assocDB.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use(router);

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello World!'
    });
});

const PORT = process.env.PORT;
association().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.log(error.message);
});